const mongoose = require("mongoose");
const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");
const { analyzeResumeText } = require("../services/ai/analyzer");

const MAX_ANALYSES_PER_HOUR = 10;

const toDto = (analysis) => ({
  id: analysis._id,
  resumeId: analysis.resume,
  fileName: analysis.fileName,
  provider: analysis.provider,
  overallScore: analysis.overallScore,
  scores: analysis.scores,
  summary: analysis.summary,
  strengths: analysis.strengths,
  weaknesses: analysis.weaknesses,
  missingKeywords: analysis.missingKeywords,
  suggestions: analysis.suggestions,
  createdAt: analysis.createdAt,
});

// POST /api/resumes/:id/analyze
async function analyzeResume(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ message: "Resume not found" });
  }

  const resume = await Resume.findOne({ _id: id, user: req.user._id }).select(
    "+text"
  );
  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  // Protects the free AI quota from being used up by one account
  const since = new Date(Date.now() - 60 * 60 * 1000);
  const recent = await Analysis.countDocuments({
    user: req.user._id,
    createdAt: { $gte: since },
  });
  if (recent >= MAX_ANALYSES_PER_HOUR) {
    return res.status(429).json({
      message: `Limit reached: ${MAX_ANALYSES_PER_HOUR} analyses per hour. Please try again later.`,
    });
  }

  const { analysis, provider, model } = await analyzeResumeText(resume.text);

  const saved = await Analysis.create({
    user: req.user._id,
    resume: resume._id,
    fileName: resume.fileName,
    provider,
    model,
    ...analysis,
  });

  res.status(201).json({ analysis: toDto(saved) });
}

// GET /api/analyses
async function listAnalyses(req, res) {
  const analyses = await Analysis.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({ analyses: analyses.map(toDto) });
}

// GET /api/analyses/:id
async function getAnalysis(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ message: "Analysis not found" });
  }

  const analysis = await Analysis.findOne({ _id: id, user: req.user._id });
  if (!analysis) {
    return res.status(404).json({ message: "Analysis not found" });
  }

  res.json({ analysis: toDto(analysis) });
}

// DELETE /api/analyses/:id
async function deleteAnalysis(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ message: "Analysis not found" });
  }

  const analysis = await Analysis.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });
  if (!analysis) {
    return res.status(404).json({ message: "Analysis not found" });
  }

  // If this was the last analysis of that resume, remove the stored text too
  const remaining = await Analysis.countDocuments({ resume: analysis.resume });
  if (remaining === 0) {
    await Resume.deleteOne({ _id: analysis.resume, user: req.user._id });
  }

  res.json({ message: "Analysis deleted" });
}

module.exports = { analyzeResume, listAnalyses, getAnalysis, deleteAnalysis };