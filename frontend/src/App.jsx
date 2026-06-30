import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import ComponentsDemo from "./pages/ComponentsDemo";
import Reviews from "./pages/Reviews";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/components" element={<ComponentsDemo />} />
      <Route path="/reviews" element={<Reviews />} />
    </Routes>
  );
}

export default App;
