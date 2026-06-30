const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

let reviews = [
  {
    id: 1,
    hotel: "Classic Insight",
    rating: 4.8,
    sentiment: "Positive",
    review: "Amazing stay!"
  },
  {
    id: 2,
    hotel: "Ocean View",
    rating: 4.2,
    sentiment: "Neutral",
    review: "Nice rooms."
  }
];

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/api/reviews", (req, res) => {
  res.status(200).json(reviews);
});

app.get("/api/reviews/:id", (req, res) => {
  const review = reviews.find(r => r.id == req.params.id);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  res.json(review);
});

app.post("/api/reviews", (req, res) => {
  const review = {
    id: reviews.length + 1,
    ...req.body,
  };

  reviews.push(review);

  res.status(201).json(review);
});

app.put("/api/reviews/:id", (req, res) => {
  const index = reviews.findIndex(r => r.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Review not found" });
  }

  reviews[index] = {
    ...reviews[index],
    ...req.body,
  };

  res.json(reviews[index]);
});

app.delete("/api/reviews/:id", (req, res) => {
  reviews = reviews.filter(r => r.id != req.params.id);
  res.status(204).send();
});

app.get("/api/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";

  const result = reviews.filter(r =>
    r.hotel && r.hotel.toLowerCase().includes(q)
  );

  res.json(result);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});