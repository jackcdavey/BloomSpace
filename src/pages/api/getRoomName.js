import openai from "../openai";

export default async function handler(req, res) {
    const { color } = req.body;
    const { plant } = req.body;
    const { userInput } = req.body;
    

    let completion;
    
      const prompt = `An exciting, creative name for a room containing ${plant} the color ${color} that matches ${userInput}:`;
  console.log("OpenAI Prompt for Room Name: ", prompt);

  try {
    completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 100,
    });
      console.log('Room Name response:', JSON.stringify(completion.data.choices[0].text));
      
  } catch (error) {
    if (error.response) {
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
    } else {
      console.log('Error message:', error.message);
    }
  }

    if (completion) {
      console.log('COMPLETED Room Name response:', JSON.stringify(completion.data.choices[0].text));
    const responseText = completion.data.choices[0].text;
    res.status(200).json({ responseText });
  } else {
    res.status(500).json({ message: 'OpenAI request failed.' });
  }
}
