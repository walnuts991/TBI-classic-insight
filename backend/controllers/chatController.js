const { GoogleGenAI } = require("@google/genai");
const Review = require("../models/Review");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function formatReviewContext(reviews) {
  return reviews.map((review) => ({
    hotelName: review.hotel,
    reviewText: review.review,
    manualRating: review.rating,
    aiRating: review.aiRating ?? null,
    sentiment: review.sentiment,
    summary: review.summary || null,
    topics: review.topics || [],
    reviewDate: review.createdAt || null,
  }));
}

const chatWithAI = async (req, res) => {
  const requestId = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  try {
    const { message, consent } = req.body;
    if (consent !== true) {
      return res.status(403).json({ message: "Permission is required before review analysis can begin." });
    }
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "A chat message is required." });
    }
    if (!process.env.GEMINI_API_KEY) {
      console.error("[Chat] Gemini API key is not configured", { requestId });
      return res.status(503).json({ message: "Classic Insight AI is not configured." });
    }

    // This query is intentionally scoped to the authenticated user. No other
    // user's reviews are loaded or included in the Gemini prompt.
    const reviews = await Review.find({ user: req.user._id })
      .select("hotel review rating aiRating sentiment summary topics createdAt")
      .sort({ createdAt: -1 })
      .lean();
    console.info("[Chat] Review context loaded", { requestId, userId: req.user._id, reviewCount: reviews.length });

    const prompt = `You are Classic Insight AI.

Your purpose is to analyze hotel review data belonging to the authenticated user.
Always use the supplied review database as your primary context before answering.
Base answers on the user's uploaded reviews whenever possible. If the available review data is insufficient, clearly state that instead of making up information.
Do not invent reviews, ratings, summaries, topics, dates, or statistics.
Only answer questions related to hotel reviews, guest feedback, ratings, sentiment analysis, AI summaries, topics, hotel analytics, customer satisfaction, and hotel improvement recommendations.
If the user asks an unrelated question (sports, politics, coding, history, general knowledge, etc.), reply exactly: "I'm Classic Insight AI. I can only help analyze your hotel reviews and hotel analytics."

Authenticated user's review database (JSON):
${JSON.stringify(formatReviewContext(reviews))}

User question:
${message.trim()}`;

    const response = await ai.models.generateContent({ model: "gemini-3.5-flash-lite", contents: prompt });
    const reply = typeof response.text === "function" ? response.text() : response.text;
    if (typeof reply !== "string" || !reply.trim()) throw new Error("Gemini returned an empty chat response");

    console.info("[Chat] Response generated", { requestId, userId: req.user._id, reviewCount: reviews.length });
    res.json({ reply: reply.trim() });
  } catch (error) {
    console.error("[Chat] Request failed", { requestId, userId: req.user?._id, error: error.message });
    res.status(500).json({ message: "Classic Insight AI could not answer right now. Please try again." });
  }
};

module.exports = { chatWithAI };
