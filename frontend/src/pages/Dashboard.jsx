import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
const ACCENT = "#C8A165";

const navItems = [
  { label: "Overview", icon: "grid", active: true },
  { label: "Reviews", icon: "message" },
  { label: "Sentiment", icon: "smile" },
  { label: "Competitors", icon: "branch" },
  { label: "Trends", icon: "trend" },
  { label: "Reports", icon: "report" },
];

const metrics = [
  {
    label: "Total Reviews",
    value: "12,482",
    helper: "vs last 30 days",
    change: "+12.4%",
    icon: "message",
    points: [12, 18, 16, 25, 31, 28, 36, 41, 35, 38, 47, 51],
  },
  {
    label: "Average Rating",
    value: "4.2",
    suffix: "/ 5.0",
    helper: "vs last 30 days",
    change: "+7.1%",
    icon: "star",
    points: [26, 23, 31, 34, 42, 39, 35, 37, 45, 43, 50, 49],
  },
  {
    label: "Sentiment Score",
    value: "78%",
    helper: "vs last 30 days",
    change: "+5.6%",
    icon: "smile",
    points: [18, 17, 26, 24, 34, 38, 31, 34, 30, 39, 45, 44],
  },
  {
    label: "Response Rate",
    value: "92.4%",
    helper: "vs last 30 days",
    change: "+3.8%",
    icon: "trend",
    points: [24, 23, 30, 36, 34, 41, 45, 38, 40, 48, 46, 52],
  },
];

const volumePoints = [
  155, 210, 465, 225, 265, 325, 500, 455, 410, 660, 605, 325, 420, 375, 300,
  350, 220, 565, 380, 295, 385, 695, 625, 265, 350,
];

const sentiments = [
  { label: "Positive", value: 78, color: ACCENT },
  { label: "Neutral", value: 14, color: "#D8CAB8" },
  { label: "Negative", value: 8, color: "#6B7280" },
];

const topics = [
  { label: "Food", value: 32 },
  { label: "Cleanliness", value: 24 },
  { label: "Staff", value: 18 },
  { label: "Room", value: 14 },
  { label: "Location", value: 12 },
];

const competitors = [
  { hotel: "Classic Insight (You)", rating: "4.2", sentiment: "78%", reviews: "12,482", current: true },
  { hotel: "Grand Imperial Suites", rating: "4.5", sentiment: "82%", reviews: "9,102" },
  { hotel: "Urban Boutique Inn", rating: "3.9", sentiment: "64%", reviews: "5,214" },
  { hotel: "Coastal Manor Resort", rating: "4.1", sentiment: "71%", reviews: "8,332" },
];

const recentReviews = [
  {
    guest: "Guest User #1024",
    time: "2 hours ago",
    text: "Great stay overall. The room was clean and spacious. Staff was friendly and helpful.",
    tone: "Positive",
    rating: "4.8",
  },
  {
    guest: "Guest User #1025",
    time: "5 hours ago",
    text: "The food was average and took too long to arrive. Also, the Wi-Fi was not working.",
    tone: "Negative",
    rating: "2.6",
  },
  {
    guest: "Guest User #1026",
    time: "Yesterday",
    text: "Excellent location and beautiful property. Highly recommended.",
    tone: "Positive",
    rating: "4.9",
  },
];

const insights = [
  {
    label: "Overall guest sentiment is improving (+5.6%).",
    icon: "check",
    tone: "success",
  },
  {
    label: "Guests frequently praise staff friendliness.",
    icon: "lightbulb",
    tone: "idea",
  },
  {
    label: "Breakfast quality is the most common complaint.",
    icon: "warning",
    tone: "warning",
  },
  {
    label: "Recommendation: Improve breakfast variety and reduce weekend wait times.",
    icon: "recommendation",
    tone: "recommendation",
  },
];

