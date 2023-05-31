import openai from '../openai'

export default async function handler(req, res) {
  let completion; // declare completion variable here

  console.log('OpenAI instance:', openai);  // log the OpenAI instance

  try {
    completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "A list of popular houseplants featuring pink:",
      max_tokens: 100,
    });
    console.log(completion.data.choices[0].text);
  } catch (error) {
    if (error.response) {
      console.log('Error status:', error.response.status);  // log the error status
      console.log('Error data:', error.response.data);  // log the error data
    } else {
      console.log('Error message:', error.message);  // log the error message
    }
  }

  if (completion) {  // check if completion exists before using it
    const responseText = completion.data.choices[0].text;  // change .content to .text based on your log statement
    res.status(200).json({ responseText });
  } else {
    res.status(500).json({ message: 'OpenAI request failed.' });
  }
}
