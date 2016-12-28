import AngularUtil from './AngularUtil'

export default ['$scope', 'keyManager', 'key', 'data', ($scope, keyManager, key: string, data: KeyObjDataI) =>{
    
    let keyObjDis: PlainKeyObjI = {} as PlainKeyObjI
    keyObjDis.title = key
    keyObjDis.type = data.type
    keyObjDis.created = data.created
    if(data.type == 1) {
      keyObjDis.user = keyManager.decrypt(data.created, data.user)
      keyObjDis.pass = keyManager.decrypt(data.created, data.pass)
    } else {
      keyObjDis.text = keyManager.decrypt(data.created, data.text)
    }

    $scope.keyObjDis = keyObjDis
    $scope.cancel = () => {
      AngularUtil.mdDialog.cancel()
    }
  }]