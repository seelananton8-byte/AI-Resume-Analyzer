import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../services/api";
import "../styles/login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      await login(email.trim(), password);
      navigate(location.state?.from?.pathname || "/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* Left Side */}
        <div className="login-visual">

          <Link to="/" className="login-brand">
            <Sparkles size={23} />
            <span>ResumeAI</span>
          </Link>

          <div className="login-visual-content">
            <span className="login-eyebrow">
              YOUR CAREER JOURNEY
            </span>

            <h1>
              Build a resume
              <br />
              that gets you
              <br />
              <span>noticed.</span>
            </h1>

            <p>
              Unlock your potential with AI-powered resume
              insights and take the next step in your career.
            </p>

            <div className="login-feature">
              <Sparkles size={18} />
              AI-powered resume intelligence
            </div>

            <div className="login-feature">
              <Lock size={18} />
              Secure account access
            </div>
          </div>

          <div className="login-visual-footer">
            © 2026 ResumeAI. All rights reserved.
          </div>

        </div>

        {/* Right Side */}
        <div className="login-form-section">

          <div className="login-form-wrapper">

            <Link to="/" className="login-mobile-brand">
              <Sparkles size={22} />
              ResumeAI
            </Link>

            <div className="login-heading">
              <h2>Welcome back</h2>

              <p>
                Sign in to continue improving your resume.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="login-input-group">
                <label htmlFor="login-email">
                  Email Address
                </label>

                <div className="login-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="login-input-group">
                <div className="login-label-row">
                  <label htmlFor="login-password">
                    Password
                  </label>

                  <Link to="/forgot-password">
                    Forgot password?
                  </Link>
                </div>

                <div className="login-input-wrapper">
                  <Lock size={18} />

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span>Remember me</span>
              </label>

              {/* Error */}
              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

            </form>

            <div className="login-register-text">
              Don't have an account?{" "}
              <Link to="/register">
                Create an account
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;