const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//cors handler
app.use((req, res, next) => {
    res.header("Access-Controll-Allow-Origin", "*")
    res.header("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if (req.method === 'OPTIONS') {
        res.header("Access-Controll-Allow-Methods", "PUT, POST, PATCH, DELETE, GET, PUT")
        return res.status(200).json({})
    }
    next()
})

//routes which handle requests
app.use('/products', productRoutes)
app.use('/orders', ordersRoutes)

//error handler
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

//send error type and message
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app