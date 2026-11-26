import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { listAnalyses, deleteAnalysis } from "../services/analysisService";
import { getErrorMessage } from "../services/api";
import { useToast } from "../hooks/useToast";
import { formatDate } from "../utils/format";
import "../styles/history.css";

function History() {
  const toast = useToast();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    let active = true;

    listAnalyses()
      .then((data) => {
        if (active) setAnalyses(data);
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

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return analyses;
    return analyses.filter((a) => a.fileName.toLowerCase().includes(query));
  }, [analyses, search]);

  const total = analyses.length;
  const average = total
    ? Math.round(analyses.reduce((sum, a) => sum + a.overallScore, 0) / total)
    : 0;
  const highest = total ? Math.max(...analyses.map((a) => a.overallScore)) : 0;

  // First click asks for confirmation, second click deletes
  const handleDelete = async (id) => {
    if (confirmId !== id) {
      setConfirmId(id);
      setTimeout(() => setConfirmId((current) => (current === id ? null : current)), 4000);
      return;
    }

    try {
      await deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
      toast.success("Analysis deleted.");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setConfirmId(null);
    }
  };

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
          <h2>{total}</h2>
          <p>Resumes analyzed</p>
        </div>

        <div className="history-stat-card">
          <span>Average Score</span>
          <h2>
            {total ? average : "–"}
            {total > 0 && <small>/100</small>}
          </h2>
          <p>Across all analyses</p>
        </div>

        <div className="history-stat-card">
          <span>Highest Score</span>
          <h2>
            {total ? highest : "–"}
            {total > 0 && <small>/100</small>}
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
              aria-label="Search resumes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="history-empty">Loading your analyses...</div>
        ) : error ? (
          <div className="history-empty">{error}</div>
        ) : total === 0 ? (
          <div className="history-empty">
            <p>You haven't analyzed any resume yet.</p>
            <Link to="/analyze" className="history-new-analysis">
              Analyze your first resume
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="history-empty">No resumes match "{search}".</div>
        ) : (
          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Resume Name</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>ATS Score</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="history-file">
                        <span className="history-file-icon">
                          <FileText size={18} />
                        </span>
                        <span>{item.fileName}</span>
                      </div>
                    </td>

                    <td>{formatDate(item.createdAt)}</td>

                    <td>
                      <div className="history-score">
                        <strong>{item.overallScore}</strong>
                        <span>/100</span>
                      </div>
                    </td>

                    <td>
                      <div className="history-score">
                        <strong>{item.scores.atsCompatibility}</strong>
                        <span>/100</span>
                      </div>
                    </td>

                    <td className="history-actions">
                      <Link
                        to={`/results/${item.id}`}
                        className="history-view-button"
                      >
                        View Results
                      </Link>
                      <button
                        type="button"
                        className={`history-delete-button ${
                          confirmId === item.id ? "confirm" : ""
                        }`}
                        onClick={() => handleDelete(item.id)}
                      >
                        {confirmId === item.id ? "Click to confirm" : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;