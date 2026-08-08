import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import {
  Smile,
  Search,
  Sparkles,
  BarChart3,
  TrendingUp,
  FileText,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Smile,
    title: "Sentiment Analysis",
    description:
      "Analyze guest reviews and instantly identify positive, neutral and negative sentiment using AI.",
  },
  {
    icon: Search,
    title: "Theme Detection",
    description:
      "Automatically discover common themes like cleanliness, staff behaviour, food and amenities.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    description:
      "Receive smart recommendations to improve guest experience and hotel performance.",
  },
  {
    icon: BarChart3,
    title: "Competitor Benchmarking",
    description:
      "Compare ratings and review performance against competing hotels in your region.",
  },
  {
    icon: TrendingUp,
    title: "Trend Prediction",
    description:
      "Identify emerging trends from historical review data and anticipate customer expectations.",
  },
  {
    icon: FileText,
    title: "Review Summarization",
    description:
      "Generate concise summaries from thousands of reviews using modern language models.",
  },
];

export default function Features() {
  return (
    <>
    <Navbar/>
      <div className="app-page min-h-screen transition-all duration-300">

        <section className="max-w-7xl mx-auto px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200"
                alt="hotel"
                className="rounded-2xl shadow-xl w-full h-[430px] object-cover"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200"
                alt="hotel"
                className="rounded-2xl shadow-xl w-full h-[430px] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-8 mt-28">
          <div className="text-center">
            <p className="uppercase tracking-[5px] text-[#C59B63] font-semibold">
              Features
            </p>
            <h2 className="text-5xl font-bold mt-3">
              Artificial Intelligence Features
            </h2>
            <p className="app-muted mt-6 max-w-2xl mx-auto leading-8">
              Everything your hotel needs to analyze guest feedback,
              improve service quality and stay ahead of competitors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
            
                <div key={index} className="app-card rounded-2xl border p-8 transition duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                  <div className="w-16 h-16 rounded-xl bg-[#C59B63]/10 flex items-center justify-center">
                    <Icon size={30} className="text-[#C59B63]" />
                  </div>

                  <h3 className="text-2xl font-bold mt-8">{item.title}</h3>
                  <p className="app-muted mt-5 leading-7">{item.description}</p>

                  <button className="flex items-center gap-2 mt-8 text-[#C59B63] font-semibold">
                    Learn More
                    <ArrowRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us section */}
        <section className="max-w-7xl mx-auto px-8 mt-32">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[5px] text-[#C59B63] font-semibold">Why Choose Us</p>

            <h2 className="text-5xl font-bold mt-3">Why Classic Insight?</h2>

            <p className="app-muted mt-6 max-w-2xl mx-auto leading-8">
              Transform guest feedback into meaningful business decisions with
              AI-powered analytics designed specifically for hotels. Our tools help you understand your guests, improve service quality, and stay ahead of competitors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="app-card rounded-2xl border p-10 text-center transition duration-300">
              <h1 className="text-6xl font-black text-[#C59B63]">95%</h1>
              <h3 className="mt-5 text-2xl font-semibold">Prediction Accuracy</h3>
              <p className="app-muted mt-4">Reliable AI models provide highly accurate sentiment analysis.</p>
            </div>

            <div className="app-card rounded-2xl border p-10 text-center transition duration-300">
              <h1 className="text-6xl font-black text-[#C59B63]">24/7</h1>
              <h3 className="mt-5 text-2xl font-semibold">Real-Time Analytics</h3>
              <p className="app-muted mt-4">Access insights instantly from anywhere at any time.</p>
            </div>

            <div className="app-card rounded-2xl border p-10 text-center transition duration-300">
              <h1 className="text-6xl font-black text-[#C59B63]">99%</h1>
              <h3 className="mt-5 text-2xl font-semibold">Uptime</h3>
              <p className="app-muted mt-4">Our platform is highly available so you can get insights when you need them.</p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-8 mt-32 mb-24">
          <div className="app-card rounded-3xl border p-16 text-center">
            <p className="uppercase tracking-[5px] text-[#C59B63] font-semibold">Ready to Start?</p>

            <h2 className="text-5xl font-bold mt-5">Unlock Powerful Hotel Insights</h2>

            <p className="app-muted mt-6 max-w-2xl mx-auto leading-8">
              Discover how Artificial Intelligence can help improve guest
              experience, monitor hotel performance and make smarter business
              decisions.
            </p>

            <button className="mt-10 bg-[#C59B63] hover:bg-[#b38750] text-white px-10 py-4 rounded-xl font-semibold transition">
              Explore Dashboard
            </button>
          </div>
        </section>
    
        <Footer />
    
      </div>
    </>
  );
}
