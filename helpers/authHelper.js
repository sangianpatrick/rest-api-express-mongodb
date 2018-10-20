const jwt = require('jsonwebtoken')
require('dotenv').config()


const bearerAuth = (req, cb) =>{
    const auth_header = req.headers.authorization || ' '
    const token = auth_header.split(' ')
    if(token[0] != 'Bearer'){
        cb({
            name: 'NotABearerFormat',
            message: 'invalid token'
        })
    }else{
        jwt.verify(token[1], process.env.SECRET_KEY, (error, decoded) => {
            cb(error, decoded)
        })
    }
}

const generateAuthToken = (user, req, res, next) => {
    jwt.sign({id: user._id}, process.env.SECRET_KEY,{ expiresIn: 2 * 60 }, (error, token) => {
        if(error){
            console.log('jwt error')
            next()
        }else{
            return res.status(200).json({
                message: 'authorized',
                token: token
            })
        }
    })
}

module.exports = {bearerAuth, generateAuthToken}