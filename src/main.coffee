requirejs.config
  paths:
    cryptoJS: '../js/lib/aes'
    angular: '../bower_components/angular/angular.min'
    ngAnimate: '../bower_components/angular-animate/angular-animate.min'
    ngAria: '../bower_components/angular-aria/angular-aria.min'
    ngMaterial: '../bower_components/angular-material/angular-material.min'
    ngRoute: '../bower_components/angular-route/angular-route.min'
    ngMessages: '../bower_components/angular-messages/angular-messages.min'
  shim:
    aesManager: ['cryptoJS']
    ngAnimate: ['angular']
    ngAria: ['angular']
    ngRoute: ['angular']
    ngMaterial: ['ngAnimate', 'ngAria']
    ngMessages: ['angular']

require ['application'], (Application) ->
  console.log 'start Application'

  new Application()
  angular.bootstrap document, ['app']
