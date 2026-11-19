import {
  LayoutDashboard,
  FileText,
  History,
  User,
  Settings,
  LogOut,
  Upload,
  Sparkles,
  TrendingUp,
  Target,
  ArrowUpRight,
  Bell,
  Search,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">

        <Link to="/" className="dashboard-logo">
          <FileText size={25} />
          <span>ResumeAI</span>
        </Link>

        <p className="sidebar-label">MENU</p>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-link active">
            <LayoutDashboard size={19} />
            Dashboard
          </Link>

          <Link to="/analyze" className="sidebar-link">
            <Upload size={19} />
            Analyze Resume
          </Link>

          <Link to="/history" className="sidebar-link">
            <History size={19} />
            History
          </Link>
        </nav>

        <p className="sidebar-label">ACCOUNT</p>

        <nav className="sidebar-nav">
          <Link to="/profile" className="sidebar-link">
            <User size={19} />
            Profile
          </Link>

          <Link to="/settings" className="sidebar-link">
            <Settings size={19} />
            Settings
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <Sparkles size={20} />
            <h4>Improve your resume</h4>
            <p>Get AI-powered insights to boost your career.</p>

            <Link to="/analyze">
              Analyze now <ChevronRight size={15} />
            </Link>
          </div>

          <button className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </aside>

      {/* Main content */}
      <main className="dashboard-main">

        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="dashboard-search">
            <Search size={18} />
            <input placeholder="Search..." />
          </div>

          <button className="notification-btn">
            <Bell size={20} />
          </button>

          <div className="user-avatar">AS</div>
        </header>

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
            <h2>78<span>/100</span></h2>

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
            <h2>92<span>/100</span></h2>

            <span className="stat-trend">
              Excellent performance
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

              <button className="icon-action">
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
              <div className="breakdown-item">
                <div>
                  <span>ATS Compatibility</span>
                  <strong>90%</strong>
                </div>

                <div className="breakdown-bar">
                  <span style={{ width: "90%" }} />
                </div>
              </div>

              <div className="breakdown-item">
                <div>
                  <span>Skills Match</span>
                  <strong>78%</strong>
                </div>

                <div className="breakdown-bar">
                  <span style={{ width: "78%" }} />
                </div>
              </div>

              <div className="breakdown-item">
                <div>
                  <span>Content Quality</span>
                  <strong>86%</strong>
                </div>

                <div className="breakdown-bar">
                  <span style={{ width: "86%" }} />
                </div>
              </div>
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
                <tr>
                  <td>
                    <div className="resume-file">
                      <FileText size={18} />
                      <span>Software_Developer.pdf</span>
                    </div>
                  </td>

                  <td>Nov 18, 2026</td>

                  <td>
                    <strong className="table-score">85/100</strong>
                  </td>

                  <td>
                    <span className="status-badge">Completed</span>
                  </td>

                  <td>
                    <button className="table-action">
                      View Report
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="resume-file">
                      <FileText size={18} />
                      <span>Frontend_Developer.pdf</span>
                    </div>
                  </td>

                  <td>Nov 15, 2026</td>

                  <td>
                    <strong className="table-score">78/100</strong>
                  </td>

                  <td>
                    <span className="status-badge">Completed</span>
                  </td>

                  <td>
                    <button className="table-action">
                      View Report
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="resume-file">
                      <FileText size={18} />
                      <span>My_Resume_v1.pdf</span>
                    </div>
                  </td>

                  <td>Nov 10, 2026</td>

                  <td>
                    <strong className="table-score">65/100</strong>
                  </td>

                  <td>
                    <span className="status-badge">Completed</span>
                  </td>

                  <td>
                    <button className="table-action">
                      View Report
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;