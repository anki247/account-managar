define ['keyManager','mainCtrl', 'loginCtrl', 'listCtrl', 'ngMaterial', 'ngRoute', 'ngAnimate', 'ngMessages'], (KeyManager, MainCtrl, LoginCtrl, ListCtrl) ->
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
      app.factory 'keyManager', ['$mdToast', ($mdToast) ->
        unless keyManager
          keyManager = new KeyManager($mdToast)
        keyManager
      ]

      new MainCtrl app
      new LoginCtrl app
      new ListCtrl app

      ###dummy controller
      test = new TestCtrl()
      console.log '-------------------'
      console.log test
      console.log test.a
      console.log test.b
      console.log test.getb()
      console.log test.getbb()
      console.log '-------------------'
      console.log test.getc()
      console.log test.getd()
      ###










      return
