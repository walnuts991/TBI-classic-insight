import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import heroImage from "../assets/images/hotel-lobby-login.jpg";
import lightHeroImage from "../assets/images/hotel-lobby-light.jpg";
import ThemeImage from "../components/ThemeImage";
import Navbar from "../components/navbar";
import { useTheme } from "../Theme";

const themeClasses = {
  light: {
    page: "bg-white text-[#111827]",
    nav: "border-stone-200 bg-white text-[#111827]",
    section: "bg-[#FAFAF9]",
    card: "border-stone-200 bg-white shadow-[0_24px_70px_rgba(17,24,39,0.10)]",
    field: "border-stone-300 bg-white text-[#111827] placeholder:text-stone-400 focus:border-[#C8A165]",
    heading: "text-[#111827]",
    body: "text-[#374151]",
    muted: "text-[#4B5563]",
    icon: "text-[#374151]",
    subtle: "border-stone-300 bg-stone-50 hover:bg-stone-100",
    divider: "border-stone-200",
    imagePanel: "bg-white",
  },
  dark: {
    page: "bg-[#0F172A] text-[#F8FAFC]",
    nav: "border-slate-700 bg-[#0F172A] text-[#F8FAFC]",
    section: "bg-[#0F172A]",
    card: "border-slate-700 bg-[#1E293B] shadow-[0_24px_70px_rgba(0,0,0,0.34)]",
    field: "border-slate-600 bg-[#0F172A] text-[#F8FAFC] placeholder:text-slate-500 focus:border-[#C8A165]",
    heading: "text-[#F8FAFC]",
    body: "text-[#CBD5E1]",
    muted: "text-[#CBD5E1]",
    icon: "text-[#CBD5E1]",
    subtle: "border-slate-600 bg-[#1E293B] hover:bg-[#263449]",
    divider: "border-slate-700",
    imagePanel: "bg-[#111827]",
  },
};

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.7 2.7 0 1 1 4.6 1.9c-.9.8-1.6 1.2-1.6 2.6" />
        <path d="M12 17h.01" />
      </>
    ),
    bell: (
      <>
        <path d="M6 17h12l-1.5-2.5V10a4.5 4.5 0 0 0-9 0v4.5L6 17z" />
        <path d="M10 20h4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 20c1.7-3.4 4.2-5 7.5-5s5.8 1.6 7.5 5" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M4 7l8 6 8-6" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <path d="M12 14v2" />
      </>
    ),
    eyeOff: (
      <>
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.5 5.5A9.8 9.8 0 0 1 12 5c5 0 8.5 4.2 9.5 7a11.8 11.8 0 0 1-2.2 3.4" />
        <path d="M6.4 6.7A12 12 0 0 0 2.5 12c1 2.8 4.5 7 9.5 7 1.4 0 2.7-.3 3.8-.9" />
      </>
    ),
    moon: <path d="M20 14.8A8.5 8.5 0 0 1 9.2 4a7 7 0 1 0 10.8 10.8z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...common}>
      {icons[name]}
    </svg>
  );
}

function MicrosoftMark() {
  return (
    <span className="grid h-5 w-5 grid-cols-2 gap-0.5">
      <span className="bg-[#F25022]" />
      <span className="bg-[#7FBA00]" />
      <span className="bg-[#00A4EF]" />
      <span className="bg-[#FFB900]" />
    </span>
  );
}

function GoogleMark() {
  return <span className="text-xl font-bold text-[#4285F4]">G</span>;
}

