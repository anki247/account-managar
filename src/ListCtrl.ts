import AngularUtil from './AngularUtil'
import DialogAddNewCtrl from './DialogAddNewCtrl'
import DialogShowKeyCtrl from './DialogShowKeyCtrl'

export default class ListCtrl {
  keyManager
  _scope

  constructor() {
    this.start()
  }

  private start = () => {
    AngularUtil.app.controller('listCtrl', ['$scope','keyManager', ($scope, keyManager) => {
      $scope.keySet = keyManager.keyObj

      this.keyManager = keyManager
      this._scope = $scope

      $scope.goToKey = this.goToKey

      $scope.optionClick = this.optionClick

      $scope.addNew = this.addNew
      
    }])
  }

  private goToKey = (key, data, ev) =>{
    AngularUtil.mdDialog.show({
      controller: DialogShowKeyCtrl,
      templateUrl: 'showKeyDialog.html',
      parent: AngularUtil.angular.element(document.body),
      targetEvent: ev,
      locals: {
        key: key,
        data: data
      }
    }).then(
      () => {return}, 
      () => {return}
    )
  }

  private optionClick = (ev, index, key: string, data: KeyObjDataI) => {
    if(index == 0) {
      //#Edit
      let keyObjDis: PlainKeyObjI = {} as PlainKeyObjI
      keyObjDis.title = key
      keyObjDis.type = data.type
      keyObjDis.created = data.created
      if(data.type == 1) {
        keyObjDis.user = this.keyManager.decrypt(data.created, data.user)
        keyObjDis.pass = this.keyManager.decrypt(data.created, data.pass)
      } else {
        keyObjDis.text = this.keyManager.decrypt(data.created, data.text)
      }
      keyObjDis.skip = true
      keyObjDis.oldTitle = key

      this._scope.addNew(ev, keyObjDis)
    } else { 
      //delete //TODO open confirm dialog
      this.keyManager.deleteSave(key)
    }
  }

  private addNew = (ev, keyObj: PlainKeyObjI) => {
    let useFullScreen = (AngularUtil.mdMedia('sm') || AngularUtil.mdMedia('xs'))
    AngularUtil.mdDialog.show({
      controller: DialogAddNewCtrl,
      templateUrl: 'newKeyDialog.html',
      parent: AngularUtil.angular.element(document.body),
      targetEvent: ev,
      fullscreen: useFullScreen,
      locals:{
        keyObj: keyObj
      }
    }).then( 
      //hide ()
      (keyObj) => { this.keyManager.encryptSave(keyObj)},
      //cancel()
      () => { return }
    )
  }
}