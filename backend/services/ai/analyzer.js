const { PROVIDERS } = require("./providers");
const { buildPrompt } = require("./prompt");

// provider name -> time (ms) until which we skip it
const cooldownUntil = {};

function activeProviders() {
  return (process.env.AI_PROVIDERS || "groq,gemini")
    .split(",")
    .map((name) => name.trim().toLowerCase())
    .filter((name) => PROVIDERS[name] && process.env[PROVIDERS[name].keyEnv]);
}

// Models sometimes wrap JSON in ```json fences or add text around it
function parseJson(text) {
  const cleaned = String(text || "")
    .replace(/```json|```/gi, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end <= start) {
    throw new Error("AI reply did not contain JSON");
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

const text = (value, max) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const textList = (value, maxItems, maxLength) =>
  Array.isArray(value)
    ? value
        .map((item) => text(item, maxLength))
        .filter(Boolean)
        .slice(0, maxItems)
    : [];

function score(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) throw new Error("Invalid score in AI reply");
  return Math.max(0, Math.min(100, Math.round(n)));
}

// Never trust model output: check the shape and clamp every value
function normalizeAnalysis(raw) {
  if (!raw || typeof raw !== "object") throw new Error("Invalid AI reply");

  const priorities = ["high", "medium", "low"];

  const result = {
    overallScore: score(raw.overallScore),
    scores: {
      atsCompatibility: score(raw.scores?.atsCompatibility),
      skillsMatch: score(raw.scores?.skillsMatch),
      contentQuality: score(raw.scores?.contentQuality),
    },
    summary: text(raw.summary, 600),
    strengths: textList(raw.strengths, 6, 220),
    weaknesses: textList(raw.weaknesses, 6, 220),
    missingKeywords: textList(raw.missingKeywords, 12, 40),
    suggestions: Array.isArray(raw.suggestions)
      ? raw.suggestions
          .slice(0, 8)
          .map((s) => ({
            title: text(s?.title, 100),
            detail: text(s?.detail, 400),
            priority: priorities.includes(s?.priority) ? s.priority : "medium",
          }))
          .filter((s) => s.title && s.detail)
      : [],
  };

  if (!result.summary || !result.strengths.length || !result.suggestions.length) {
    throw new Error("Incomplete AI reply");
  }

  return result;
}

function handleFailure(name, error) {
  const status = error.status || 0;
  let cooldownSec = 0;
  let hint = "";

  if (status === 429) {
    cooldownSec = error.retryAfterSec || 60;
    hint = "rate limit or quota reached";
  } else if (status === 401 || status === 403) {
    cooldownSec = 600;
    hint = "API key rejected, check it in backend/.env";
  } else if (status === 0 && error.name === "ProviderError") {
    cooldownSec = 30;
    hint = "network problem or timeout";
  } else if (status >= 500) {
    cooldownSec = 30;
    hint = "provider server error";
  } else {
    hint = "bad reply from model";
  }

  if (cooldownSec) cooldownUntil[name] = Date.now() + cooldownSec * 1000;

  console.warn(`[AI] ${name} failed (${hint}): ${error.message.slice(0, 200)}`);
}

async function analyzeResumeText(resumeText) {
  const names = activeProviders();

  if (names.length === 0) {
    const error = new Error(
      "AI is not configured. Add GROQ_API_KEY or GEMINI_API_KEY to backend/.env."
    );
    error.status = 503;
    throw error;
  }

  const prompt = buildPrompt(resumeText);

  for (const name of names) {
    if ((cooldownUntil[name] || 0) > Date.now()) continue;

    try {
      const reply = await PROVIDERS[name].call(prompt);
      const analysis = normalizeAnalysis(parseJson(reply));
      return { analysis, provider: name, model: PROVIDERS[name].model() };
    } catch (error) {
      handleFailure(name, error);
      // continue with the next provider
    }
  }

  const error = new Error(
    "The AI service is busy right now. Please try again in a minute."
  );
  error.status = 503;
  throw error;
}

module.exports = { analyzeResumeText };