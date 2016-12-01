import Application from './Application'

((Application, angular) => {
  //start Application
  new Application(angular)

  //bootstrap Angular
  angular.bootstrap(document, ['app'])
  
})(Application, angular);
