define () ->
  class aesManager
    constructor: () ->

    encrypt: (masterKey, plainText) ->
      encText = CryptoJS.AES.encrypt(plainText, masterKey).toString()
      encText

    decrypt: (masterKey, crypted) ->
      decText = CryptoJS.AES.decrypt(crypted, masterKey).toString(CryptoJS.enc.Utf8)
      decText
