import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnalysis } from "../services/analysisService";
import { getErrorMessage } from "../services/api";
import "../styles/results.css";

function scoreLabel(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good Performance";
  if (score >= 50) return "Needs Improvement";
  return "Needs Work";
}

function atsText(score) {
  if (score >= 80) return "Your resume is ATS-friendly";
  if (score >= 60) return "Some ATS improvements are needed";
  return "Your resume may be filtered out by ATS";
}

function skillsText(score) {
  if (score >= 80) return "Your skills match the target profile well";
  if (score >= 60) return "Some expected skills are missing";
  return "Many expected skills are missing";
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Results() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) return;

    let active = true;

    getAnalysis(id)
      .then((data) => {
        if (active) setAnalysis(data);
      })
      .catch((err) => {
        if (active) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="results-page">
        <div className="results-panel results-state">Loading analysis...</div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="results-page">
        <div className="results-panel results-state">
          <p>{error || "No analysis selected."}</p>
          <Link to="/analyze" className="improve-button">
            Analyze a Resume
          </Link>
        </div>
      </div>
    );
  }

  const { scores, strengths, weaknesses, missingKeywords, suggestions } =
    analysis;

  const breakdown = [
    { label: "Overall", value: analysis.overallScore },
    { label: "ATS Compatibility", value: scores.atsCompatibility },
    { label: "Skills Match", value: scores.skillsMatch },
    { label: "Content Quality", value: scores.contentQuality },
  ];

  return (
    <div className="results-page">
      {/* Header */}
      <div className="results-header">
        <div>
          <span className="results-breadcrumb">
            Dashboard / Resume Analysis / Results
          </span>

          <h1>Resume Analysis Results</h1>

          <span className="results-file">
            {analysis.fileName} · {formatDate(analysis.createdAt)}
          </span>

          <p>{analysis.summary}</p>
        </div>

        <Link to="/analyze" className="reanalyze-button">
          + Analyze New Resume
        </Link>
      </div>

      {/* Score Cards */}
      <div className="results-stats">
        <div className="result-stat-card overall-card">
          <div className="stat-card-top">
            <span>Overall Resume Score</span>
            <span className="stat-icon purple-icon">✦</span>
          </div>

          <div className="score-content">
            <div
              className="score-circle"
              style={{
                background: `conic-gradient(#6c5ce7 0% ${analysis.overallScore}%, #eeebff ${analysis.overallScore}% 100%)`,
              }}
            >
              <div className="score-circle-inner">
                <strong>{analysis.overallScore}</strong>
                <span>/100</span>
              </div>
            </div>

            <div className="score-info">
              <span className="score-status">
                {scoreLabel(analysis.overallScore)}
              </span>
              <p>Based on AI review of your resume</p>
            </div>
          </div>
        </div>

        <div className="result-stat-card">
          <div className="stat-card-top">
            <span>ATS Compatibility</span>
            <span className="stat-icon blue-icon">◎</span>
          </div>

          <div className="stat-number">
            {scores.atsCompatibility}
            <span>/100</span>
          </div>

          <div className="stat-progress">
            <div
              className="stat-progress-fill ats-fill"
              style={{ width: `${scores.atsCompatibility}%` }}
            ></div>
          </div>

          <p className="stat-description">{atsText(scores.atsCompatibility)}</p>
        </div>

        <div className="result-stat-card">
          <div className="stat-card-top">
            <span>Skills Match</span>
            <span className="stat-icon green-icon">✓</span>
          </div>

          <div className="stat-number">
            {scores.skillsMatch}
            <span>%</span>
          </div>

          <div className="stat-progress">
            <div
              className="stat-progress-fill skills-fill"
              style={{ width: `${scores.skillsMatch}%` }}
            ></div>
          </div>

          <p className="stat-description">{skillsText(scores.skillsMatch)}</p>
        </div>

        <div className="result-stat-card">
          <div className="stat-card-top">
            <span>Improvement Areas</span>
            <span className="stat-icon orange-icon">↗</span>
          </div>

          <div className="stat-number">
            {String(weaknesses.length).padStart(2, "0")}
            <span> areas</span>
          </div>

          <p className="stat-description">
            Focus on these to improve your score
          </p>
        </div>
      </div>

      {/* Keywords + Breakdown */}
      <div className="results-main-grid">
        <div className="results-panel">
          <div className="panel-heading">
            <div>
              <h2>Missing Keywords</h2>
              <p>Skills recruiters may expect for this role</p>
            </div>
          </div>

          {missingKeywords.length > 0 ? (
            <div className="keyword-list">
              {missingKeywords.map((keyword) => (
                <span className="keyword-chip" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="results-empty">No major keywords are missing.</p>
          )}
        </div>

        <div className="results-panel">
          <div className="panel-heading">
            <div>
              <h2>Resume Score Breakdown</h2>
              <p>Performance across key areas</p>
            </div>
          </div>

          <div className="breakdown-list">
            {breakdown.map((item) => (
              <div className="breakdown-item" key={item.label}>
                <span>{item.label}</span>
                <div className="breakdown-bar">
                  <div style={{ width: `${item.value}%` }}></div>
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="results-main-grid">
        <div className="results-panel">
          <div className="panel-heading">
            <h2>Strengths</h2>
            <span className="section-badge strengths-badge">
              {strengths.length} identified
            </span>
          </div>

          <div className="insights-list">
            {strengths.map((item, index) => (
              <div className="insight-item" key={index}>
                <span className="insight-check">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="results-panel">
          <div className="panel-heading">
            <h2>Areas to Improve</h2>
            <span className="section-badge weaknesses-badge">
              {weaknesses.length} identified
            </span>
          </div>

          <div className="insights-list">
            {weaknesses.map((item, index) => (
              <div className="insight-item" key={index}>
                <span className="insight-warning">!</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="results-panel suggestions-panel">
        <div className="panel-heading">
          <div>
            <h2>Personalized Recommendations</h2>
            <p>Actionable steps to improve your resume</p>
          </div>
          <span className="recommendation-label">✦ AI Insights</span>
        </div>

        <div className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <div className="suggestion-item" key={index}>
              <div className="suggestion-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="suggestion-content">
                <h3>
                  {suggestion.title}
                  <span
                    className={`priority-tag priority-${suggestion.priority}`}
                  >
                    {suggestion.priority}
                  </span>
                </h3>
                <p>{suggestion.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="results-bottom">
        <div>
          <h3>Ready to improve your resume?</h3>
          <p>Apply these suggestions and analyze your resume again.</p>
        </div>

        <Link to="/analyze" className="improve-button">
          Improve My Resume →
        </Link>
      </div>
    </div>
  );
}

export default Results;