import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/analyze-resume.css";

function AnalyzeResume() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const validateFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const isValidExtension = /\.(pdf|docx)$/i.test(selectedFile.name);

    if (
      !allowedTypes.includes(selectedFile.type) &&
      !isValidExtension
    ) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  const handleAnalyze = () => {
    if (!file) {
      setError("Please upload your resume first.");
      return;
    }

    setIsAnalyzing(true);

    // Frontend demonstration only
    setTimeout(() => {
      setIsAnalyzing(false);
      alert(
        "Resume uploaded successfully! AI analysis will be available after backend integration."
      );
      navigate("/results");
    }, 1500);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="analyze-page">
      <div className="analyze-header">
        <span className="analyze-breadcrumb">
          Dashboard / Resume Analysis
        </span>

        <h1>Analyze Your Resume</h1>

        <p>
          Upload your resume and discover how to improve it with
          AI-powered insights.
        </p>
      </div>

      <div className="analyze-content">
        {/* Upload Card */}
        <div className="upload-card">
          <div className="upload-card-heading">
            <h2>Upload Resume</h2>
            <p>Choose your resume to get started with the analysis.</p>
          </div>

          <div
            className={`upload-dropzone ${
              isDragging ? "drag-active" : ""
            } ${file ? "file-selected" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <div className="upload-icon">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M12 16V4" />
                    <path d="M7 9l5-5 5 5" />
                    <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
                  </svg>
                </div>

                <h3>Drag and drop your resume here</h3>

                <p>or click below to browse your files</p>

                <button
                  type="button"
                  className="browse-button"
                  onClick={() => fileInputRef.current.click()}
                >
                  Browse Files
                </button>

                <span className="upload-supported">
                  Supported formats: PDF, DOCX · Maximum size: 5 MB
                </span>
              </>
            ) : (
              <div className="selected-file">
                <div className="file-icon">📄</div>

                <div className="file-details">
                  <h3>{file.name}</h3>
                  <p>{formatFileSize(file.size)}</p>
                  <span className="file-status">Ready to analyze</span>
                </div>

                <button
                  type="button"
                  className="remove-file"
                  onClick={removeFile}
                  title="Remove file"
                >
                  ✕
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              hidden
              onChange={handleFileChange}
            />
          </div>

          {error && <div className="upload-error">{error}</div>}

          <button
            type="button"
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="analyze-spinner"></span>
                Preparing Analysis...
              </>
            ) : (
              <>
                ✨ Analyze Resume
              </>
            )}
          </button>

          <div className="upload-privacy">
            🔒 Your resume and personal information are kept private.
          </div>
        </div>

        {/* Tips Card */}
        <div className="resume-tips">
          <h2>Tips for the best results</h2>

          <div className="tip-item">
            <div className="tip-number">01</div>
            <div>
              <h3>Use a clear format</h3>
              <p>
                Keep your resume clean, structured, and easy to read.
              </p>
            </div>
          </div>

          <div className="tip-item">
            <div className="tip-number">02</div>
            <div>
              <h3>Include relevant skills</h3>
              <p>
                Highlight technical skills and experience related to
                your target job.
              </p>
            </div>
          </div>

          <div className="tip-item">
            <div className="tip-number">03</div>
            <div>
              <h3>Keep information updated</h3>
              <p>
                Add your latest education, projects, experience, and
                certifications.
              </p>
            </div>
          </div>

          <div className="tip-item">
            <div className="tip-number">04</div>
            <div>
              <h3>Check your file</h3>
              <p>
                Make sure your resume is readable and uploaded in
                PDF or DOCX format.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyzeResume;