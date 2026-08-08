import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("JARVIS brain is online 🤖");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "No message received"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      instructions:
        "You are JARVIS, a friendly personal AI assistant. Answer clearly and naturally. Keep answers reasonably concise.",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "JARVIS brain error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`JARVIS running on port ${PORT}`);
});
