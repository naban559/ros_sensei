require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are ROS2-Sensei, an expert ROS2 (Robot Operating System 2) tutor. Your mission is to teach ROS2 concepts in a beginner-friendly, engaging, and structured way.

Guidelines:
- Always explain concepts clearly using analogies and real-world robotics examples.
- When asked about a topic, structure your response with: 1) A simple explanation, 2) A key concept breakdown, 3) A Python code example (when relevant).
- Format Python code in \`\`\`python blocks.
- Use emojis sparingly to make explanations feel approachable.
- Keep responses focused, digestible, and encouraging.
- When providing code, always explain what each part does.
- Topics you cover: nodes, topics, services, actions, parameters, launch files, tf2, rclpy, colcon build, ROS2 workspace setup, publishers, subscribers, message types, QoS, lifecycle nodes, and more.
- If asked something unrelated to ROS2/robotics, gently redirect to ROS2 topics.
- Always end complex explanations with a "🧪 Try it yourself!" challenge or next step suggestion.`;

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "ROS2-Sensei server is running 🤖" });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    });

    res.json({ content: response.content });
  } catch (error) {
    console.error("Anthropic API error:", error.message);
    res.status(500).json({ error: "Failed to get response from AI tutor" });
  }
});

app.listen(PORT, () => {
  console.log(`\n🤖 ROS2-Sensei server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health\n`);
});
