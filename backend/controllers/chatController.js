const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
You are Classic Insight AI.

You help hotel managers understand reviews and improve customer satisfaction.

Question:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      reply: response.text(),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI failed",
      error: error.message,
    });
  }
};

module.exports = { chatWithAI };