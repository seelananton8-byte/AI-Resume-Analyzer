const path = require("path");
const mongoose = require("mongoose");
const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");
const { detectFileType, extractText } = require("../utils/extractText");

const MAX_TEXT_CHARS = 20000; // keeps AI cost and prompt size under control
const MIN_TEXT_CHARS = 100;

const toDto = (resume) => ({
  id: resume._id,
  fileName: resume.fileName,
  fileSize: resume.fileSize,
  fileType: resume.fileType,
  wordCount: resume.wordCount,
  createdAt: resume.createdAt,
});

function cleanFileName(name) {
  const base = path.basename(name || "resume");
  const visible = [...base].filter((c) => c.charCodeAt(0) >= 32).join("");
  return visible.replace(/[<>:"/\\|?*]/g, "").slice(0, 150) || "resume";
}

// POST /api/resumes
async function uploadResume(req, res) {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Please choose a resume file (PDF or DOCX)." });
  }

  const { buffer, originalname, size } = req.file;

  const fileType = detectFileType(buffer);
  if (!fileType) {
    return res
      .status(400)
      .json({ message: "Only valid PDF or DOCX files are supported." });
  }

  let text;
  try {
    text = await extractText(buffer, fileType);
  } catch (error) {
    console.error("Text extraction failed:", error.message);
    return res.status(422).json({
      message:
        "We couldn't read this file. It may be corrupted or password-protected.",
    });
  }

  if (text.length < MIN_TEXT_CHARS) {
    return res.status(422).json({
      message:
        "We couldn't find readable text in this file. Scanned or image-only resumes aren't supported yet.",
    });
  }

  const trimmed = text.slice(0, MAX_TEXT_CHARS);

  const resume = await Resume.create({
    user: req.user._id,
    fileName: cleanFileName(originalname),
    fileSize: size,
    fileType,
    text: trimmed,
    wordCount: trimmed.split(/\s+/).filter(Boolean).length,
  });

  res.status(201).json({ resume: toDto(resume) });
}

// GET /api/resumes
async function listResumes(req, res) {
  const resumes = await Resume.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json({ resumes: resumes.map(toDto) });
}

// GET /api/resumes/:id
async function getResume(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ message: "Resume not found" });
  }

  // Filtering by user means nobody can open someone else's resume
  const resume = await Resume.findOne({ _id: id, user: req.user._id });
  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  res.json({ resume: toDto(resume) });
}

// DELETE /api/resumes/:id
async function deleteResume(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ message: "Resume not found" });
  }

  const resume = await Resume.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });
  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  // Remove the analyses that belong to this resume too
  await Analysis.deleteMany({ resume: resume._id, user: req.user._id });

  res.json({ message: "Resume deleted" });
}

module.exports = { uploadResume, listResumes, getResume, deleteResume };