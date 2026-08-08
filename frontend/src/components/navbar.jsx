import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../Theme";

const links = [
  ["Home", "/"], ["Features", "/features"], ["Dashboard", "/dashboard"],
  ["Reviews", "/reviews"], ["About", "/about"], ["Login", "/login"],
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`;

  return <header className="site-navbar">
    <div className="site-navbar-inner">
      <Link className="brand" to="/">Classic Insight</Link>
      <nav className={`${open ? "nav-open" : ""} site-nav`} aria-label="Primary navigation">
        {links.map(([label, path]) => <NavLink key={path} to={path} className={linkClass} onClick={() => setOpen(false)}>{label}</NavLink>)}
      </nav>
      <div className="nav-actions">
        <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}>
          {isDark ? <Sun size={16} /> : <Moon size={16} />}<span>{isDark ? "Light" : "Dark"}</span>
        </button>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><Menu size={20} /></button>
      </div>
    </div>
  </header>;
}
