const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/todoController');

router.get('/', ctrl.getAll);
router.post('/', ctrl.create);
router.get('/search', ctrl.search);
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;