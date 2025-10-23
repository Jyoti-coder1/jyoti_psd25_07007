const axios = require('axios');

const OLLAMA_URL = (process.env.OLLAMA_URL || 'http://localhost:11434').replace(/\/$/, '');
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'tinyllama';

async function callOllama(prompt, options = {}) {
    const url = `${OLLAMA_URL}/api/generate`;
    const payload = {
        model: OLLAMA_MODEL,
        prompt,
        ...options
    };

    const resp = await axios.post(url, payload, { timeout: 120000 });
    return resp.data;
}

module.exports = { callOllama };