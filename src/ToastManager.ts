export default class ToastManager {
  mdToast

  constructor(_mdToast) {
    console.log('toast init')
    this.mdToast = _mdToast
  }

  /**
   * toast
   */
  public toast(msg) {
    this.mdToast.showSimple(msg)
  }

  /**
   * toastAction
   */
  public toastAction(msg, cb) {
    let toast = this.mdToast.simple()
                .textContent(msg)
                .action('YES')
                .highlightAction(true)
                .hideDelay(0)
                
    this.mdToast.show(toast).then((response) => {
      if(response == 'ok'){
        cb()
      }
    })
  }
}