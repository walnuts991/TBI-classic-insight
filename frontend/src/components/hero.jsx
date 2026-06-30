 function Hero() {
  return (
    <section
      style={{
        height: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      ></div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            marginBottom: "15px",
            color: "white",
          }}
        >
          Classic Insight
        </h1>

        <p
          style={{
            fontSize: "24px",
            marginBottom: "25px",
            color: "white",
          }}
        >
          AI Powered Hotel Review Analytics
        </p>

        <button
          style={{
            background: "#fbbf24",
            color: "black",
            padding: "14px 30px",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Explore Dashboard
        </button>
      </div>
    </section>
  );
}

export default Hero;