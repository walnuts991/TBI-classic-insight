import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Card from "../components/card";
import Footer from "../components/Footer";

function Home() {
  const reviews = [
    {
      name: "Aarav Sharma",
      review:
        "Excellent stay! The rooms were clean and the staff was extremely helpful.",
      source: "Google Reviews",
    },
    {
      name: "Emily Johnson",
      review:
        "The AI dashboard gave us valuable insights into customer satisfaction.",
      source: "TripAdvisor",
    },
    {
      name: "Rahul Mehta",
      review:
        "Great experience. Breakfast and service were outstanding.",
      source: "Booking.com",
    },
  ];

  return (
    <>
      <Navbar />

      <Hero />

      <section className="app-page py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-[var(--text)] mb-4">
            What Guests Say
          </h2>

          <p className="app-muted text-center mb-12">
            Real reviews collected from different hotel booking platforms.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card
                key={index}
                name={review.name}
                review={review.review}
                source={review.source}
              />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
