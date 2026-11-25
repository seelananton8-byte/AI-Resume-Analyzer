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
import "../styles/dashboard.css";

const recentAnalyses = [
  { id: 1, file: "Software_Developer.pdf", date: "Nov 18, 2026", score: 85 },
  { id: 2, file: "Frontend_Developer.pdf", date: "Nov 15, 2026", score: 78 },
  { id: 3, file: "My_Resume_v1.pdf", date: "Nov 10, 2026", score: 65 },
];

const scoreBreakdown = [
  { label: "ATS Compatibility", value: 90 },
  { label: "Skills Match", value: 78 },
  { label: "Content Quality", value: 86 },
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      {/* Welcome */}
      <section className="dashboard-welcome">
        <div>
          <p className="welcome-date">YOUR PERSONAL DASHBOARD</p>
          <h1>Welcome back, AntonSeelan!</h1>
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

      {/* Statistics */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple-bg">
            <FileText size={21} />
          </div>

          <p>Total Resumes Analyzed</p>
          <h2>12</h2>

          <span className="stat-trend">
            <TrendingUp size={15} />
            +3 this month
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue-bg">
            <Target size={21} />
          </div>

          <p>Average Resume Score</p>
          <h2>
            78<span>/100</span>
          </h2>

          <span className="stat-trend">
            <TrendingUp size={15} />
            +8% improvement
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon green-bg">
            <Sparkles size={21} />
          </div>

          <p>Best Resume Score</p>
          <h2>
            92<span>/100</span>
          </h2>

          <span className="stat-trend">Excellent performance</span>
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

            <button
              className="icon-action"
              aria-label="View latest report"
              onClick={() => navigate("/results")}
            >
              <ArrowUpRight size={19} />
            </button>
          </div>

          <div className="dashboard-score">
            <div className="dashboard-score-circle">
              <div>
                <strong>85</strong>
                <span>/100</span>
              </div>
            </div>

            <div className="score-description">
              <span className="score-status">Excellent</span>
              <h3>Your resume is looking strong!</h3>
              <p>
                A few improvements can make your resume
                even more competitive.
              </p>
            </div>
          </div>

          <div className="score-breakdown">
            {scoreBreakdown.map((item) => (
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
              {recentAnalyses.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="resume-file">
                      <FileText size={18} />
                      <span>{item.file}</span>
                    </div>
                  </td>

                  <td>{item.date}</td>

                  <td>
                    <strong className="table-score">{item.score}/100</strong>
                  </td>

                  <td>
                    <span className="status-badge">Completed</span>
                  </td>

                  <td>
                    <button
                      className="table-action"
                      onClick={() => navigate("/results")}
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Dashboard;