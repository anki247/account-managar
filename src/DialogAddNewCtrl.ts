import AngularUtil from './AngularUtil'

export default ['$scope', '$rootScope' ,'keyObj', ($scope, $rootScope, keyObj) => {
    $scope.keyObj = keyObj || {type:1}

    $scope.appHeight = $rootScope.appHeight

    $scope.cancel = () => {
      AngularUtil.mdDialog.cancel()
    }

    $scope.save = () => {
      AngularUtil.mdDialog.hide($scope.keyObj)
    }
  }]