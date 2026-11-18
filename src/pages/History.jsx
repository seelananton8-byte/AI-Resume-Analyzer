import { Link } from "react-router-dom";
import "../styles/history.css";

function History() {
  const historyData = [
    {
      id: 1,
      name: "Frontend_Developer_Resume.pdf",
      date: "Nov 18, 2026",
      score: 85,
      status: "Completed",
    },
    {
      id: 2,
      name: "React_Developer_CV.pdf",
      date: "Nov 16, 2026",
      score: 72,
      status: "Completed",
    },
    {
      id: 3,
      name: "Software_Engineer_Resume.pdf",
      date: "Nov 14, 2026",
      score: 91,
      status: "Completed",
    },
    {
      id: 4,
      name: "Web_Developer_Profile.pdf",
      date: "Nov 12, 2026",
      score: 64,
      status: "Completed",
    },
    {
      id: 5,
      name: "FullStack_Developer_CV.pdf",
      date: "Nov 10, 2026",
      score: 78,
      status: "Completed",
    },
  ];

  return (
    <div className="history-page">
      {/* Header */}
      <div className="history-header">
        <div>
          <span className="history-breadcrumb">
            Dashboard / Analysis History
          </span>

          <h1>Analysis History</h1>

          <p>Track and review your previous resume analyses.</p>
        </div>

        <Link to="/analyze" className="history-new-analysis">
          + New Analysis
        </Link>
      </div>

      {/* Stats */}
      <div className="history-stats">
        <div className="history-stat-card">
          <span>Total Analyses</span>
          <h2>{historyData.length}</h2>
          <p>Resumes analyzed</p>
        </div>

        <div className="history-stat-card">
          <span>Average Score</span>
          <h2>
            {Math.round(
              historyData.reduce((total, item) => total + item.score, 0) /
                historyData.length
            )}
            <small>/100</small>
          </h2>
          <p>Across all analyses</p>
        </div>

        <div className="history-stat-card">
          <span>Highest Score</span>
          <h2>
            {Math.max(...historyData.map((item) => item.score))}
            <small>/100</small>
          </h2>
          <p>Best resume performance</p>
        </div>
      </div>

      {/* History Table */}
      <div className="history-table-card">
        <div className="history-table-heading">
          <div>
            <h2>Previous Analyses</h2>
            <p>Your resume analysis records</p>
          </div>

          <div className="history-search">
            <input
              type="text"
              placeholder="Search resumes..."
            />
          </div>
        </div>

        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Resume Name</th>
                <th>Date</th>
                <th>Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {historyData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="history-file">
                      <span className="history-file-icon">📄</span>
                      <span>{item.name}</span>
                    </div>
                  </td>

                  <td>{item.date}</td>

                  <td>
                    <div className="history-score">
                      <strong>{item.score}</strong>
                      <span>/100</span>
                    </div>
                  </td>

                  <td>
                    <span className="history-status">
                      ● {item.status}
                    </span>
                  </td>

                  <td>
                    <Link
                      to="/results"
                      className="history-view-button"
                    >
                      View Results
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State can be added later */}
    </div>
  );
}

export default History;