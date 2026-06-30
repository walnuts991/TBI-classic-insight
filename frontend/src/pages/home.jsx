import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Footer from "../components/Footer";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="py-16"></div>
    
<div className="bg-slate-900 text-white text-center p-12 max-w-7xl mx-auto">

  <h2 className="text-5xl font-bold text-yellow-400 mb-8">
    AI Features
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    

  <Card
    title="Sentiment Analysis"
    text="Detect positive, negative and neutral guest opinions automatically."
  />

  <Card
    title="Theme Detection"
    text="Discover common complaints and recurring guest experiences."
  />

  <Card
    title="AI Recommendations"
    text="Get smart suggestions to improve ratings and guest satisfaction."
  />

  <Card
    title="Trend Analysis"
    text="Track rating changes and review patterns over time."
  />
</div>
      </div>

      <Footer />
    </>
  );
}

export default Home;