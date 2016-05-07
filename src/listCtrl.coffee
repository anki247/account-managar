define [], () ->
  ##{title: 'FaceBook', type: 1, user: '...', pass: '...'}
  ##{title: 'FaceBook', type: 2, text: '...'}
  class ListCtrl

    constructor: (app) ->
      app.controller 'listCtrl', ['$scope', '$mdDialog','$mdMedia','keyManager', ($scope, $mdDialog, $mdMedia, keyManager) ->
        $scope.keySet = keyManager.keyObj

        $scope.goToKey = (key, data, ev) ->
          $mdDialog.show(
            controller: showKeyDialogCtrl
            templateUrl: 'showKeyDialog.html'
            parent: angular.element(document.body)
            targetEvent: ev
            locals:
              key: key
              data: data
          ).then ( ->
            return
          ), ->
            return
          return

        $scope.optionClick = (ev, index, key, data) ->
          if(index == 0) #Edit
            keyObjDis = {}
            keyObjDis.title = key
            keyObjDis.type = data.type
            if(data.type == 1)
              keyObjDis.user = keyManager.decrypt key, data.user
              keyObjDis.pass = keyManager.decrypt key, data.pass
            else
              keyObjDis.text = keyManager.decrypt key, data.text
            keyObjDis.skip = true
            $scope.addNew ev, keyObjDis
          else #delete
            keyManager.deleteSave key

          return

        $scope.addNew = (ev, keyObj) ->
          useFullScreen = ($mdMedia('sm') or $mdMedia('xs'))
          $mdDialog.show(
            controller: newKeyDialogCtrl
            templateUrl: 'newKeyDialog.html'
            parent: angular.element(document.body)
            targetEvent: ev
            fullscreen: useFullScreen
            locals:
              keyObj: keyObj
          ).then ((keyObj) ->
            keyManager.encryptSave keyObj
            return
          ), () ->
            return
          return
        return
      ]

      #showKeyDialog
      showKeyDialogCtrl = ['$scope', '$mdDialog', 'keyManager', 'key', 'data', ($scope, $mdDialog, keyManager, key, data) ->
        $scope.keyObjDis = {}
        $scope.keyObjDis.title = key
        $scope.keyObjDis.type = data.type
        if(data.type == 1)
          $scope.keyObjDis.user = keyManager.decrypt key, data.user
          $scope.keyObjDis.pass = keyManager.decrypt key, data.pass
        else
          $scope.keyObjDis.text = keyManager.decrypt key, data.text

        $scope.cancel = ->
          $mdDialog.cancel()
          return
        return
      ]

      #newKeyDialog
      newKeyDialogCtrl = ['$scope', '$mdDialog','keyObj', ($scope, $mdDialog, keyObj) ->
        $scope.keyObj = keyObj || {type:1}

        $scope.cancel = ->
          $mdDialog.cancel()
          return

        $scope.save = () ->
          $mdDialog.hide $scope.keyObj
          return

        return
      ]
