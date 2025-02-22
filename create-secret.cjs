const crypto = require('crypto')
const random = crypto.randomBytes(64)
const secret = random.toString('base64')

console.log(secret)