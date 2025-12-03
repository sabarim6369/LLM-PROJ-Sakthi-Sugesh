const express = require('express');
const axios = require('axios');
const router = express.Router();


router.post('/', async (req, res) => {
try {
const { text } = req.body;
if (!text) return res.status(400).json({ error: 'No text provided' });


// Groq's OpenAI-compatible chat completions endpoint
const url = `${process.env.GROQ_BASE_URL}/chat/completions`;


const systemPrompt = `You are a helpful assistant that strictly returns the grammatically corrected version of the user's input. Do not add explanations. Preserve meaning and tone.`;


const messages = [
{ role: 'system', content: systemPrompt },
{ role: 'user', content: `Correct the grammar of the following text precisely, keeping meaning and tone intact.\n\n${text}` }
];


const payload = {
  model: "llama-3.1-8b-instant",   // or any Groq-supported model
  messages,
  max_tokens: 500,                 // ✔ Groq supports this
  temperature: 0
};



const response = await axios.post(url, payload, {
headers: {
'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
'Content-Type': 'application/json'
}
});


// Groq response format is OpenAI-like; adapt if needed
const output = (response.data?.choices?.[0]?.message?.content) || response.data?.output_text || response.data;


res.json({ corrected: output });
} catch (err) {
console.error(err?.response?.data || err.message);
res.status(500).json({ error: 'Grammar correction failed', details: err?.response?.data || err.message });
}
});


module.exports = router;