const crypto = require('crypto')

const generateRandomString = (length) => {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
}

const hashString = function (value, salt) {
    return crypto
        .createHmac('md5', salt)
        .update(value)
        .digest('hex')
}

module.exports = { generateRandomString, hashString }