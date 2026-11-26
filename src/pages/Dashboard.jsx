import { useEffect, useState } from "react";
import {
  FileText,
  Upload,
  Sparkles,
  TrendingUp,
  Target,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { listAnalyses } from "../services/analysisService";
import { getErrorMessage } from "../services/api";
import { formatDate, scoreLabel, truncate } from "../utils/format";
import "../styles/dashboard.css";

function countThisMonth(analyses) {
  const now = new Date();

  return analyses.filter((a) => {
    const date = new Date(a.createdAt);
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;
}

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [thisMonth, setThisMonth] = useState(0);

  useEffect(() => {
    let active = true;

    listAnalyses()
      .then((data) => {
        if (active) {
          setAnalyses(data);
          setThisMonth(countThisMonth(data));
        }
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
  }, []);

  // The API returns the newest analysis first
  const total = analyses.length;
  const latest = analyses[0] || null;
  const recent = analyses.slice(0, 3);

  const average = total
    ? Math.round(analyses.reduce((sum, a) => sum + a.overallScore, 0) / total)
    : 0;
  const best = total ? Math.max(...analyses.map((a) => a.overallScore)) : 0;


  const breakdown = latest
    ? [
        { label: "ATS Compatibility", value: latest.scores.atsCompatibility },
        { label: "Skills Match", value: latest.scores.skillsMatch },
        { label: "Content Quality", value: latest.scores.contentQuality },
      ]
    : [];

  return (
    <>
      {/* Welcome */}
      <section className="dashboard-welcome">
        <div>
          <p className="welcome-date">YOUR PERSONAL DASHBOARD</p>
          <h1>Welcome back, {user.name.split(" ")[0]}!</h1>
          <p>
            Here's an overview of your resume performance
            and career progress.
          </p>
        </div>

        <Link to="/analyze" className="dashboard-primary-btn">
          <Upload size={18} />
          Analyze Resume
        </Link>
      </section>

      {error && <p className="dashboard-error">{error}</p>}

      {/* Statistics */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple-bg">
            <FileText size={21} />
          </div>

          <p>Total Resumes Analyzed</p>
          <h2>{total}</h2>

          <span className="stat-trend">
            <TrendingUp size={15} />+{thisMonth} this month
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue-bg">
            <Target size={21} />
          </div>

          <p>Average Resume Score</p>
          <h2>
            {total ? average : "–"}
            {total > 0 && <span>/100</span>}
          </h2>

          <span className="stat-trend">
            {total ? "Across all analyses" : "No analyses yet"}
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon green-bg">
            <Sparkles size={21} />
          </div>

          <p>Best Resume Score</p>
          <h2>
            {total ? best : "–"}
            {total > 0 && <span>/100</span>}
          </h2>

          <span className="stat-trend">
            {total ? scoreLabel(best) : "Analyze a resume to start"}
          </span>
        </div>
      </section>

      {/* Score + Quick action */}
      <section className="dashboard-content-grid">
        <div className="dashboard-panel score-panel">
          <div className="panel-heading">
            <div>
              <h3>Resume Performance</h3>
              <p>Your latest resume analysis</p>
            </div>

            {latest && (
              <button
                className="icon-action"
                aria-label="View latest report"
                onClick={() => navigate(`/results/${latest.id}`)}
              >
                <ArrowUpRight size={19} />
              </button>
            )}
          </div>

          {loading ? (
            <p className="dashboard-empty-note">Loading...</p>
          ) : !latest ? (
            <div>
              <p className="dashboard-empty-note">
                No analysis yet. Upload a resume to see your score here.
              </p>
              <Link to="/analyze" className="quick-upload-btn">
                <Upload size={18} />
                Analyze Resume
              </Link>
            </div>
          ) : (
            <>
              <div className="dashboard-score">
                <div
                  className="dashboard-score-circle"
                  style={{ "--score": latest.overallScore }}
                >
                  <div>
                    <strong>{latest.overallScore}</strong>
                    <span>/100</span>
                  </div>
                </div>

                <div className="score-description">
                  <span className="score-status">
                    {scoreLabel(latest.overallScore)}
                  </span>
                  <h3>{latest.fileName}</h3>
                  <p>{truncate(latest.summary, 150)}</p>
                </div>
              </div>

              <div className="score-breakdown">
                {breakdown.map((item) => (
                  <div className="breakdown-item" key={item.label}>
                    <div>
                      <span>{item.label}</span>
                      <strong>{item.value}%</strong>
                    </div>

                    <div className="breakdown-bar">
                      <span style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Quick action */}
        <div className="dashboard-panel quick-panel">
          <div className="quick-panel-icon">
            <Sparkles size={24} />
          </div>

          <h3>Ready to improve your resume?</h3>

          <p>
            Upload your resume and let AI identify your
            strengths, weaknesses and opportunities.
          </p>

          <Link to="/analyze" className="quick-upload-btn">
            <Upload size={18} />
            Upload Resume
          </Link>

          <div className="upload-supported">
            Supported formats: PDF, DOCX
          </div>
        </div>
      </section>

      {/* Recent analysis */}
      <section className="dashboard-panel recent-panel">
        <div className="panel-heading">
          <div>
            <h3>Recent Analysis</h3>
            <p>Track your previous resume reports</p>
          </div>

          <Link to="/history" className="view-all-link">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="recent-table-wrapper">
          <table className="recent-table">
            <thead>
              <tr>
                <th>Resume</th>
                <th>Date</th>
                <th>Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={5} className="table-empty">
                    {loading ? "Loading..." : "No analyses yet."}
                  </td>
                </tr>
              ) : (
                recent.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="resume-file">
                        <FileText size={18} />
                        <span>{item.fileName}</span>
                      </div>
                    </td>

                    <td>{formatDate(item.createdAt)}</td>

                    <td>
                      <strong className="table-score">
                        {item.overallScore}/100
                      </strong>
                    </td>

                    <td>
                      <span className="status-badge">Completed</span>
                    </td>

                    <td>
                      <button
                        className="table-action"
                        onClick={() => navigate(`/results/${item.id}`)}
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Dashboard;