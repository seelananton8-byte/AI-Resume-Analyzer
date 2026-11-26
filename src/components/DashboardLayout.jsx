import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  History,
  User,
  Settings,
  LogOut,
  Upload,
  Sparkles,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/dashboard.css";

const linkClass = ({ isActive }) =>
  `sidebar-link ${isActive ? "active" : ""}`;

function DashboardLayout() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

    const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div
      className={`dashboard-layout ${
        mobileMenuOpen ? "mobile-menu-open" : ""
      }`}
    >
      {mobileMenuOpen && (
        <button
          className="mobile-sidebar-backdrop"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
        />
      )}

      <aside className="dashboard-sidebar">
        <div className="mobile-sidebar-heading">
          <Link
            to="/"
            className="dashboard-logo"
            onClick={closeMobileMenu}
          >
            <FileText size={24} />
            <span>ResumeAI</span>
          </Link>

          <button
            className="mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        <Link to="/" className="dashboard-logo">
          <FileText size={25} />
          <span>ResumeAI</span>
        </Link>

        <p className="sidebar-label">MENU</p>

        <nav className="sidebar-nav" aria-label="Main menu">
          <NavLink
            to="/dashboard"
            className={linkClass}
            onClick={closeMobileMenu}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <NavLink
            to="/analyze"
            className={linkClass}
            onClick={closeMobileMenu}
          >
            <Upload size={19} />
            Analyze Resume
          </NavLink>

          <NavLink
            to="/history"
            className={linkClass}
            onClick={closeMobileMenu}
          >
            <History size={19} />
            History
          </NavLink>
        </nav>

        <p className="sidebar-label">ACCOUNT</p>

        <nav className="sidebar-nav" aria-label="Account menu">
          <NavLink
            to="/profile"
            className={linkClass}
            onClick={closeMobileMenu}
          >
            <User size={19} />
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            className={linkClass}
            onClick={closeMobileMenu}
          >
            <Settings size={19} />
            Settings
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <Sparkles size={20} />
            <h4>Improve your resume</h4>
            <p>
              Get AI-powered insights to boost your career.
            </p>

            <Link to="/analyze" onClick={closeMobileMenu}>
              Analyze now <ChevronRight size={15} />
            </Link>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="mobile-menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="mobile-topbar-brand">
            <FileText size={21} />
            <span>ResumeAI</span>
          </Link>

          <div className="dashboard-search">
            <Search size={18} />
            <input
              placeholder="Search..."
              aria-label="Search"
            />
          </div>

          <button
            className="notification-btn"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

          <Link
            to="/profile"
            className="user-avatar"
            aria-label="Profile"
          >
            {initials}
          </Link>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;