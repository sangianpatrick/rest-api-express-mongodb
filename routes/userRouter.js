const userRouter = require('express').Router()
const {
    addUser,
    getAllUser,
    getUser,
    updateUser,
    inactivateUser
} = require('../controllers/userController')

userRouter.post('/', addUser)
userRouter.get('/', getAllUser)
userRouter.get('/:id', getUser)
userRouter.patch('/:id', updateUser)
userRouter.delete('/:id', inactivateUser)

module.exports = userRouter