import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../services/api";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName.trim()) {
      return setError("Please enter your full name.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError("Please enter a valid email address.");
    }

    if (password.length < 8) {
      return setError("Password must contain at least 8 characters.");
    }

    if (!/(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      return setError(
        "Password must contain at least one uppercase letter and one number."
      );
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!agreeTerms) {
      return setError("Please accept the Terms & Conditions.");
    }

    // Frontend-only temporary action
        setIsLoading(true);
    try {
      await register(fullName.trim(), email.trim(), password);
      toast.success("Account created! Welcome to ResumeAI.");
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Left Section */}
      <div className="register-left">
        <div className="register-brand">
          <div className="register-logo">R</div>
          <span>ResumeAI</span>
        </div>

        <div className="register-left-content">
          <h1>Start building your career with confidence.</h1>

          <p>
            Create your account and unlock AI-powered resume insights,
            career recommendations, and smarter job opportunities.
          </p>

          <div className="register-feature">
            <span>✓</span>
            AI-powered resume analysis
          </div>

          <div className="register-feature">
            <span>✓</span>
            Personalized career insights
          </div>

          <div className="register-feature">
            <span>✓</span>
            Track your resume improvements
          </div>
        </div>

        <div className="register-footer">
          © 2026 ResumeAI. All rights reserved.
        </div>
      </div>

      {/* Right Section */}
      <div className="register-right">
        <div className="register-form-wrapper">
          <div className="register-heading">
            <h2>Create your account</h2>
            <p>Join ResumeAI and take the next step in your career.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="register-input-group">
              <label htmlFor="fullName">Full name</label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                autoComplete="name"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="register-input-group">
              <label htmlFor="email">Email address</label>

              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="register-input-group">
              <label htmlFor="password">Password</label>

              <div className="register-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="register-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <small>
                Minimum 8 characters, one uppercase letter and one number.
              </small>
            </div>

            {/* Confirm Password */}
            <div className="register-input-group">
              <label htmlFor="confirmPassword">Confirm password</label>

              <div className="register-password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="register-toggle-password"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="register-terms">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />

              <label htmlFor="terms">
                I agree to the{" "}
                <Link to="/terms" target="_blank" rel="noreferrer">Terms & Conditions</Link>{" "}
                and{" "}
                <Link to="/privacy" target="_blank" rel="noreferrer">Privacy Policy</Link>
                </label>
            </div>

            {/* Error */}
            {error && <div className="register-error">{error}</div>}

            {/* Submit */}
            <button
              type="submit"
              className="register-submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="register-login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;