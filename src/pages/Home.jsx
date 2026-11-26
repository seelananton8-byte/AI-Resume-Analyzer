import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Upload,
  Sparkles,
  Target,
  FileCheck,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import "../styles/home.css";

function Home() {
  return (
    <>
      <Navbar />

      <main className="hero">
        <div className="hero-content">
          <div className="badge">
            <Sparkles size={15} />
            AI-Powered Resume Intelligence
          </div>

          <h1>
            Your resume deserves
            <span> to stand out.</span>
          </h1>

          <p className="hero-description">
            Analyze your resume with AI, discover your strengths,
            identify skill gaps, and get actionable recommendations
            to land your dream job.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="primary-btn">
              Analyze My Resume
              <ArrowRight size={18} />
            </Link>

            <Link to="/login" className="secondary-btn">
              Sign In
            </Link>
          </div>

          <div className="trust-points">
            <span>
              <CheckCircle size={16} /> AI-powered insights
            </span>
            <span>
              <CheckCircle size={16} /> ATS optimization
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="analysis-card">
            <div className="card-header">
              <div>
                <p className="small-label">RESUME ANALYSIS</p>
                <h3>Overall Score</h3>
              </div>
              <Sparkles className="sparkle-icon" />
            </div>

            <div className="hero-score-circle">
              <div>
                <strong>85</strong>
                <span>/100</span>
              </div>
            </div>

            <p className="score-label">Excellent Resume!</p>

            <div className="score-details">
              <div>
                <span>ATS Compatibility</span>
                <strong>90%</strong>
              </div>

              <div className="progress">
                <div style={{ width: "90%" }} />
              </div>

              <div>
                <span>Skills Match</span>
                <strong>78%</strong>
              </div>

              <div className="progress">
                <div style={{ width: "78%" }} />
              </div>

              <div>
                <span>Content Quality</span>
                <strong>86%</strong>
              </div>

              <div className="progress">
                <div style={{ width: "86%" }} />
              </div>
            </div>

            <div className="recommendation">
              <Sparkles size={17} />
              <p>
                Add measurable achievements to strengthen
                your resume.
              </p>
            </div>
          </div>

          <div className="floating-icon hero-float-upload">
            <Upload size={22} />
          </div>

          <div className="floating-icon hero-float-target">
            <Target size={22} />
          </div>

          <div className="floating-icon hero-float-file">
            <FileCheck size={22} />
          </div>
        </div>
      </main>

      <section className="features">
        <div className="section-heading">
          <p className="small-label">SMARTER CAREER TOOLS</p>
          <h2>Everything you need to improve your resume</h2>
          <p>Turn your resume into a career-winning document.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon purple">
              <Sparkles />
            </div>
            <h3>AI Resume Analysis</h3>
            <p>
              Get intelligent feedback about your resume's
              strengths and weaknesses.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon blue">
              <Target />
            </div>
            <h3>ATS Score</h3>
            <p>
              Understand how well your resume performs
              with applicant tracking systems.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">
              <FileCheck />
            </div>
            <h3>Actionable Suggestions</h3>
            <p>
              Discover skills, keywords, and improvements
              to make your resume stronger.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;