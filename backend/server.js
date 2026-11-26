require("dotenv").config({ quiet: true });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const analysisRoutes = require("./routes/analysisRoutes");

for (const key of ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET"]) {
  if (!process.env[key]) {
    console.error(`${key} is missing in backend/.env`);
    process.exit(1);
  }
}

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "AI Resume Analyzer Backend is running!" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/analyses", analysisRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, _next) => {
  // Upload errors (file too large, wrong field name...)
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(413)
        .json({ message: "File is too large. Maximum size is 5 MB." });
    }
    return res.status(400).json({ message: "Invalid file upload." });
  }

  // Mongoose validation error (e.g. invalid email format)
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    return res.status(400).json({ message });
  }

  // Duplicate key (email already exists)
  if (err.code === 11000) {
    return res
      .status(409)
      .json({ message: "An account with this email already exists" });
  }

  console.error(err);
  res.status(err.status || 500).json({
    message: err.status ? err.message : "Server error",
  });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});