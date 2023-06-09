import openai from "../openai";

export default async function handler(req, res) {
    const { plants } = req.body;
    const { userInput } = req.body;
    let responses = [];

    for (let plant of plants) {
        let completion;

        const prompt = `A brief description for buyers of: ${plant}, and how it adheres to ${userInput}`;
        console.log("OpenAI Prompt: ", prompt);

        try {
            completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt,
                max_tokens: 100,
            });
            responses.push({
                plant: plant,
                description: completion.data.choices[0].text.trim(),
            });
        } catch (error) {
            if (error.response) {
                console.log('Error status:', error.response.status);
                console.log('Error data:', error.response.data);
                responses.push({
                    plant: plant,
                    description: 'Error retrieving description.'
                });
            } else {
                console.log('Error message:', error.message);
            }
        }
    }

    if (responses.length > 0) {
        res.status(200).json({ descriptions: responses });
    } else {
        res.status(500).json({ message: 'OpenAI request failed.' });
    }
}
