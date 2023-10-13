const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { login, signup, logout, getLoggedInUser } = require('./auth.controller')
const { check } = require('express-validator');

const router = express.Router()

router.post('/login', login)
router.post('/signup',
    [
        check('username')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail() // Test@test.com => test@test.com
            .isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    signup)
router.post('/logout', logout)
router.get('/user', getLoggedInUser)

module.exports = router