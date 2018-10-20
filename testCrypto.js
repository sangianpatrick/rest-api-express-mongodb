const {generateRandomString, hashString} = require('./helpers/cryptoHelper')

const newSalt = '8e2ed6cac9'
const salt = generateRandomString(10)
const value = hashString('Passw0rd', newSalt)
console.log(value)