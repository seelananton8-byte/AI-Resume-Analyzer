import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { useToast } from "../hooks/useToast";
import "../styles/forget-page.css";

function ForgotPassword() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    // TODO: call backend reset-password API
    toast.success("If an account exists, a reset link has been sent.");
    setEmail("");
  };

  return (
    <div className="simple-page">
      <div className="simple-card">
        <Link to="/login" className="simple-back">
          <ArrowLeft size={16} />
          Back to login
        </Link>

        <h1>Forgot password?</h1>
        <p>Enter your email and we'll send you a link to reset it.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="simple-field">
            <label htmlFor="forgot-email">Email Address</label>
            <div className="simple-input">
              <Mail size={18} />
              <input
                id="forgot-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="simple-error">{error}</div>}

          <button type="submit" className="simple-btn">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;