const express = require("express");
const {
  uploadResume,
  listResumes,
  getResume,
  deleteResume,
} = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");
const { uploadResumeFile } = require("../middleware/uploadMiddleware");
const { analyzeResume } = require("../controllers/analysisController");

const router = express.Router();

// Login is checked first, so logged-out users can't upload anything
router.use(protect);

router.post("/", uploadResumeFile, uploadResume);
router.post("/:id/analyze", analyzeResume);
router.get("/", listResumes);
router.get("/:id", getResume);
router.delete("/:id", deleteResume);

module.exports = router;