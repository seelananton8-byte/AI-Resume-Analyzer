import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/forget-page.css";

const content = {
  terms: {
    title: "Terms & Conditions",
    sections: [
      {
        heading: "1. Use of the service",
        text: "ResumeAI lets you upload a resume and receive AI-generated suggestions. You agree to upload only documents you have the right to share.",
      },
      {
        heading: "2. Your account",
        text: "You are responsible for keeping your login details secure and for all activity under your account.",
      },
      {
        heading: "3. AI suggestions",
        text: "Suggestions are generated automatically and are guidance only. We do not guarantee interviews or job offers.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "1. Information we collect",
        text: "We collect your account details and the resumes you upload so we can provide analysis and show your history.",
      },
      {
        heading: "2. How we use it",
        text: "Your resume text is processed by an AI provider to generate feedback. We do not sell your personal information.",
      },
      {
        heading: "3. Your choices",
        text: "You can delete your analysis history or your account at any time from the Settings page.",
      },
    ],
  },
};

function Legal({ type }) {
  const page = content[type];

  return (
    <div className="simple-page">
      <div className="simple-card wide">
        <Link to="/register" className="simple-back">
          <ArrowLeft size={16} />
          Back
        </Link>

        <h1>{page.title}</h1>
        <p className="simple-updated">Last updated: November 2026</p>

        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Legal;