export default class AesManager {
  cryptoJS
  constructor() {
    this.cryptoJS = CryptoJS;
  }

  /**
   * encrypt
   */
  public encrypt(masterKey, plainText) {
    let encText = this.cryptoJS.AES.encrypt(plainText, masterKey).toString()
    return encText
  }

  /**
   * decrypt
   */
  public decrypt(masterKey, crypted) {
    let decText = ''
    try { 
      decText = this.cryptoJS.AES.decrypt(crypted, masterKey).toString(this.cryptoJS.enc.Utf8)
    } catch (e) {
      decText = ''
    }
    return decText
  }

}