const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeReview(reviewText) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  console.info("[Gemini] Starting review analysis", { reviewLength: reviewText.length });
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: `You are a hotel review analysis AI. Analyze the following hotel review. Return ONLY valid JSON with this exact shape:\n{"sentiment":"Positive|Neutral|Negative","rating":0,"summary":"","topics":[]}\n\nReview:\n${reviewText}`,
  });

  // The SDK exposes generated text as a helper function. Supporting a string
  // response too makes this service easier to diagnose across SDK versions.
  let text = typeof response.text === "function" ? response.text() : response.text;
  if (typeof text !== "string" || !text.trim()) {
    throw new Error("Gemini returned an empty response");
  }

  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

  try {
    const result = JSON.parse(text);
    const validSentiments = ["Positive", "Neutral", "Negative"];
    if (!validSentiments.includes(result.sentiment) || !Array.isArray(result.topics)) {
      throw new Error("Gemini JSON has an invalid analysis shape");
    }
    console.info("[Gemini] Review analysis completed", { sentiment: result.sentiment, topicCount: result.topics.length });
    return result;
  } catch (error) {
    console.error("[Gemini] Could not parse analysis response", { message: error.message, responsePreview: text.slice(0, 300) });
    throw new Error(`Gemini analysis parsing failed: ${error.message}`);
  }
}

module.exports = { analyzeReview };