const themes = {
  light: {
    page: "bg-white text-[#111827]",
    header: "border-stone-300 bg-white text-[#111827]",
    shell: "bg-[#F8F8F7]",
    sidebar: "border-stone-300 bg-[#F7F7F5]",
    card: "border-stone-300 bg-white shadow-[0_18px_45px_rgba(17,24,39,0.08)]",
    subtleCard: "border-stone-300 bg-stone-50",
    heading: "text-[#111827]",
    body: "text-[#374151]",
    muted: "text-[#4B5563]",
    label: "text-[#374151]",
    icon: "text-[#374151]",
    divider: "border-stone-200",
    grid: "#E2E0DC",
    axis: "#C9C5BE",
    chartLabel: "fill-[#374151]",
    input: "border-stone-300 bg-white text-[#374151]",
    active: "bg-[#EDE2D2] text-[#111827]",
    nav: "text-[#374151] hover:bg-[#EFECEA] hover:text-[#111827]",
    currentRow: "bg-[#F1E7D8] text-[#111827]",
    neutralRow: "text-[#374151]",
    avatar: "border-stone-300 bg-stone-50 text-stone-400",
    footer: "text-[#4B5563]",
    toggle: "border-stone-300 bg-stone-50 text-[#111827] hover:bg-stone-100",
  },
  dark: {
    page: "bg-[#0F172A] text-[#F8FAFC]",
    header: "border-slate-700 bg-[#0F172A] text-[#F8FAFC]",
    shell: "bg-[#0F172A]",
    sidebar: "border-slate-700 bg-[#111827]",
    card: "border-slate-700 bg-[#1E293B] shadow-[0_18px_45px_rgba(0,0,0,0.24)]",
    subtleCard: "border-slate-700 bg-[#172033]",
    heading: "text-[#F8FAFC]",
    body: "text-[#CBD5E1]",
    muted: "text-[#CBD5E1]",
    label: "text-[#E2E8F0]",
    icon: "text-[#CBD5E1]",
    divider: "border-slate-700",
    grid: "#334155",
    axis: "#475569",
    chartLabel: "fill-[#CBD5E1]",
    input: "border-slate-600 bg-[#1E293B] text-[#CBD5E1]",
    active: "bg-[#3A3024] text-[#F8FAFC]",
    nav: "text-[#CBD5E1] hover:bg-[#1E293B] hover:text-[#F8FAFC]",
    currentRow: "bg-[#332B20] text-[#F8FAFC]",
    neutralRow: "text-[#CBD5E1]",
    avatar: "border-slate-600 bg-[#172033] text-slate-500",
    footer: "text-[#CBD5E1]",
    toggle: "border-slate-600 bg-[#1E293B] text-[#F8FAFC] hover:bg-[#263449]",
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
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </>
    ),
    message: (
      <>
        <path d="M4 5h16v11H8l-4 4V5z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
    smile: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 10h.01M15.5 10h.01M8.5 14.5c1.9 1.8 5.1 1.8 7 0" />
      </>
    ),
    branch: (
      <>
        <path d="M5 18c5-1 8-4 9-9" />
        <path d="M5 18l4 1M5 18l1-4M14 9l5-3M14 9l4 2" />
      </>
    ),
    trend: (
      <>
        <path d="M4 16l5-5 4 3 7-8" />
        <path d="M15 6h5v5" />
      </>
    ),
    report: (
      <>
        <rect x="4" y="4" width="16" height="16" />
        <path d="M8 16v-4M12 16V8M16 16v-6" />
      </>
    ),
    bell: (
      <>
        <path d="M6 17h12l-1.5-2.5V10a4.5 4.5 0 0 0-9 0v4.5L6 17z" />
        <path d="M10 20h4" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.7 2.7 0 1 1 4.6 1.9c-.9.8-1.6 1.2-1.6 2.6" />
        <path d="M12 17h.01" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 20c1.7-3.4 4.2-5 7.5-5s5.8 1.6 7.5 5" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7.3 7.3 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.8-1L14.4 3h-4.8l-.3 3.1a8 8 0 0 0-1.8 1l-2.4-1-2 3.4 2 1.5a7.3 7.3 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.8 1l.3 3.1h4.8l.3-3.1a8 8 0 0 0 1.8-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1z" />
      </>
    ),
    star: (
      <path d="M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5z" />
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.5 2.5L16.5 9" />
      </>
    ),
    lightbulb: (
      <>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M8.2 14.5a6 6 0 1 1 7.6 0c-.8.7-1.3 1.6-1.5 2.5H9.7c-.2-.9-.7-1.8-1.5-2.5z" />
      </>
    ),
    warning: (
      <>
        <path d="M12 4l9 16H3L12 4z" />
        <path d="M12 9v5M12 17h.01" />
      </>
    ),
    recommendation: (
      <>
        <path d="M12 4v16" />
        <path d="M5 11l7-7 7 7" />
        <path d="M5 19h14" />
      </>
    ),
    moon: (
      <path d="M20 14.8A8.5 8.5 0 0 1 9.2 4a7 7 0 1 0 10.8 10.8z" />
    ),
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

function Sparkline({ points, theme, className = "h-12 w-full" }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const width = 160;
  const height = 48;
  const step = width / (points.length - 1);
  const range = max - min || 1;
  const d = points
    .map((point, index) => {
      const x = index * step;
      const y = height - ((point - min) / range) * (height - 10) - 5;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none">
      <path d={d} fill="none" stroke={theme === "dark" ? "#D7B882" : ACCENT} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function MetricCard({ metric, styles, theme }) {
  return (
    <article className={`rounded-2xl border p-5 ${styles.card}`}>
      <div className="flex items-start justify-between gap-4">
        <p className={`text-xs font-bold uppercase tracking-[0.18em] ${styles.label}`}>{metric.label}</p>
        <span className={`rounded-lg border p-2 ${styles.subtleCard} ${styles.icon}`}>
          <Icon name={metric.icon} className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-5 flex items-end gap-2">
        <span className={`text-4xl font-bold tracking-tight ${styles.heading}`}>{metric.value}</span>
        {metric.suffix ? <span className={`pb-1 text-sm font-semibold ${styles.muted}`}>{metric.suffix}</span> : null}
      </div>
      <Sparkline points={metric.points} theme={theme} className="mt-5 h-10 w-full" />
      <p className="mt-3 text-xs font-semibold text-emerald-600">
        {metric.change} <span className={`font-medium ${styles.muted}`}>{metric.helper}</span>
      </p>
    </article>
  );
}

function Panel({ title, action, children, className = "", styles }) {
  return (
    <section className={`rounded-2xl border p-5 ${styles.card} ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className={`text-base font-bold tracking-tight ${styles.heading}`}>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function SidebarItem({ item, styles }) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
        item.active ? styles.active : styles.nav
      }`}
    >
      <Icon name={item.icon} className="h-4 w-4 shrink-0" />
      <span className="leading-none">{item.label}</span>
    </button>
  );
}

function VolumeChart({ styles }) {
  const width = 660;
  const height = 330;
  const padding = { top: 18, right: 12, bottom: 34, left: 42 };
  const max = 800;
  const xStep = (width - padding.left - padding.right) / (volumePoints.length - 1);
  const yScale = (value) => padding.top + (1 - value / max) * (height - padding.top - padding.bottom);
  const line = volumePoints
    .map((value, index) => `${index === 0 ? "M" : "L"} ${(padding.left + index * xStep).toFixed(1)} ${yScale(value).toFixed(1)}`)
    .join(" ");
  const yTicks = [0, 200, 400, 600, 800];

  return (
    <div className="overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[330px] w-full">
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={padding.left}
              y1={yScale(tick)}
              x2={width - padding.right}
              y2={yScale(tick)}
              stroke={styles.grid}
              strokeWidth="1.2"
            />
            <text x="10" y={yScale(tick) + 4} className={`text-[12px] ${styles.chartLabel}`}>
              {tick}
            </text>
          </g>
        ))}
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke={styles.axis} />
        <path d={line} fill="none" stroke={ACCENT} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        {["Apr 21", "Apr 28", "May 5", "May 12", "May 19"].map((label, index) => (
          <text
            key={label}
            x={padding.left + index * ((width - padding.left - padding.right) / 4)}
            y={height - 8}
            textAnchor={index === 0 ? "start" : index === 4 ? "end" : "middle"}
            className={`text-[12px] font-semibold ${styles.chartLabel}`}
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function SentimentDonut({ styles }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center justify-between gap-6">
      <svg viewBox="0 0 140 140" className="h-40 w-40 -rotate-90">
        <circle cx="70" cy="70" r={radius} fill="none" stroke={styles.grid} strokeWidth="26" />
        {sentiments.map((segment) => {
          const dash = (segment.value / 100) * circumference;
          const circle = (
            <circle
              key={segment.label}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="26"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>

      <div className="min-w-32 space-y-4">
        {sentiments.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between gap-5 text-sm">
            <span className={`flex items-center gap-2 font-semibold ${styles.body}`}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
              {segment.label}
            </span>
            <span className={`font-bold ${styles.heading}`}>{segment.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicBar({ topic, styles }) {
  return (
    <div className="grid grid-cols-[88px_1fr_44px] items-center gap-3 text-sm">
      <span className={`font-semibold ${styles.body}`}>{topic.label}</span>
      <div className={`h-1.5 rounded-full ${styles.subtleCard}`}>
        <div className="h-full rounded-full bg-[#C8A165]" style={{ width: `${topic.value * 2.4}%` }} />
      </div>
      <span className={`text-right font-bold ${styles.heading}`}>{topic.value}%</span>
    </div>
  );
}

function AIInsights({ styles }) {
  const toneClasses = {
    success: "text-emerald-600 bg-emerald-50 border-emerald-100",
    idea: "text-amber-700 bg-amber-50 border-amber-100",
    warning: "text-red-600 bg-red-50 border-red-100",
    recommendation: "text-blue-600 bg-blue-50 border-blue-100",
  };

  return (
    <Panel
      title="AI Insights"
      styles={styles}
      action={
        <span className="rounded-lg border border-[#C8A165]/40 bg-[#C8A165]/10 p-2 text-[#9C7A4E]">
          <Icon name="lightbulb" className="h-4 w-4" />
        </span>
      }
    >
      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.label} className={`flex gap-3 rounded-xl border p-3 ${styles.subtleCard}`}>
            <span className={`mt-0.5 rounded-lg border p-1.5 ${toneClasses[insight.tone]}`}>
              <Icon name={insight.icon} className="h-4 w-4" />
            </span>
            <p className={`text-sm font-medium leading-6 ${styles.body}`}>{insight.label}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function CompetitorTable({ styles }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className={`border-b text-xs font-bold uppercase tracking-[0.16em] ${styles.divider} ${styles.label}`}>
            <th className="py-3">Hotel</th>
            <th className="py-3">Rating</th>
            <th className="py-3">Sentiment</th>
            <th className="py-3 text-right">Reviews</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((competitor) => (
            <tr
              key={competitor.hotel}
              className={`border-b last:border-0 ${styles.divider} ${
                competitor.current ? styles.currentRow : styles.neutralRow
              }`}
            >
              <td className="rounded-l-xl px-3 py-4 font-semibold">{competitor.hotel}</td>
              <td className="px-3 py-4 font-semibold">{competitor.rating}</td>
              <td className="px-3 py-4 font-semibold">{competitor.sentiment}</td>
              <td className="rounded-r-xl px-3 py-4 text-right font-semibold">{competitor.reviews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReviewAvatar({ styles, name }) {
  const initials = name
    .replace("Guest User #", "GU")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border text-sm font-bold ${styles.avatar}`}>
      {initials}
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#9C7A4E]">
      <Icon name="star" className="h-3.5 w-3.5 fill-[#C8A165]" />
      {rating}
    </span>
  );
}

function RecentReviewItem({ review, styles }) {
  const positive = review.tone === "Positive";

  return (
    <article className={`flex gap-4 border-b py-5 last:border-0 last:pb-0 first:pt-0 ${styles.divider}`}>
      <ReviewAvatar styles={styles} name={review.guest} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className={`text-sm font-bold ${styles.heading}`}>{review.guest}</h3>
            <div className="mt-1 flex items-center gap-3">
              <span className={`text-xs font-semibold ${styles.muted}`}>{review.time}</span>
              <StarRating rating={review.rating} />
            </div>
          </div>
          <span
            className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${
              positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            }`}
          >
            {review.tone}
          </span>
        </div>
        <p className={`mt-3 text-sm leading-6 ${styles.body}`}>{review.text}</p>
      </div>
    </article>
  );
}

function Dashboard() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return localStorage.getItem("classicInsightTheme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("classicInsightTheme", theme);
  }, [theme]);

  const isDark = theme === "dark";
  const styles = themes[theme];

  return (
    <main className={`min-h-screen text-left font-sans transition-colors ${styles.page}`}>
      <header className={`sticky top-0 z-30 flex h-20 items-center justify-between border-b px-6 lg:px-9 ${styles.header}`}>
        <div className="flex items-center gap-8">
          <h1 className={`text-xl font-bold tracking-tight ${styles.heading}`}>Classic Insight</h1>
          <div className={`hidden h-8 w-px md:block ${isDark ? "bg-slate-700" : "bg-stone-300"}`} />
          <span className={`hidden rounded border px-3 py-1 text-sm font-bold uppercase tracking-[0.14em] md:inline-flex ${styles.input}`}>
            Dashboard
          </span>
        </div>

        <div className={`flex items-center gap-3 ${styles.icon}`}>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition-colors ${styles.toggle}`}
            aria-label="Toggle color theme"
          >
            <Icon name={isDark ? "sun" : "moon"} className="h-4 w-4" />
            {isDark ? "Light" : "Dark"}
          </button>
          <button type="button" className={`rounded-full p-2 transition-colors ${styles.nav}`} aria-label="Notifications">
            <Icon name="bell" className="h-5 w-5" />
          </button>
          <button type="button" className={`rounded-full p-2 transition-colors ${styles.nav}`} aria-label="Help">
            <Icon name="help" className="h-5 w-5" />
          </button>
          <button type="button" className={`rounded-full border p-2 transition-colors ${styles.toggle}`} aria-label="Profile">
            <Icon name="user" className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className={`hidden border-r px-5 py-7 lg:flex lg:flex-col ${styles.sidebar}`}>
          <div className="mb-8 flex items-center gap-4">
            <ReviewAvatar styles={styles} name="Classic Insight" />
            <div>
              <p className={`text-sm font-bold ${styles.heading}`}>Classic Insight</p>
              <p className={`mt-1 text-[11px] font-bold uppercase tracking-[0.14em] ${styles.muted}`}>
                Enterprise Analytics
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <SidebarItem key={item.label} item={item} styles={styles} />
            ))}
          </nav>

          <button
            type="button"
            className={`mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${styles.nav}`}
          >
            <Icon name="settings" className="h-4 w-4 shrink-0" />
            <span className="leading-none">Settings</span>
          </button>
        </aside>

        <section className={`px-5 py-8 md:px-8 lg:px-9 ${styles.shell}`}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9C7A4E]">Hotel Review Intelligence</p>
              <h2 className={`mt-3 text-2xl font-bold tracking-tight md:text-3xl ${styles.heading}`}>
                Dashboard Overview
              </h2>
              <p className={`mt-3 max-w-2xl text-sm font-medium leading-6 md:text-base ${styles.body}`}>
                Real-time analysis of guest experience, review quality, and competitive hotel performance.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} metric={metric} styles={styles} theme={theme} />
              ))}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
              <Panel
                title="Review Volume Trends"
                styles={styles}
                action={
                  <select className={`rounded-lg border px-3 py-2 text-xs font-bold outline-none focus:border-[#C8A165] ${styles.input}`}>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                  </select>
                }
              >
                <VolumeChart styles={styles} />
              </Panel>

              <div className="grid gap-6">
                <Panel title="Sentiment Distribution" styles={styles}>
                  <SentimentDonut styles={styles} />
                </Panel>

                <Panel title="Top Review Topics" styles={styles}>
                  <div className="space-y-4">
                    {topics.map((topic) => (
                      <TopicBar key={topic.label} topic={topic} styles={styles} />
                    ))}
                  </div>
                </Panel>

                <AIInsights styles={styles} />
              </div>
            </div>

            <Panel title="Competitor Comparison" className="mt-6" styles={styles}>
              <CompetitorTable styles={styles} />
            </Panel>

            <Panel title="Recent Reviews" className="mt-6" styles={styles}>
              {recentReviews.map((review) => (
                <RecentReviewItem key={review.guest} review={review} styles={styles} />
              ))}
            </Panel>

            <footer className={`flex flex-col gap-4 py-8 text-sm font-medium md:flex-row md:items-center md:justify-between ${styles.footer}`}>
              <p>(c) 2026 Classic Insight. All rights reserved.</p>
              <div className="flex flex-wrap gap-5">
                <a href="#" className="underline-offset-4 hover:text-[#C8A165] hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="underline-offset-4 hover:text-[#C8A165] hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="underline-offset-4 hover:text-[#C8A165] hover:underline">
                  Support
                </a>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
