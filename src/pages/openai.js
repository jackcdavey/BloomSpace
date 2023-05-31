const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
export default openai;