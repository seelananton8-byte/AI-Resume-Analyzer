const mammoth = require("mammoth");
const pdfParse = require("pdf-parse");

// Check the real file content, not the name the browser sent
function detectFileType(buffer) {
  if (buffer.length > 5 && buffer.subarray(0, 5).toString("latin1") === "%PDF-") {
    return "pdf";
  }
  // DOCX files are ZIP archives (start with "PK\x03\x04")
  if (
    buffer.length > 4 &&
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    buffer[2] === 0x03 &&
    buffer[3] === 0x04
  ) {
    return "docx";
  }
  return null;
}

async function extractPdf(buffer) {
  // pdf-parse v2
  if (typeof pdfParse.PDFParse === "function") {
    const parser = new pdfParse.PDFParse({ data: new Uint8Array(buffer) });
    try {
      const result = await parser.getText();
      return result.text;
    } finally {
      await parser.destroy();
    }
  }

  // pdf-parse v1
  const result = await pdfParse(buffer);
  return result.text;
}

async function extractDocx(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

function cleanText(text) {
  return text
    .replace(/^-- \d+ of \d+ --$/gm, "") // page markers added by pdf-parse v2
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function extractText(buffer, type) {
  const raw = type === "pdf" ? await extractPdf(buffer) : await extractDocx(buffer);
  return cleanText(raw || "");
}

module.exports = { detectFileType, extractText };