define () ->
  class TestCtrl
    ###constructor: (app) ->
      app.controller 'testCtrl', () ->
        $scope.title = 'Hello World Zorlu!'
        return
    ###
    constructor: () ->
      console.log '--> Test Konstruktor'

    #private
    a = 'a'
    #public
    b: 'b'

    #pri access pri
    geta = () ->
      a
    #pub access pub
    getb: () =>
      @b
    #pri access public
    getaa = () => #wichtig
      @::b
    #pub access pri
    @getbb: () =>
      a

    #public
    getc: () =>
      getaa()
    getd: () =>
      @getbb()
    #private
    gete = () ->
      geta()
    getf = () =>
      @getb()
