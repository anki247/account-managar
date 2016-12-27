import AngularUtil from './AngularUtil'

export default ['$scope', 'keyManager', 'key', 'data', ($scope, keyManager, key, data) =>{
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
      AngularUtil.mdDialog.cancel()
    }
  }]