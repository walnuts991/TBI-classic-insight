require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const chatRoutes = require("./routes/chatRoutes");

const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const Review = require("./models/Review");
const { analyzeReview } = require("./services/geminiService");
const { protect } = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
connectDB();

// Home Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// GET All Reviews
app.get("/api/reviews", protect, async (req, res) => {
  try {
   const reviews = await Review.find({
  user: req.user._id,
});
    res.status(200).json(reviews);
} catch (error) {
  console.error("FULL ERROR:", error);

  if (error.response) {
    console.error(error.response);
  }

  res.status(500).json({
    message: error.message,
  });
}
});

// GET Single Review
 app.get("/api/reviews/:id", protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST Review
app.post("/api/reviews", protect, async (req, res) => {
  const requestId = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  console.info("[Reviews] Create request received", { requestId, userId: req.user?._id });
  try {
    const { hotel, review, rating } = req.body;

    if (typeof hotel !== "string" || !hotel.trim() || typeof review !== "string" || !review.trim() || !Number.isFinite(Number(rating))) {
      console.warn("[Reviews] Invalid create payload", { requestId, hasHotel: Boolean(hotel), hasReview: Boolean(review), rating });
      return res.status(400).json({ message: "hotel, review, and a numeric rating are required" });
    }

    // Persist the user's review before any external AI work. Gemini outages or
    // malformed model output must never discard submitted feedback.
    const savedReview = await Review.create({
      hotel: hotel.trim(),
      review: review.trim(),
      rating: Number(rating),
      sentiment: "Neutral",
      user: req.user._id,
      analysisStatus: "pending",
    });
    console.info("[Reviews] Review saved", { requestId, reviewId: savedReview._id });

    try {
      const aiResult = await analyzeReview(savedReview.review);
      savedReview.aiRating = Number.isFinite(Number(aiResult.rating)) ? Number(aiResult.rating) : undefined;
      savedReview.sentiment = aiResult.sentiment;
      savedReview.summary = typeof aiResult.summary === "string" ? aiResult.summary : "";
      savedReview.topics = aiResult.topics.filter((topic) => typeof topic === "string");
      savedReview.analysisStatus = "completed";
      savedReview.analysisError = undefined;
      await savedReview.save();
      console.info("[Reviews] Gemini analysis saved", { requestId, reviewId: savedReview._id });
    } catch (analysisError) {
      savedReview.analysisStatus = "failed";
      savedReview.analysisError = analysisError.message;
      await savedReview.save();
      console.error("[Reviews] Gemini analysis failed; review retained", { requestId, reviewId: savedReview._id, error: analysisError.message });
    }

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("[Reviews] Failed to save review", { requestId, error: error.message, stack: error.stack });

    res.status(500).json({
      message: "Failed to save review",
    });
  }
});

// UPDATE Review
app.put("/api/reviews/:id", protect, async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE Review
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// SEARCH Reviews
app.get("/api/search", async (req, res) => {
  try {
    const q = req.query.q || "";

    const reviews = await Review.find({
      hotel: {
        $regex: q,
        $options: "i",
      },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
