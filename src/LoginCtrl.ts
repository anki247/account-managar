export default class LoginCtrl {
  constructor(app) {
    this.start(app)
  }

  private start(app) {
    app.controller('loginCtrl', ['$scope', '$location', '$rootScope', 'keyManager', ($scope, $location, $rootScope, keyManager) => {
      /*Navigation stop (maybe later)
      $rootScope.preventNavigation = false
      $rootScope.$on('$locationChangeStart', (event, newUrl, oldUrl) => {
        if($rootScope.preventNavigation){
          event.preventDefault()
        }
      })*/

      //global vars
      $rootScope.logged = false
      $rootScope.appHeight = window.outerHeight

      $scope.masterkey = ''

      //login action
      $scope.enter = () => {
        keyManager.setMasterKey($scope.masterkey)
        if(document.activeElement) {
          document.activeElement.blur()
        }

        if(keyManager.isAuthenticated()) {
          //login was successful
          $rootScope.logged = true
          $location.path('/list')
        }
      }

    }])

  }
}