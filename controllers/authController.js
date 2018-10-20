const User = require('../models/userModel')
const { generateAuthToken } = require('../helpers/authHelper')

const logIn = (req, res, next) => {
    User.findByEmail(req.body.email)
        .then(user => {
            if (user.validPassword(req.body.password)) {
                if(user.isActive){
                    console.log('sampe gen')
                    generateAuthToken(user, req, res, next)
                }else{
                    return res.status(401).json({ 
                        message: "not an active user" 
                    })
                }
                
            } else {
                res.status(400).json({ 
                    message: `incorrect email/password` 
                })
            }
        })
        .catch((error) =>{
            //  next(error)
            console.log('erorrrrrr')
            console.error(error)
        })
}

module.exports = {logIn}