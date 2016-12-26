export default class ListCtrl {
  angular
  mdDialog
  keyManager
  _scope
  mdMedia

  constructor(app, _angular) {
    this.start(app)
    this.angular = _angular
  }

  start = (app) => {
    app.controller('listCtrl', ['$scope', '$mdDialog','$mdMedia','keyManager', ($scope, $mdDialog, $mdMedia, keyManager) => {
      $scope.keySet = keyManager.keyObj

      this.mdDialog = $mdDialog
      this.keyManager = keyManager
      this._scope = $scope
      this.mdMedia = $mdMedia

      $scope.goToKey = this.goToKey

      $scope.optionClick = this.optionClick

      $scope.addNew = this.addNew
      
    }])
  }

  goToKey = (key, data, ev) =>{
    this.mdDialog.show({
      controller: this.showKeyDialogCtrl,
      templateUrl: 'showKeyDialog.html',
      parent: this.angular.element(document.body),
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

  optionClick = (ev, index, key, data) => {
    if(index == 0) {
      //#Edit
      let keyObjDis:any = {}
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
      //delete
      this.keyManager.deleteSave(key)
    }
  }

  addNew = (ev, keyObj) => {
    let useFullScreen = (this.mdMedia('sm') || this.mdMedia('xs'))
    this.mdDialog.show({
      controller: this.newKeyDialogCtrl,
      templateUrl: 'newKeyDialog.html',
      parent: this.angular.element(document.body),
      targetEvent: ev,
      fullscreen: useFullScreen,
      locals:{
        keyObj: keyObj
      }
    }).then( 
      (keyObj) => { this.keyManager.encryptSave(keyObj) },
      () => { return }
    )
  }

  //showKeyDialog
  showKeyDialogCtrl = ['$scope', '$mdDialog', 'keyManager', 'key', 'data', ($scope, $mdDialog, keyManager, key, data) =>{
    $scope.keyObjDis = {}
    $scope.keyObjDis.title = key
    $scope.keyObjDis.type = data.type
    $scope.keyObjDis.created = data.created
    if(data.type == 1) {
      $scope.keyObjDis.user = keyManager.decrypt(data.created, data.user)
      $scope.keyObjDis.pass = keyManager.decrypt(data.created, data.pass)
    } else {
      $scope.keyObjDis.text = keyManager.decrypt(data.created, data.text)
    }

    $scope.cancel = () => {
      $mdDialog.cancel()
    }
  }]

  //newKeyDialog
  newKeyDialogCtrl = ['$scope', '$mdDialog', '$rootScope' ,'keyObj', ($scope, $mdDialog, $rootScope, keyObj) => {
    $scope.keyObj = keyObj || {type:1}

    $scope.appHeight = $rootScope.appHeight

    $scope.cancel = () => {
      $mdDialog.cancel()
    }

    $scope.save = () => {
      $mdDialog.hide($scope.keyObj)
    }
  }]




}