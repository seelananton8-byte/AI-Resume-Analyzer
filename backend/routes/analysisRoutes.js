const express = require("express");
const {
  listAnalyses,
  getAnalysis,
  deleteAnalysis,
} = require("../controllers/analysisController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", listAnalyses);
router.get("/:id", getAnalysis);
router.delete("/:id", deleteAnalysis);

module.exports = router;