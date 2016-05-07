requirejs.config
  paths:
    cryptoJS: '../js/lib/aes'
    angular: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular.min'
    ngAnimate: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-animate.min'
    ngAria: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-aria.min'
    ngMaterial: 'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.0.1/angular-material.min'
    ngRoute: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular-route.min'
    ngMessages: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-messages.min'

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
