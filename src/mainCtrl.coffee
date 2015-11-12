define () ->
  class MainCtrl
    constructor: (app) ->
      console.log 'init MainCtrl'
      app.controller 'mainController', ['$scope', '$mdSidenav', 'keyManager', ($scope, $mdSidenav, keyManager) ->
        @toggleSidenav = (menuId) ->
          $mdSidenav(menuId).toggle()
          return

        #download
        @export = () ->

          keySet = keyManager.keySet


          return

        #uplaoud

        return
      ]

    genarateDateStr: () ->
      now = new Date()
      
