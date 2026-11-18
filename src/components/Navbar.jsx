import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <FileText size={25} />
        <span>ResumeAI</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register" className="nav-btn">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;