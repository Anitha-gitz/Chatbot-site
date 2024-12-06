const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const PORT = process.env.PORT || 7000;

// Your Gemini API Key (Replace with your actual API key)
const geminiApiKey = "your_api_key"; // Replace with your actual API Key
console.log(geminiApiKey)
// Create an instance of the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.post("/api/chat", async (req, res) => {
  const { userMessage, chatHistory } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "User message is required." });
  }

  try {
    // Generate a response from Gemini
    const prompt = chatHistory.map((msg) => msg.text).join(" "); // Combine chat history for better context
    const result = await model.generateContent(prompt + " " + userMessage); // Pass the prompt and user message

    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Error from Gemini API:", error.message);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
