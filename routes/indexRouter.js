const indexRouter = require('express').Router()

const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter')

const { authorize } = require('../middlewares/authMiddleware')

indexRouter.get('/', (req, res, next) => {
    res.status(200).json({ message: 'connected'})
})
indexRouter.use('/auth', authRouter)
indexRouter.use('/user', authorize(), userRouter)
indexRouter.use('/product', authorize(), productRouter)
indexRouter.use('/order', authorize(), orderRouter)

module.exports = indexRouter
