/// <reference path="./def/account-manager.d.ts" />
import AngularUtil from './AngularUtil'
import MainCtrl from './MainCtrl'
import LoginCtrl from './LoginCtrl'
import ListCtrl from './ListCtrl'

export default class Application {
  app
  angular
  constructor(_angular) {
    console.log('init Application')
    this.angular = _angular
    this.start()
  }

  private start() {
    this.app = AngularUtil.app
    //init Ctrl
    new MainCtrl(this.app)
    new LoginCtrl(this.app)
    new ListCtrl(this.app, this.angular)

  }
}