const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const permit = require('../middleware/rbac.middleware');
const contentCtrl = require('../controllers/content.controller');

router.get('/free', auth, contentCtrl.getFree);

router.get('/premium', auth, contentCtrl.getPremium);

router.post('/', auth, permit('admin'), contentCtrl.createContent);
router.delete('/:id', auth, permit('admin'), contentCtrl.deleteContent);

module.exports = router;