const { callOllama } = require('./ollama.service');
const { callGemini } = require('./gemini.service');
const { makeHtml } = require('../utils/htmlTemplate');
const { htmlToPdf } = require('../utils/pdf');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const OUTPUT_DIR = process.env.OUTPUT_DIR || './output';
fs.ensureDirSync(OUTPUT_DIR);
let HISTORY = [];

function buildOllamaPrompt(ingredients) {
    const ingList = ingredients.map(i => `- ${i}`).join('\n');
    return `
You are a creative chef assistant.
Given these ingredients:
${ingList}
1) Propose a creative recipe title (one short line).
2) For each ingredient suggest realistic quantity measurements (e.g., 'Chicken - 250g').
3) Provide at least 5 numbered step-by-step preparation instructions (concise).
Format the output clearly with sections: TITLE, INGREDIENTS, STEPS.
`;
}

function buildGeminiPrompt(title, ingredientsWithQty, stepsText) {
    return `
You are a helpful assistant that rewrites recipe steps to be user-friendly and formatted clearly.
Recipe Title: ${title}

Ingredients:
${ingredientsWithQty}

Original Steps:
${stepsText}

Tasks:
1) Rewrite the preparation steps to be concise, user-friendly, well-formatted (numbered).
2) Provide an estimated nutrition summary (approx calories, protein, fat, carbs) for the whole recipe.
Return JSON containing keys: "steps" (array of strings) and "nutrition" (calories, protein_g, fat_g, carbs_g).
`;
}

async function generateRecipe(req, res) {
    try {
        const { ingredients } = req.body;
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ success: false, message: 'ingredients must be a non-empty array' });
        }

        const ollamaPrompt = buildOllamaPrompt(ingredients);
        const ollamaRaw = await callOllama(ollamaPrompt, { temperature: 0.6, max_tokens: 600 });

        const rawText = (typeof ollamaRaw === 'string') ? ollamaRaw : JSON.stringify(ollamaRaw);

        const titleMatch = rawText.match(/TITLE[:\-]\s*(.+)/i) || rawText.match(/^(.+)\n/);
        const title = titleMatch ? titleMatch[1].trim() : `Creative Dish ${Date.now()}`;

        const ingredientsBlockMatch = rawText.match(/INGREDIENTS[:\-]\s*([\s\S]*?)STEPS[:\-]/i);
        const stepsBlockMatch = rawText.match(/STEPS[:\-]\s*([\s\S]+)/i);

        const ingredientsBlock = ingredientsBlockMatch ? ingredientsBlockMatch[1].trim() : ingredients.map(i => `${i} - as desired`).join('\n');
        const stepsBlock = stepsBlockMatch ? stepsBlockMatch[1].trim() : '1. Prepare ingredients.\n2. Cook.\n3. Serve.';

        const geminiPrompt = buildGeminiPrompt(title, ingredientsBlock, stepsBlock);
        const geminiResp = await callGemini(geminiPrompt, { temperature: 0.2, maxOutputTokens: 400 });
        let stepsArray = [];
        let nutrition = null;
        try {
            const text = geminiResp?.candidates?.[0]?.output ?? geminiResp?.output ?? JSON.stringify(geminiResp);
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                stepsArray = parsed.steps || [];
                nutrition = parsed.nutrition || null;
            }
            else {
                const lines = ('' + text).split(/\n/).map(l => l.trim()).filter(Boolean);
                stepsArray = lines;
            }
        } catch (err) {
            const fallbackText = (typeof geminiResp === 'string') ? geminiResp : JSON.stringify(geminiResp);
            stepsArray = fallbackText.split('\n').slice(0, 10);
        }

        const recipe = {
            id: uuidv4(),
            title,
            ingredients: ingredientsBlock.split('\n').map(s => s.trim()).filter(Boolean),
            steps: stepsArray,
            nutrition: nutrition || { calories: 'estimate unavailable', protein_g: '-', fat_g: '-', carbs_g: '-' },
            createdAt: new Date().toISOString()
        };
        const html = makeHtml(recipe);
        const filenameBase = `${recipe.id}`;
        const htmlPath = path.join(OUTPUT_DIR, `${filenameBase}.html`);
        const pdfPath = path.join(OUTPUT_DIR, `${filenameBase}.pdf`);
        await fs.writeFile(htmlPath, html, 'utf8');

        await htmlToPdf(htmlPath, pdfPath);

        HISTORY.unshift({
            id: recipe.id,
            title: recipe.title,
            htmlPath,
            pdfPath,
            createdAt: recipe.createdAt
        });

        res.json({
            success: true,
            recipe,
            files: {
                html: `/download/html/${path.basename(htmlPath)}`,
                pdf: `/download/pdf/${path.basename(pdfPath)}`
            }
        });
    } catch (err) {
        console.error('generateRecipe err', err?.response?.data || err);
        res.status(500).json({ success: false, message: 'Internal server error', error: String(err?.message || err) });
    }
}

async function compareModels(req, res) {
    try {
        const { ingredients } = req.body;
        if (!Array.isArray(ingredients)) return res.status(400).json({ success: false, message: 'ingredients required' });

        const prompt = buildOllamaPrompt(ingredients);
        const ollamaOut = await callOllama(prompt, { temperature: 0.7 });
        const geminiOut = await callGemini(prompt, { temperature: 0.3 });

        res.json({ success: true, ollama: ollamaOut, gemini: geminiOut });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Compare failed', error: String(err) });
    }
}

async function history(req, res) {
    res.json({ success: true, history: HISTORY });
}

module.exports = { generateRecipe, compareModels, history };