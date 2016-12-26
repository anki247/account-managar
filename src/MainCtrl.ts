import ToastManager from './ToastManager'

export default class MainCtrl {
  _keyManager
  _mdSidenav

  constructor(app) {
    console.log('init MainCtrl')
    this.start(app)
  }

  private start(app) {
    app.controller('mainController', ['$scope', '$mdSidenav', 'keyManager', ($scope, $mdSidenav, keyManager) => {

      $scope.toggleSidenav = (menuId) => {
        $mdSidenav(menuId).toggle()
      }

      //download TODO dom anpassen
      $scope.exportKey = () => {
         this.exportImpl(keyManager, $mdSidenav)
      }
       

      $scope.importKey = () => {document.getElementById('upload-btn').click()}

      //uplaoud TODO dom anpassen
      $scope.upload = (event) => {
        console.log('event: ', event)
        this.uploadImp(event, keyManager, $mdSidenav)
      }
    }])
  }

  private exportImpl(keyManager, mdSidenav) {
    console.log('--> Export')
    console.log(keyManager)
    let keyObj = keyManager.keyObj
    let a = document.createElement('a')
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(keyManager.encryptKeyObj()))
    a.setAttribute('download', 'AM-' + this.genarateDateStr() + '.am')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    ToastManager.toast('export')
    mdSidenav('right').toggle()
  }

  private uploadImp(event, keyManager, mdSidenav){
    console.log('--> Import')
    let input = event.target
    let reader = new FileReader()
    reader.onload = () => {
      let importedKeyObj = JSON.parse(keyManager.decryptKeyObj(reader.result))

      console.log(importedKeyObj)
      //TODO merge keyObj
      this.mergeKeyObj(keyManager.keyObj, importedKeyObj)

      keyManager.saveKey()

      ToastManager.toast('import')
      mdSidenav('right').toggle()
    }
    reader.readAsText(input.files[0])
  }

  private mergeKeyObj(origKeyObj, importedKeyObj) {
    console.log('mergeKeyObj')
    for(let title in importedKeyObj) {
      let body = importedKeyObj[title]
      if(typeof origKeyObj[title] === 'undefined'){ 
        //new Key
        origKeyObj[title] = body
      } else {
        //key exists
        if(origKeyObj[title].type === body.type) {
          //same type
          if(origKeyObj[title].created === body.created) {
            continue
          }
        }
        //new key with same title
        origKeyObj[this.getNextAvailableTile(origKeyObj, title)] = body
      }
    }
  }

  private getNextAvailableTile(origKeyObj, title) {
    let i = 1
    let exten = '('+i+')'
    while(origKeyObj[title + exten] !== undefined){
      i++
      exten = '('+i+')'
    }
    return  title+exten
  }

  private genarateDateStr(){
    let now = new Date()
    return now.getFullYear() + this.format(now.getMonth() + 1) + this.format(now.getDate()) + this.format(now.getHours()) + this.format(now.getMinutes()) + this.format(now.getSeconds())
  }

  private format(c){
    if(c < 10) {
      return  '0' + c
    } else {
      return '' + c
    }
  }
}