import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="app-surface py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-block bg-yellow-100 text-[#C59B63] font-semibold px-4 py-2 rounded-full text-sm mb-6">
              AI POWERED HOTEL ANALYTICS
            </span>

            <h3 className="uppercase tracking-[5px] text-[#C59B63] font-semibold mb-4">
              Welcome To
            </h3>

            <h1 className="text-6xl font-extrabold leading-tight text-[var(--text)]">
              Classic Insight
            </h1>

            <h2 className="text-5xl font-bold text-[#C59B63] mt-2">
              Elevate Every Stay.
            </h2>

            <p className="app-muted text-xl mt-8 leading-9">
              Transform thousands of hotel reviews into meaningful insights
              using Artificial Intelligence. Monitor guest satisfaction,
              identify trends, predict customer behaviour and make smarter
              business decisions.
            </p>

            <div className="flex gap-5 mt-10">

              <Link
                to="/dashboard"
                className="bg-[#C59B63] hover:bg-[#ad8148] text-white px-8 py-4 rounded-lg font-semibold transition"
              >
                Explore Dashboard
              </Link>

              <Link
                to="/features"
                className="border-2 border-[#C59B63] text-[#C59B63] hover:bg-[#C59B63] hover:text-white px-8 py-4 rounded-lg font-semibold transition"
              >
                Learn More
              </Link>

            </div>

          </div>

          {/* Right Side */}

          <div>

            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
              alt="Hotel"
              className="rounded-3xl shadow-2xl w-full h-[550px] object-cover"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
