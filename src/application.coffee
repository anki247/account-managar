define ['keyManager', 'toastManager' ,'mainCtrl', 'loginCtrl', 'listCtrl', 'ngMaterial', 'ngRoute', 'ngAnimate', 'ngMessages'],
(KeyManager, ToastManager, MainCtrl, LoginCtrl, ListCtrl) ->
  #Module
  class Application
    constructor: () ->
      @start()

    start: () ->
      app = angular.module 'app', ['ngMaterial', 'ngRoute', 'ngAnimate', 'ngMessages']

      app.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->
        $routeProvider
          .when('/login',
            templateUrl: 'login.html'
            controller: 'loginCtrl'
            controllerAs: 'login'
          )
          .when('/list',
            templateUrl: 'keyList.html'
            controller: 'listCtrl'
            controllerAs: 'list'
            resolve: {
              test: ['$q', 'keyManager', ($q, keyManager) ->
                defer = $q.defer()
                if(keyManager.isAuthenticated())
                  defer.resolve()
                else
                  window.location.hash = '/login'
                defer.promise
              ]
            }
          )
          .otherwise(
            redirectTo: '/login'
          )
        $locationProvider.html5Mode(
          enabled: false,
          requireBase: false
        )
        return
      ]
      app.config ['$mdThemingProvider', ($mdThemingProvider) ->
        $mdThemingProvider.theme('default')
          .primaryPalette('blue-grey')
          .accentPalette 'light-blue'
        return
      ]
      #Factory
      app.factory 'toastManager', ['$mdToast', ($mdToast) ->
        unless toastManager
          toastManager = new ToastManager($mdToast)
        toastManager
      ]

      app.factory 'keyManager', ['toastManager', (toastManager) ->
        unless keyManager
          keyManager = new KeyManager(toastManager)
        keyManager
      ]

      app.directive 'customOnChange', ->
        {
          restrict: 'A'
          link: (scope, element, attrs) ->
            onChangeHandler = scope.$eval(attrs.customOnChange)
            element.bind 'change', onChangeHandler
            return

        }


      new MainCtrl app
      new LoginCtrl app
      new ListCtrl app

      return
