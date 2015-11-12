define ['aesManager'], (AesManager) ->
  class KeyManager
    #private
    _masterKey = undefined
    aesManager = undefined
    theBoss = 'theBoss'
    mdToast = undefined
    _key = 'keyObj'

    keyObj:  Object.create null

    constructor: ($mdToast) ->
      aesManager = new AesManager()
      mdToast = $mdToast

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

    toast: (msg) ->
      mdToast.showSimple msg
      return

    # plainKeyObj {title: 'fb', type: int, user: 'max', pass: '123'}
    encryptSave: (plainKeyObj) =>
      console.log 'hier'
      tmpObj = {}
      if plainKeyObj == null or plainKeyObj.title == undefined or  plainKeyObj.title.length == 0
        @toast 'no title'
      else
        unless(plainKeyObj.skip)
          if(@keyObj[plainKeyObj.title] != undefined)
            @toast 'key exists!'
            return
        tmpObj.type =  parseInt plainKeyObj.type
        if(tmpObj.type == 1)
          tmpObj.user = aesManager.encrypt _masterKey + plainKeyObj.title, plainKeyObj.user
          tmpObj.pass = aesManager.encrypt _masterKey + plainKeyObj.title, plainKeyObj.pass
        else
          tmpObj.text = aesManager.encrypt _masterKey + plainKeyObj.title, plainKeyObj.text
        @keyObj[plainKeyObj.title] = tmpObj
        console.log(@keyObj)
        iSaveKey()
      return

    deleteSave: (title) =>
      if(@keyObj.hasOwnProperty title)
        delete @keyObj[title]
        iSaveKey()
        @toast 'delete ' + title
      return

    decrypt: (title, decText) ->
      aesManager.decrypt _masterKey + title, decText

    #private functions
    iCheck = (masterKey) =>
      #TODO login logic & if is already set
      if masterKey and masterKey isnt '' and masterKey.length > 4
        loginPass = localStorage.getItem theBoss
        if loginPass is null
          #first loginPass
          console.log 'first login'
          localStorage.setItem theBoss, aesManager.encrypt masterKey, theBoss
          @::toast 'registered :)'
          true
        else
          #login
          console.log 'login process'
          if theBoss is aesManager.decrypt masterKey, loginPass
            #success
            @::toast 'hey!'
            true
          else
            #error
            @::toast 'jerk'
            false
      else false

    iSetMasterKey = (masterKey) ->
      _masterKey = masterKey
      return

    #iSaveKey({title: 'fb', type: int, user: 'sgfsfds', pass: 'sdfasfda'})
    iSaveKey = () =>
      #@::keySet.push keyObj
      localStorage.setItem _key, JSON.stringify @::keyObj
      return

    iLoadKeyFromLocalStorage = () =>
      tmpObj = JSON.parse localStorage.getItem _key
      if tmpObj is null
        console.log 'key war null'
      else
        console.log 'key wurde ausgelesen'
        @::keyObj = tmpObj
      return
