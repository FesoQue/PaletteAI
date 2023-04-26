import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (!configuration.apiKey) {
    NextResponse.json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }
  const { color } = await req.json();
  if (color.trim().length === 0) {
    return NextResponse.json({
      message: "Enter a valid color",
    });
  }

  try {
    const payload = {
      model: "text-davinci-003",
      prompt: await generatePrompt(color),
      temperature: 0.3,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    };
    return fetch("https://api.openai.com/v1/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => NextResponse.json({ result: data?.choices[0].text }));
  } catch (error) {
    if (error.response) {
      return NextResponse.status(error.response.status).json(
        error.response.data
      );
    } else {
      return NextResponse.json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

async function generatePrompt(color) {
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
