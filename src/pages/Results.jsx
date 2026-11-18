import { Link } from "react-router-dom";
import "../styles/results.css";

function Results() {
  const skills = [
    { name: "React.js", score: 90 },
    { name: "JavaScript", score: 85 },
    { name: "CSS", score: 78 },
    { name: "Node.js", score: 65 },
    { name: "MongoDB", score: 55 },
  ];

  const strengths = [
    "Strong technical skills section",
    "Good project experience",
    "Clear resume structure",
    "Relevant technology stack",
  ];

  const weaknesses = [
    "Missing measurable achievements",
    "Limited professional experience details",
    "Some keywords are missing",
  ];

  const suggestions = [
    {
      number: "01",
      title: "Add measurable achievements",
      description:
        "Include measurable results in your projects and experience. Use numbers to demonstrate your impact.",
    },
    {
      number: "02",
      title: "Improve keyword optimization",
      description:
        "Add relevant industry keywords and technical skills to improve ATS compatibility.",
    },
    {
      number: "03",
      title: "Strengthen project descriptions",
      description:
        "Explain the technologies used, your role, and the problems you solved in each project.",
    },
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

          <p>
            Here's your resume performance overview and personalized
            recommendations.
          </p>
        </div>

        <Link to="/analyze" className="reanalyze-button">
          + Analyze New Resume
        </Link>
      </div>

      {/* Score Cards */}
      <div className="results-stats">
        {/* Overall Score */}
        <div className="result-stat-card overall-card">
          <div className="stat-card-top">
            <span>Overall Resume Score</span>
            <span className="stat-icon purple-icon">✦</span>
          </div>

          <div className="score-content">
            <div className="score-circle">
              <div className="score-circle-inner">
                <strong>78</strong>
                <span>/100</span>
              </div>
            </div>

            <div className="score-info">
              <span className="score-status">Good Performance</span>
              <p>Your resume is performing well!</p>
            </div>
          </div>
        </div>

        {/* ATS Score */}
        <div className="result-stat-card">
          <div className="stat-card-top">
            <span>ATS Compatibility</span>
            <span className="stat-icon blue-icon">◎</span>
          </div>

          <div className="stat-number">
            82<span>/100</span>
          </div>

          <div className="stat-progress">
            <div
              className="stat-progress-fill ats-fill"
              style={{ width: "82%" }}
            ></div>
          </div>

          <p className="stat-description">
            Your resume is ATS-friendly
          </p>
        </div>

        {/* Skills */}
        <div className="result-stat-card">
          <div className="stat-card-top">
            <span>Skills Match</span>
            <span className="stat-icon green-icon">✓</span>
          </div>

          <div className="stat-number">
            74<span>%</span>
          </div>

          <div className="stat-progress">
            <div
              className="stat-progress-fill skills-fill"
              style={{ width: "74%" }}
            ></div>
          </div>

          <p className="stat-description">
            Your skills match the target profile
          </p>
        </div>

        {/* Improvement */}
        <div className="result-stat-card">
          <div className="stat-card-top">
            <span>Improvement Areas</span>
            <span className="stat-icon orange-icon">↗</span>
          </div>

          <div className="stat-number">
            03<span> areas</span>
          </div>

          <p className="stat-description">
            Focus on these to improve your score
          </p>
        </div>
      </div>

      {/* Main Analysis */}
      <div className="results-main-grid">
        {/* Skills Analysis */}
        <div className="results-panel">
          <div className="panel-heading">
            <div>
              <h2>Skills Analysis</h2>
              <p>Your technical skills performance</p>
            </div>
          </div>

          <div className="skills-list">
            {skills.map((skill, index) => (
              <div className="skill-row" key={index}>
                <div className="skill-info">
                  <span>{skill.name}</span>
                  <strong>{skill.score}%</strong>
                </div>

                <div className="skill-progress">
                  <div
                    className="skill-progress-fill"
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Breakdown */}
        <div className="results-panel">
          <div className="panel-heading">
            <div>
              <h2>Resume Score Breakdown</h2>
              <p>Performance across key sections</p>
            </div>
          </div>

          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>Formatting</span>
              <div className="breakdown-bar">
                <div style={{ width: "90%" }}></div>
              </div>
              <strong>90</strong>
            </div>

            <div className="breakdown-item">
              <span>Skills</span>
              <div className="breakdown-bar">
                <div style={{ width: "78%" }}></div>
              </div>
              <strong>78</strong>
            </div>

            <div className="breakdown-item">
              <span>Experience</span>
              <div className="breakdown-bar">
                <div style={{ width: "68%" }}></div>
              </div>
              <strong>68</strong>
            </div>

            <div className="breakdown-item">
              <span>Education</span>
              <div className="breakdown-bar">
                <div style={{ width: "85%" }}></div>
              </div>
              <strong>85</strong>
            </div>

            <div className="breakdown-item">
              <span>Keywords</span>
              <div className="breakdown-bar">
                <div style={{ width: "72%" }}></div>
              </div>
              <strong>72</strong>
            </div>
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
          {suggestions.map((suggestion) => (
            <div
              className="suggestion-item"
              key={suggestion.number}
            >
              <div className="suggestion-number">
                {suggestion.number}
              </div>

              <div className="suggestion-content">
                <h3>{suggestion.title}</h3>
                <p>{suggestion.description}</p>
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