const {generateRandomString, hashString} = require('./helpers/cryptoHelper')


const salt = generateRandomString(10)
const value = hashString('P@ssw0rd', salt)
console.log(value)