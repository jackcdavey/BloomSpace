import openai from "../openai";

export default async function handler(req, res) {
    const { color } = req.body;
    const { userInput } = req.body;
    

    let completion;
    
      const prompt = `A list of houseplants that prominently feature the color ${color} and match ${userInput}:`;
  console.log("OpenAI Prompt: ", prompt);

  try {
    completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 100,
    });
  } catch (error) {
    if (error.response) {
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
    } else {
      console.log('Error message:', error.message);
    }
  }

  if (completion) {
    const responseText = completion.data.choices[0].text;
    res.status(200).json({ responseText });
  } else {
    res.status(500).json({ message: 'OpenAI request failed.' });
  }
}
