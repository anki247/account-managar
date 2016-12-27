import KeyManager from './KeyManager'

class AngularUtil {
  app
  injector
  angular
  mdToast
  mdMedia
  mdDialog
  constructor(_angular) {
    console.log('init AngularUtil')
    this.angular = _angular
    this.injector = _angular.injector()
    this.start()
    
  }

  start() {
    this.app = this.angular.module('app', ['ngMaterial', 'ngRoute', 'ngAnimate', 'ngMessages'])

    //router
    this.app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
      $routeProvider
        .when('/login', {
          templateUrl: 'login.html',
          controller: 'loginCtrl',
          controllerAs: 'login',
        })
        .when('/list', {
          templateUrl: 'keyList.html',
          controller: 'listCtrl',
          controllerAs: 'list',
          resolve: {
            test: ['$q', 'keyManager', ($q, keyManager) => {
              let defer = $q.defer()
              if(keyManager.isAuthenticated()){
                defer.resolve()
              }else{
                window.location.hash = '/login'
              }
              defer.promise
            }]
          },
        })
        .otherwise({
          redirectTo: '/login'
        })
      
      $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
      })
    }])
    
    //Theming
    this.app.config(['$mdThemingProvider', ($mdThemingProvider) => {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('light-blue')
    }])


    //Factories
    this.app.factory('keyManager', ['$mdToast', '$mdMedia', '$mdDialog', ($mdToast, $mdMedia, $mdDialog) => {
      //f*cking injection
      this.mdToast = $mdToast 
      this.mdMedia = $mdMedia
      this.mdDialog = $mdDialog
      
      let keyManager
      if(!keyManager) {
        keyManager = new KeyManager()
        keyManager.start()
      }
      return keyManager
    }])

    this.app.directive('customOnChange', () => {
      return {
        restrict: 'A',
        link: (scope, element, attrs) => {
          let onChangeHandler = scope.$eval(attrs.customOnChange)
          element.bind('change', onChangeHandler)
        }
      }
    })
  }

}
//Singleton
export default new AngularUtil(angular)