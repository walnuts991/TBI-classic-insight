import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <nav
      style={{
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 50px",
        background: darkMode
          ? "rgba(15,23,42,0.85)"
          : "rgba(255,255,255,0.9)",
        color: darkMode ? "white" : "black",
        backdropFilter: "blur(10px)",
      }}
    >
      <h2
        style={{
          color: darkMode ? "#fbbf24" : "#1e293b",
          margin: 0,
        }}
      >
        Classic Insight
      </h2>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            color: darkMode ? "white" : "black",
            marginRight: "25px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Home
        </Link>

        <Link
          to="/about"
          style={{
            color: darkMode ? "white" : "black",
            marginRight: "25px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Features
        </Link>

        <Link
          to="/dashboard"
          style={{
            color: darkMode ? "white" : "black",
            marginRight: "25px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Dashboard
        </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-yellow-400 text-black px-3 py-1 rounded-lg ml-4"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;