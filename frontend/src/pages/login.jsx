import Navbar from "../components/navbar";
import Footer from "../components/Footer";

function Login() {
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
        <h1>Login Page</h1>
        <p>User authentication page.</p>
      </div>

      <Footer />
    </>
  );
}

export default Login;