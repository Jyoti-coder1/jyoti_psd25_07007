# AI-Powered Recipe Generator with PDF Export

## Run locally

1. Install dependencies: npm install
2. Start Ollama and load a local model (e.g., tinyllama)
3. Create .env based on .env.example and set keys
4. Start server: npm run dev
5. POST to POST /api/generate-recipe with JSON body:
   { "ingredients": ["chicken","garlic","spinach","cheese"] }

Outputs: HTML and PDF in the output/ folder.