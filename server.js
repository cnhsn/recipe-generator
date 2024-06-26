const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/generate-recipe', async (req, res) => {
  const { ingredients, difficulty } = req.body;

  try {
    const prompt = `Create a ${difficulty} recipe using the following ingredients: ${ingredients}. Include preparation time, cooking time, and cooking methods.`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 200,
    });

    res.json({ recipe: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).send('Error generating recipe');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});