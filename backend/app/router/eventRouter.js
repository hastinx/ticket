const router = require('express').Router();
const { c_event } = require('../controllers')
const { verifyToken } = require('../../middleware/varification.js')

router.get('/event', verifyToken, c_event.getAllEvent)
router.post('/event/checkout', verifyToken, c_event.checkoutEvent)
router.get('/event/byuser/:id', verifyToken, c_event.getAllTransactionByUser)
router.get('/event/byuser/detail/:id', verifyToken, c_event.getDetailById)

module.exports = router