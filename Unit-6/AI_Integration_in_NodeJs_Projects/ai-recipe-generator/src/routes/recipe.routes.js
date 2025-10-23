const express = require('express');
const router = express.Router();
const { generateRecipe, compareModels, history } = require('../services/handler.service');

router.post('/generate-recipe', generateRecipe);

router.post('/compare-models', compareModels);

router.get('/history', history);

module.exports = router;