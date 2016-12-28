import AngularUtil from './AngularUtil'
import MainCtrl from './MainCtrl'
import LoginCtrl from './LoginCtrl'
import ListCtrl from './ListCtrl'

((angular) => {
  //start Application
      //init Ctrl
    new MainCtrl()
    new LoginCtrl()
    new ListCtrl()

  //bootstrap Angular
  angular.bootstrap(document, ['app'])
  
})(angular);
