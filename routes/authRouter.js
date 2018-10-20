const authRouter = require('express').Router()

const {
    logIn
} = require('../controllers/authController')

authRouter.post('/', logIn)

module.exports = authRouter