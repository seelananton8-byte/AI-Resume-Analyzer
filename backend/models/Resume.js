const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    fileSize: { type: Number, required: true },
    fileType: { type: String, enum: ["pdf", "docx"], required: true },
    // Extracted text. Not returned unless asked for with .select("+text")
    text: { type: String, required: true, select: false },
    wordCount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);