import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

function Navbar() { 
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Demo", path: "/components" },
    { name: "Login", path: "/login" },
      { name: "Reviews", path: "/reviews" }, 
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        darkMode
          ? "bg-[#111111] text-white"
          : "bg-[#FAF8F5] text-black"
      } shadow-sm`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-5">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide"
        >
          CLASSIC INSIGHT
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[15px] font-semibold transition-all duration-300 pb-1

              ${
                location.pathname === item.path
                  ? "text-[#C59B63] border-b-2 border-[#C59B63]"
                  : darkMode
                  ? "text-white hover:text-[#C59B63]"
                  : "text-black hover:text-[#C59B63]"
              }

              `}
            >
              {item.name}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-8 rounded-full flex items-center px-1 transition-all duration-300 ${
              darkMode
                ? "bg-[#C59B63] justify-end"
                : "bg-gray-300 justify-start"
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-white shadow flex items-center justify-center">
              {darkMode ? (
                <Moon size={14} className="text-black" />
              ) : (
                <Sun size={14} className="text-yellow-500" />
              )}
            </div>
          </button>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;
