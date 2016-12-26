import AngularUtil from './AngularUtil'

class ToastManager {

  constructor() {
    console.log('toast init')
  }

  /**
   * toast
   */
  public toast(msg: string) {
    AngularUtil.mdToast.showSimple(msg)
  }

  /**
   * toastAction
   */
  public toastAction(msg, cb) {
    let toast = AngularUtil.mdToast.simple()
                .textContent(msg)
                .action('YES')
                .highlightAction(true)
                .hideDelay(0)
                
    AngularUtil.mdToast.show(toast).then((response) => {
      if(response === 'ok'){
        cb()
      }
    })
  }
}

export default new ToastManager();