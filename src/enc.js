const crypto = require('crypto')

function decrypt (text, key) {
  try {
    let decipher = crypto.createDecipher('aes-256-cbc', key)
    let decryptedWallet = decipher.update(text, 'base64', 'utf8')
    decryptedWallet = decryptedWallet + decipher.final('utf8')
    return decryptedWallet
  } catch (e) {
    console.log(e)
  }
}

function encrypt (text, key) {
  try {
    let cipher = crypto.createCipher('aes-256-cbc', key)
    let encryptedWallet = cipher.update(JSON.stringify(text), 'utf8', 'base64')
    encryptedWallet = encryptedWallet + cipher.final('base64')
    return encryptedWallet
  } catch (e) {
    console.log(e)
  }
}

function makeKey (bytes) {
  // 16
  let k = new Buffer(crypto.randomBytes(bytes))
  let s = k.toString('hex')
  console.log('here is a new key:', s)

  return s
}

module.exports = { encrypt, decrypt, makeKey }
