import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AnalyzeResume from "./pages/AnalyzeResume";
import History from "./pages/History";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/DashboardLayout";
import ForgotPassword from "./pages/ForgotPassword";
import Legal from "./pages/Legal";
import { ToastProvider } from "./context/ToastContext";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: 24,
      }}
    >
      <div>
        <h1 style={{ fontSize: 64, color: "var(--primary)" }}>404</h1>
        <p style={{ color: "var(--muted)", margin: "10px 0 22px" }}>
          This page doesn't exist.
        </p>
        <Link to="/" className="primary-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/terms" element={<Legal type="terms" />} />
        <Route path="/privacy" element={<Legal type="privacy" />} />

        {/* Logged-in pages share the sidebar layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyze" element={<AnalyzeResume />} />
          <Route path="/history" element={<History />} />
          <Route path="/results" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </ToastProvider>
  );
}

export default App;