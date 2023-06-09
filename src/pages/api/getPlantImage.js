// pages/api/getPlantImage.js

import openai from "../openai";
export default async function handler(req, res){

    const {plant} = req.body;
    const {color} = req.body;

    let imageResponse;

    const prompt = `A realistic ${color} illustration of a ${color} ${plant} prominently featuring the color ${color}:`;
    console.log("OpenAI Prompt: ", prompt);

    try {
        imageResponse = await openai.createImage({
            prompt: `A realistic illustration of a ${plant}`,
            n: 1,
            size: "512x512",
        });

        // Assuming that the image API returns an array of images,
        // send back the first image URL.
        // console.log('Image URL:', imageResponse.data[0].url);
        console.log('Image response:', JSON.stringify(imageResponse.data.data[0].url));
        res.json({ imageUrl: JSON.stringify(imageResponse.data.data[0].url)});
    } catch (error) {
        console.log('Error message:', error.message);
        // console.log('Image URL:', imageResponse.data[0].url);
        console.log('Image response err:', imageResponse.data);
        if (error.response) {
            console.log('Error status:', error.response.status);
            console.log('Error data:', error.response.data);
        }

        res.status(500).json({ message: 'Image generation failed.' });
    }
};
