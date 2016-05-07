define [], () ->
  class toastManager
    mdToast = undefined

    constructor: (_mdToast) ->
      console.log('toast init')
      mdToast = _mdToast

    toast: (msg) ->
      mdToast.showSimple msg
      return

    toastAction: (msg, cb) ->
      toast = mdToast.simple()
                .textContent msg
                .action 'YES'
                .highlightAction true
                .hideDelay(0)
      mdToast.show(toast).then (response) ->
        if(response is 'ok')
          cb()
        return
      return
