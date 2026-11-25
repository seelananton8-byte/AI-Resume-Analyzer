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
} from "lucide-react";
import "../styles/dashboard.css";

const linkClass = ({ isActive }) =>
  `sidebar-link ${isActive ? "active" : ""}`;

function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: clear auth token after backend integration
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo">
          <FileText size={25} />
          <span>ResumeAI</span>
        </Link>

        <p className="sidebar-label">MENU</p>

        <nav className="sidebar-nav" aria-label="Main menu">
          <NavLink to="/dashboard" className={linkClass} title="Dashboard">
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>
          <NavLink to="/analyze" className={linkClass} title="Analyze Resume">
            <Upload size={19} />
            Analyze Resume
          </NavLink>
          <NavLink to="/history" className={linkClass} title="History">
            <History size={19} />
            History
          </NavLink>
        </nav>

        <p className="sidebar-label">ACCOUNT</p>

        <nav className="sidebar-nav" aria-label="Account menu">
          <NavLink to="/profile" className={linkClass} title="Profile">
            <User size={19} />
            Profile
          </NavLink>
          <NavLink to="/settings" className={linkClass} title="Settings">
            <Settings size={19} />
            Settings
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <Sparkles size={20} />
            <h4>Improve your resume</h4>
            <p>Get AI-powered insights to boost your career.</p>
            <Link to="/analyze">
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
          <div className="dashboard-search">
            <Search size={18} />
            <input placeholder="Search..." aria-label="Search" />
          </div>

          <button className="notification-btn" aria-label="Notifications">
            <Bell size={20} />
          </button>

          <Link to="/profile" className="user-avatar" aria-label="Profile">
            AS
          </Link>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;