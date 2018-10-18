const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const routers = require('./routes/indexRouter')

const db_uri = (process.env.APP_ENV == 'development'? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRODUCTION)
mongoose.connect(db_uri, {
    useCreateIndex: true,
    useNewUrlParser: true
})

// mongoose.connect('mongodb://rest-api-express-mongodb:nivilia290312@rest-api-express-mongodb-shard-00-00-npezu.mongodb.net:27017,rest-api-express-mongodb-shard-00-01-npezu.mongodb.net:27017,rest-api-express-mongodb-shard-00-02-npezu.mongodb.net:27017/test?ssl=true&replicaSet=rest-api-express-mongodb-shard-0&authSource=admin&retryWrites=true', {
//     useNewUrlParser: true
// })

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
    console.log('connected to db!')
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//header handler
app.use((req, res, next) => {
    if (req.headers.accept !== 'application/json') {
        return res.status(406).json({
            error: true,
            message: "Request is not acceptable."
        })
    }

    next()
})

//cors handler
app.use((req, res, next) => {
    res.header("Access-Controll-Allow-Origin", "*")
    res.header("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Controll-Allow-Methods", "POST, PATCH, DELETE, GET, PUT")
    if (req.method === 'OPTIONS') {
        res.header("Access-Controll-Allow-Methods", "POST, PATCH, DELETE, GET, PUT")
        return res.status(405).json({
            error: true,
            message: "Method Not Allowed"
        })
    }
    next()
})

//routes which handle requests
app.use('/', routers)

app.use('*', function (req, res) {
    res.status(404).json({ error: true, message: 'Not Found' });
});

//send error type and message
app.use((error, req, res, next) => {
    var message = ''
    res.status(error.status || 500)
    if (res.statusCode == 500) {
        message = 'Something went wrong.'
    }else{
        message = Object.values(error.errors).map(e => e.message) 
    }
    res.json({
        error: {
            message: error
        }
    })
    // console.log(error)
})

module.exports = app