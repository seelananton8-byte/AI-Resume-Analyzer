const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },
    fileName: { type: String, required: true },
    provider: { type: String, required: true },
    model: { type: String, required: true },

    overallScore: { type: Number, required: true },
    scores: {
      atsCompatibility: { type: Number, required: true },
      skillsMatch: { type: Number, required: true },
      contentQuality: { type: Number, required: true },
    },
    summary: { type: String, required: true },
    strengths: [String],
    weaknesses: [String],
    missingKeywords: [String],
    suggestions: [
      {
        _id: false,
        title: String,
        detail: String,
        priority: { type: String, enum: ["high", "medium", "low"] },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);