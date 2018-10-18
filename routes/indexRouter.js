const indexRouter = require('express').Router()

// const authRouter = require('./authRouter')
const userRouter = require('./userRouter')

// const { authorize } = require('../middlewares/authMiddleware')


// index.get('/', (req, res, next) => {
//     res.status(200).json({ message: 'connected' })
// })

// index.use('/auth', authRouter)
// index.use('/user', authorize(), userRouter)

indexRouter.use('/user', userRouter)

module.exports = indexRouter
