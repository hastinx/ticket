const { validationRegistrationList, validatorRegistration } = require('../../middleware/validationRegistration')
const { c_auth } = require('../controllers')

const router = require('express').Router()


router.post('/auth/register', validationRegistrationList, validatorRegistration, c_auth.register)
router.post('/auth/login', c_auth.login)

module.exports = router