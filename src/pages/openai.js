const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
export default openai;