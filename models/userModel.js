const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const {generateRandomString, hashString} = require('../helpers/cryptoHelper')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        validate: {
            validator: value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
            message: 'not a valid email'
        }
    },
    password: {
        type: String,
        validate: {
            validator: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value),
            message: 'password should be at least 8 characters and contains 1 uppercase and 1 number',
        }
    },
    password_salt: {
        type: String
    }
})

userSchema.plugin(mongooseUniqueValidator, {
    message: 'have been registered'
})

userSchema.statics.findByEmail = (email) => {
    return this.findOne({
        'email': email
    })
}

userSchema.methods.validPassword = (password) => {
    return this.password === hashString(password, this.password_salt)
}

userSchema.pre('save', function(next){
    console.log('Creating a new user...')
    console.log(typeof(this.firstName))
    // console.log(typeof(this.pass))
    if(this.password){
        this.password_salt = generateRandomString(10)
        this.password = hashString(this.password, this.password_salt)
    }
    next()
})

module.exports = mongoose.model('User', userSchema)