// resume-builder-backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Middleware to handle requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Your actual OpenAI API key
const openaiApiKey = "";

// Function to generate text using OpenAI API
async function generateText(prompt) {
  const openaiEndpoint =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";

  const response = await axios.post(
    openaiEndpoint,
    {
      prompt: `Generate a description based on: ${prompt}`,
      max_tokens: 150,
    },
    {
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].text.trim();
}

app.post("/generate_resume", async (req, res) => {
  const {
    personalInfo,
    projects,
    workExperience
  } = req.body;

  try {
    // Use OpenAI API for text generation
    const aboutMe = await generateText(personalInfo);
    const generatedProjects = await generateText(projects);
    const generatedWorkExperience = await generateText(workExperience);
    // const aboutMe = personalInfo;
    // const generatedProjects = projects;
    // const generatedWorkExperience = workExperience;
    const resume = {
      personalInfo: aboutMe,
      projects: generatedProjects,
      workExperience: generatedWorkExperience
    };
    res.json({ success: true, resume });
  } catch (error) {
    console.error("Error generating resume:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
