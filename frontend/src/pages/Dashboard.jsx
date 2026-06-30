import Navbar from "../components/navbar";
import Footer from "../components/Footer";

function Dashboard() {
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
        <h1>Dashboard Page</h1>
        <p>Analytics dashboard for hotel review insights.</p>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;