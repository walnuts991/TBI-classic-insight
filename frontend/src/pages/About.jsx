import Navbar from "../components/navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <div
        style={{
          paddingTop: "120px",
          minHeight: "80vh",
          textAlign: "center",
          background: "#0f172a",
          color: "white",
        }}
      >
        <h1>About Page</h1>
        <p>Classic Insight helps hotels analyze guest reviews using AI.</p>
      </div>

      <Footer />
    </>
  );
}

export default About;