const TIMEOUT_MS = 45000;

class ProviderError extends Error {
  constructor(message, { status = 0, retryAfterSec = null } = {}) {
    super(message);
    this.status = status;
    this.retryAfterSec = retryAfterSec;
  }
}

async function request(url, options) {
  let res;
  try {
    res = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    throw new ProviderError(`Network error (${error.name})`, { status: 0 });
  }

  if (!res.ok) {
    let detail = "";
    try {
      detail = (await res.text()).slice(0, 300);
    } catch {
      // ignore unreadable error bodies
    }
    const retryAfter = Number(res.headers.get("retry-after"));
    throw new ProviderError(`HTTP ${res.status} ${detail}`, {
      status: res.status,
      retryAfterSec: Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : null,
    });
  }

  return res.json();
}

// Groq: OpenAI-compatible chat completions API
async function callGroq({ system, user }) {
  const data = await request("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_completion_tokens: 4000,
    }),
  });

  return data.choices?.[0]?.message?.content || "";
}

// Gemini: generateContent API
async function callGemini({ system, user }) {
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const data = await request(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: user }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
          maxOutputTokens: 8192,
        },
      }),
    }
  );

  const parts = data.candidates?.[0]?.content?.parts || [];
  return parts.map((part) => part.text || "").join("");
}

const PROVIDERS = {
  groq: {
    call: callGroq,
    keyEnv: "GROQ_API_KEY",
    model: () => process.env.GROQ_MODEL || "openai/gpt-oss-20b",
  },
  gemini: {
    call: callGemini,
    keyEnv: "GEMINI_API_KEY",
    model: () => process.env.GEMINI_MODEL || "gemini-2.5-flash",
  },
};

module.exports = { PROVIDERS, ProviderError };