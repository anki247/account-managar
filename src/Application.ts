/// <reference path="./def/account-manager.d.ts" />
import KeyManager from './KeyManager';
import ToastManager from './ToastManager';
import MainCtrl from './MainCtrl';
import LoginCtrl from './LoginCtrl';
import ListCtrl from './ListCtrl';

export default class Application {
  app
  angular
  constructor(_angular) {
    this.angular = _angular
    this.start(_angular)
  }

  private start(angular) {
    this.app = angular.module('app', ['ngMaterial', 'ngRoute', 'ngAnimate', 'ngMessages'])

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
    }]);

    //Factories
    this.app.factory('toastManager', ['$mdToast', ($mdToast) => {
      let toastManager
      if(!toastManager) {
        toastManager = new ToastManager($mdToast)
      }
      return toastManager
    }])

    this.app.factory('keyManager', ['toastManager', (toastManager) => {
      let keyManager
      if(!keyManager) {
        keyManager = new KeyManager()
        keyManager.start(toastManager)
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

    //init Ctrl
    new MainCtrl(this.app)
    new LoginCtrl(this.app)
    new ListCtrl(this.app, this.angular)

  }
}