const userRouter = require('express').Router()
const {
    addUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')

userRouter.post('/', addUser)
userRouter.get('/', getAllUser)
userRouter.get('/:id', getUser)
userRouter.patch('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

module.exports = userRouter