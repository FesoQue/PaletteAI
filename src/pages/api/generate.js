import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }
  const color = req.body.color || "";
  if (color.trim().length === 0) {
    return res.status(400).json({
      message: "Enter a valid color",
    });
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(color),
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });
    return res.status(200).json({ result: response.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(color) {
  return `suggest a color system based on any color below with name and hex code. it must include primary color, primary variant, secondary color , secondary variant, Neutral,  background , tint color, shade color, success color, warning color and an error color.

Color: green
Guide:Primary Color: #009933 (Green),
Primary Variant: #00CC66 (Light Green),
Secondary Color: #006600 (Dark Green),
Secondary Variant: #00FF99 (Mint Green),
Supporting Color: #2E8B57 (Sea Green),
Neutral: #999999 (Gray),
Background: #F2F2F2 (Light Gray),
Tint Color: #00FFCC (Turquoise),
Shade Color: #003300 (Very Dark Green),
Success Color: #00CC00 (Bright Green),
Warning Color: #FFFF00 (Yellow),
Error Color: #FF0000 (Red)
Color: ${color}
Guide:`;
}

// suggest a color system based on any color below with name and hex code. it must include primary color, primary variant, secondary color , secondary variant, Neutral,  background , tint color, shade color, success color, warning color and a error color and a matching gradient color\n
// Matching Gradient Color: linear-gradient(to right, #009933, #00CC00),
