define ['aesManager'], (AesManager) ->
  class KeyManager
    #private
    _masterKey = undefined
    aesManager = undefined
    theBoss = 'theBoss'
    toastManager = undefined
    _key = 'keyObj'

    keyObj:  Object.create null

    constructor: (_toastManager) ->
      aesManager = new AesManager()
      toastManager = _toastManager

    #public functions
    setMasterKey: (masterKey) =>
      if iCheck(masterKey)
        iSetMasterKey masterKey
        iLoadKeyFromLocalStorage()
      return

    isAuthenticated: () =>
      console.log 'isAuthenticated wird aufgerufen'
      tmp = typeof _masterKey isnt "undefined" && _masterKey isnt null
      tmp

    encryptKeyObj: () ->
      aesManager.encrypt _masterKey, JSON.stringify(@keyObj)

    # plainKeyObj {title: 'fb', type: int, user: 'max', pass: '123', created: long}
    encryptSave: (plainKeyObj) =>
      tmpObj = {}
      if plainKeyObj == null or plainKeyObj.title == undefined or  plainKeyObj.title.length == 0
        toastManager.toast 'no title'
      else
        unless(plainKeyObj.skip)
          if(@keyObj[plainKeyObj.title] != undefined)
            toastManager.toast 'title exists!'
            return
        if(plainKeyObj.oldTitle and plainKeyObj.title isnt plainKeyObj.oldTitle)
          iDelete plainKeyObj.oldTitle

        tmpObj.type =  parseInt plainKeyObj.type
        tmpObj.created = new Date().getTime()
        if(tmpObj.type == 1)
          tmpObj.user = aesManager.encrypt _masterKey + tmpObj.created, plainKeyObj.user
          tmpObj.pass = aesManager.encrypt _masterKey + tmpObj.created, plainKeyObj.pass
        else
          tmpObj.text = aesManager.encrypt _masterKey + tmpObj.created, plainKeyObj.text
        @keyObj[plainKeyObj.title] = tmpObj
        iSaveKey()
      return

    deleteSave: (title ) =>
      if(@keyObj.hasOwnProperty title)
        delete @keyObj[title]
        iSaveKey()
        toastManager.toast 'delete #{title}'
      return

    decrypt: (created, encText) ->
      aesManager.decrypt _masterKey + created, encText

    decryptKeyObj: (encText) ->
      aesManager.decrypt _masterKey, encText

    saveKey: () ->
      iSaveKey()

    #private functions
    iCheck = (masterKey) =>
      if masterKey and masterKey isnt '' and masterKey.length > 4
        loginPass = localStorage.getItem theBoss
        if loginPass is null
          console.log 'first login'
          localStorage.setItem theBoss, aesManager.encrypt masterKey, theBoss
          toastManager.toast 'Please notice your masterkey for relogin!'
          true
        else
          #login
          console.log 'login process'
          if theBoss is aesManager.decrypt masterKey, loginPass
            #success
            toastManager.toast 'hey!'
            true
          else
            #error
            toastManager.toastAction 'Come on dude! wanna reset ur account?', () -> localStorage.clear()
            false
      else false

    iSetMasterKey = (masterKey) ->
      _masterKey = masterKey
      return

    iSaveKey = () =>
      localStorage.setItem _key, JSON.stringify @::keyObj
      return

    iLoadKeyFromLocalStorage = () =>
      tmpObj = JSON.parse localStorage.getItem _key
      if tmpObj is null
        console.log 'key was null'
      else
        @::keyObj = tmpObj
      return

    iDelete = (title) =>
      if(@::keyObj.hasOwnProperty title)
        delete @::keyObj[title]
      return
