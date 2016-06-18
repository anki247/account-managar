define ['aesManager'], (AesManager) ->
  class MainCtrl
    constructor: (app) ->
      console.log 'init MainCtrl'
      app.controller 'mainController', ['$scope', '$mdSidenav', 'keyManager', ($scope, $mdSidenav, keyManager) ->
        @toggleSidenav = (menuId) ->
          $mdSidenav(menuId).toggle()
          return

        #download
        @export = () ->
          console.log '--> Export'
          keyObj = keyManager.keyObj
          a = document.createElement('a');
          a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(keyManager.encryptKeyObj()))
          a.setAttribute 'download', 'AM-' + genarateDateStr() + '.am'
          document.body.appendChild a
          a.click()
          document.body.removeChild a
          return

        @import = () ->
          document.getElementById('upload-btn').click()

        #uplaoud
        @upload = (event) ->
          console.log '--> Import'
          input = event.target
          reader = new FileReader()
          reader.onload = () ->
              importedKeyObj = JSON.parse keyManager.decryptKeyObj reader.result

              console.log importedKeyObj
              #TODO merge keyObj
              mergeKeyObj keyManager.keyObj, importedKeyObj




          reader.readAsText input.files[0]
          return

        genarateDateStr = () ->
          now = new Date()
          now.getFullYear() + format(now.getMonth() + 1) + format(now.getDate()) + format(now.getHours()) + format(now.getMinutes()) + format(now.getSeconds())

        format = (c) ->
          if(c < 10)
            '0#{c}'
          else
            '#{c}'

        mergeKeyObj = (origKeyObj, importedKeyObj) ->
          console.log 'mergeKeyObj'
          for title, body of importedKeyObj
            if origKeyObj[title] is undefined
              #new Key
              origKeyObj[title] = body
            else
              #key exists
              if origKeyObj[title].type is body.type
                #same type
                if origKeyObj[title].created is body.created
                  continue

              #new key with same title
              origKeyObj[getNextAvailableTile(origKeyObj, title)] = body
          return

        getNextAvailableTile = (origKeyObj, title) ->
          i = 1
          exten = '('+i+')'
          while(origKeyObj[title + exten] isnt undefined)
            i++
            exten += '('+i+')'

          title+exten

        return
      ]
