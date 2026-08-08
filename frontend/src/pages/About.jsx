import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}

      <section className="bg-[#FAF8F5] py-24">

        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <p className="uppercase tracking-[5px] text-[#C59B63] font-semibold">
              About Classic Insight
            </p>

            <h1 className="text-6xl font-bold text-black mt-6 leading-tight">
              Turning Hotel Reviews Into
              <span className="text-[#C59B63]"> Business Intelligence</span>
            </h1>

            <p className="text-black text-lg mt-8 leading-8">
              Classic Insight is an AI-powered hotel review analytics platform
              that helps hotels understand customer feedback, discover hidden
              trends, and improve guest satisfaction through intelligent
              sentiment analysis.
            </p>

            <Link
              to="/dashboard"
              className="inline-block mt-10 bg-[#C59B63] hover:bg-[#b4874f] text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              Explore Dashboard
            </Link>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Hotel"
              className="rounded-3xl shadow-2xl w-full h-[520px] object-cover"
            />

          </div>

        </div>

      </section>

      {/* Mission & Vision */}

      <section className="bg-white py-24">

        <div className="max-w-6xl mx-auto px-8">

          <h2 className="text-5xl font-bold text-center text-black">
            Our Mission
          </h2>

          <p className="text-center text-black mt-6 text-lg max-w-4xl mx-auto">
            We believe every hotel review contains valuable insights.
            Our mission is to transform thousands of guest reviews into
            actionable business decisions using Artificial Intelligence.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-20">

            <div className="bg-[#FAF8F5] rounded-3xl p-10 shadow">

              <h3 className="text-2xl font-bold text-[#C59B63]">
                AI Powered
              </h3>

              <p className="text-black mt-5">
                Advanced NLP models analyze guest sentiments and detect
                important themes automatically.
              </p>

            </div>

            <div className="bg-[#FAF8F5] rounded-3xl p-10 shadow">

              <h3 className="text-2xl font-bold text-[#C59B63]">
                Fast Analytics
              </h3>

              <p className="text-black mt-5">
                Generate summaries, trends and reports within seconds.
              </p>

            </div>

            <div className="bg-[#FAF8F5] rounded-3xl p-10 shadow">

              <h3 className="text-2xl font-bold text-[#C59B63]">
                Better Decisions
              </h3>

              <p className="text-black mt-5">
                Improve hotel services using data-driven insights instead
                of manual review reading.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Workflow */}

      <section className="bg-[#FAF8F5] py-24">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl font-bold text-center text-black">
            How Classic Insight Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-20">

            <div className="bg-white p-8 rounded-3xl shadow text-center">

              <div className="text-5xl font-bold text-[#C59B63]">
                1
              </div>

              <h3 className="text-2xl font-bold text-black mt-6">
                Collect
              </h3>

              <p className="text-black mt-4">
                Gather hotel reviews from multiple online platforms.
              </p>

            </div>

            <div className="bg-white p-8 rounded-3xl shadow text-center">

              <div className="text-5xl font-bold text-[#C59B63]">
                2
              </div>

              <h3 className="text-2xl font-bold text-black mt-6">
                Analyze
              </h3>

              <p className="text-black mt-4">
                AI detects sentiment, keywords and guest emotions.
              </p>

            </div>

            <div className="bg-white p-8 rounded-3xl shadow text-center">

              <div className="text-5xl font-bold text-[#C59B63]">
                3
              </div>

              <h3 className="text-2xl font-bold text-black mt-6">
                Visualize
              </h3>

              <p className="text-black mt-4">
                Interactive dashboards reveal hidden patterns instantly.
              </p>

            </div>

            <div className="bg-white p-8 rounded-3xl shadow text-center">

              <div className="text-5xl font-bold text-[#C59B63]">
                4
              </div>

              <h3 className="text-2xl font-bold text-black mt-6">
                Improve
              </h3>

              <p className="text-black mt-4">
                Take smarter business decisions to enhance guest experience.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Tech Stack */}

      <section className="bg-white py-24">

        <div className="max-w-6xl mx-auto px-8 text-center">

          <h2 className="text-5xl font-bold text-black">
            Technology Stack
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mt-16">

            {[
              "React",
              "Node.js",
              "Express",
              "MongoDB",
              "Gemini API",
              "Tailwind CSS",
              "Natural Language Processing",
            ].map((tech) => (
              <div
                key={tech}
                className="bg-[#FAF8F5] px-8 py-4 rounded-full shadow font-semibold text-black"
              >
                {tech}
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-[#111111] py-24">

        <div className="max-w-5xl mx-auto text-center px-8">

          <h2 className="text-5xl font-bold text-white">
            Ready to Transform Hotel Reviews?
          </h2>

          <p className="text-white mt-8 text-lg">
            Discover how AI-powered analytics can improve customer
            satisfaction and business performance.
          </p>

          <Link
            to="/login"
            className="inline-block mt-10 bg-[#C59B63] hover:bg-[#b4874f] text-white px-10 py-4 rounded-xl font-semibold transition"
          >
            Get Started
          </Link>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default About;
