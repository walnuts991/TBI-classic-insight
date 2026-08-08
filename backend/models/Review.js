const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    hotel: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },
    aiRating: {
  type: Number,
},

    sentiment: {
      type: String,
      enum: ["Positive", "Neutral", "Negative"],
      required: true,
      default: "Neutral",
    },

    review: {
      type: String,
      required: true,
    },

    // ⭐ AI-generated summary
    summary: {
      type: String,
    },

    // ⭐ AI-generated topics
    topics: [
      {
        type: String,
      },
    ],

    analysisStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    analysisError: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
