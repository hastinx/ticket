const router = require('express').Router();
const { verifyToken } = require('../../middleware/varification.js')
const { c_mst_event } = require('../controllers')


router.get('/mst-event', verifyToken, c_mst_event.getAllEvent)
router.post('/mst-event', verifyToken, c_mst_event.addEvent)
router.get('/mst-event/attendance', verifyToken, c_mst_event.getAttendance)


module.exports = router