define [], () ->
  class LoginCtrl
    constructor: (app) ->
      app.controller 'loginCtrl', ['$scope', '$location', '$rootScope', 'keyManager', ($scope, $location, $rootScope, keyManager) ->
        #Navigation stop
        $rootScope.preventNavigation = false
        $rootScope.$on '$locationChangeStart', (event, newUrl, oldUrl) ->
          if $rootScope.preventNavigation
            event.preventDefault()
          return

        $scope.masterkey = ''
        $rootScope.logged = false

        $scope.enter = () ->
          keyManager.setMasterKey $scope.masterkey
          if document.activeElement
            document.activeElement.blur()

          if keyManager.isAuthenticated()
            #login was successful
            $rootScope.logged = true
            $location.path '/list'
          return

        return
      ]