function Login() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  const styles = themeClasses[isDark ? "dark" : "light"];
  const linkClass = ({ isActive }) =>
    `px-1 py-7 text-sm font-bold transition-colors ${
      isActive ? `border-b-2 border-[#C8A165] ${styles.heading}` : `${styles.body} hover:text-[#C8A165]`
    }`;

   async function handleSubmit(event) {
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful!");

    navigate("/dashboard");

  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
}

  return (
    <main className={`min-h-screen font-sans transition-colors ${styles.page}`}>
      <Navbar />
      <header className={`hidden sticky top-0 z-20 border-b ${styles.nav}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <Link to="/" className={`text-xl font-extrabold uppercase tracking-tight ${styles.heading}`}>
            Classic Insight
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <Link to="/#features" className={`px-1 py-7 text-sm font-bold transition-colors ${styles.body} hover:text-[#C8A165]`}>
              Features
            </Link>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          </nav>

          <div className={`flex items-center gap-3 ${styles.icon}`}>
            <button type="button" className={`hidden rounded-full border p-2 transition-colors sm:inline-flex ${styles.subtle}`} aria-label="Help">
              <Icon name="help" />
            </button>
            <button type="button" className={`hidden rounded-full border p-2 transition-colors sm:inline-flex ${styles.subtle}`} aria-label="Notifications">
              <Icon name="bell" />
            </button>
            <button type="button" className={`rounded-full border p-2 transition-colors ${styles.subtle}`} aria-label="Profile">
              <Icon name="user" />
            </button>
          </div>
        </div>
      </header>

      <section className={`${styles.section}`}>
        <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl gap-10 px-5 py-12 md:px-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-20">
          <div className={`rounded-2xl p-0 ${styles.imagePanel}`}>
            <ThemeImage
              lightSrc={lightHeroImage}
              darkSrc={heroImage}
              alt="Premium hotel room"
              className="premium-login-visual h-72 w-full rounded-2xl object-cover shadow-[0_20px_60px_rgba(17,24,39,0.12)] md:h-[460px]"
            />

            <div className="mt-10 max-w-xl">
              <h1 className={`text-4xl font-extrabold leading-tight tracking-tight md:text-5xl ${styles.heading}`}>
                Transform Hotel Reviews into Insights
              </h1>
              <div className="mt-7 h-1.5 w-16 rounded-full bg-[#C8A165]" />
              <p className={`mt-8 max-w-md text-base font-medium leading-8 md:text-lg ${styles.body}`}>
                Leverage AI-powered analytics to understand guest feedback, improve services, and enhance guest satisfaction.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={`rounded-2xl border p-8 md:p-14 ${styles.card}`}>
            <div>
              <h2 className={`text-3xl font-extrabold tracking-tight ${styles.heading}`}>Welcome Back</h2>
              <div className="mt-7 h-1.5 w-20 rounded-full bg-[#C8A165]" />
            </div>

            <div className="mt-10 space-y-7">
              <label className="block">
                <span className={`text-xs font-extrabold uppercase tracking-[0.12em] ${styles.muted}`}>Email Address</span>
                <span className="relative mt-3 block">
                  <Icon name="mail" className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${styles.icon}`} />
                  <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className={`h-14 w-full rounded-md border pl-14 pr-4 text-base font-medium outline-none transition-colors ${styles.field}`}
/>
                </span>
              </label>

              <label className="block">
                <span className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold uppercase tracking-[0.12em] ${styles.muted}`}>Password</span>
                  <a href="#" className="text-sm font-bold text-[#A57942] underline-offset-4 hover:underline">
                    Forgot Password?
                  </a>
                </span>
                <span className="relative mt-3 block">
                  <Icon name="lock" className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${styles.icon}`} />
                 <input
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className={`h-14 w-full rounded-md border px-14 text-base font-medium outline-none transition-colors ${styles.field}`}
/>
                  <Icon name="eyeOff" className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 ${styles.icon}`} />
                </span>
              </label>

              <label className={`flex items-center gap-3 text-sm font-semibold ${styles.body}`}>
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-stone-300 accent-[#C8A165]"
                />
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 h-16 w-full rounded-md bg-[#C8A165] text-base font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_14px_35px_rgba(168,121,66,0.28)] transition-colors hover:bg-[#B88F55]"
            >
              Sign in
            </button>

            <div className="my-9 flex items-center gap-5">
              <div className={`h-px flex-1 border-t ${styles.divider}`} />
              <span className={`text-xs font-extrabold uppercase tracking-[0.16em] ${styles.muted}`}>Or Continue With</span>
              <div className={`h-px flex-1 border-t ${styles.divider}`} />
            </div>

            <div className="space-y-4">
              <button
                type="button"
                className={`flex h-14 w-full items-center justify-center gap-4 rounded-md border text-base font-bold transition-colors ${styles.subtle} ${styles.heading}`}
              >
                <GoogleMark />
                Continue with Google
              </button>
              <button
                type="button"
                className={`flex h-14 w-full items-center justify-center gap-4 rounded-md border text-base font-bold transition-colors ${styles.subtle} ${styles.heading}`}
              >
                <MicrosoftMark />
                Continue with Microsoft
              </button>
            </div>

            <p className={`mt-10 text-center text-sm font-medium ${styles.body}`}>
              Don't have an account?{" "}
              <Link to="/register" className="font-extrabold text-[#A57942] underline underline-offset-4">
                Sign Up Now
              </Link>
            </p>
          </form>
        </div>
      </section>

      <footer className={`border-t ${styles.nav}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm font-medium md:flex-row md:items-center md:justify-between md:px-10">
          <p className={styles.muted}>(c) 2026 Classic Insight. All rights reserved.</p>
          <div className={`flex flex-wrap gap-8 ${styles.muted}`}>
            <a href="#" className="hover:text-[#C8A165]">Help Center</a>
            <a href="#" className="hover:text-[#C8A165]">Privacy Policy</a>
            <a href="#" className="hover:text-[#C8A165]">Terms of Service</a>
            <a href="#" className="hover:text-[#C8A165]">API Status</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Login;
