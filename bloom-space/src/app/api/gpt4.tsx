const openai = require("openai");

openai.apiKey = process.env.OPENAI_API_KEY;

export default async function handler(req: any, res: any) {
  console.log("Starting API handler...");

  try {
    console.log("Making API request...");
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Who won the world series in 2020?" },
        { role: "assistant", content: "The Los Angeles Dodgers." },
        { role: "user", content: "Where was it played?" },
      ],
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 1,
    });

    console.log("API request successful.");
    res.status(200).json({ answer: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error during API request:", error);
    res.status(500).json({ error: "Error during API request." });
  }
}
