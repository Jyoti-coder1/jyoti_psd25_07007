const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const subCtrl = require('../controllers/subscription.controller');

router.post('/subscribe', auth, subCtrl.subscribe);
router.get('/subscription-status', auth, subCtrl.status);
router.patch('/renew', auth, subCtrl.renew);
router.post('/cancel-subscription', auth, subCtrl.cancel);

module.exports = router;