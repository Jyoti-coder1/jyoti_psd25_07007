const axios = require('axios');

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-pro';

if (!GEMINI_KEY) {
  console.warn('No GEMINI_API_KEY set. Gemini calls will fail until you add the key.');
}

async function callGemini(prompt, options = {}) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta2/models/${GEMINI_MODEL}:generate`;
  const headers = {
    'Authorization': `Bearer ${GEMINI_KEY}`,
    'Content-Type': 'application/json'
  };

  const body = {
    prompt: {
      text: prompt
    },
    temperature: options.temperature ?? 0.3,
    maxOutputTokens: options.maxOutputTokens ?? 800
  };

  const res = await axios.post(endpoint, body, { headers });
  return res.data;
}

module.exports = { callGemini };