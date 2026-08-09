import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Reviews from "./pages/Reviews";
import Features from "./pages/features";
import Register from "./pages/Register";
import AIChat from "./components/AIChat";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/features" element={<Features />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <AIChat />
    </>
  );
}

export default App;
