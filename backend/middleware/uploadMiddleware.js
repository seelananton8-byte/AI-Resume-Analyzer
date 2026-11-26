const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.memoryStorage(), // file stays in memory, never saved to disk
  limits: { fileSize: 5 * 1024 * 1024, files: 1 }, // 5 MB, one file
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext !== ".pdf" && ext !== ".docx") {
      const error = new Error("Only PDF and DOCX files are allowed.");
      error.status = 400;
      return cb(error);
    }

    cb(null, true);
  },
});

// The form field name must be "resume"
module.exports = { uploadResumeFile: upload.single("resume") };