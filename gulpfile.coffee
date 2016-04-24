gulp          = require 'gulp'
coffee        = require 'gulp-coffee'
webserver     = require 'gulp-webserver'
runSequence   = require 'run-sequence'
jade          = require 'gulp-jade'
uglify        = require 'gulp-uglify'

gulp.task 'templates', () ->
  gulp.src './src/views/**/*.jade'
    .pipe jade
      locals: {}
    .pipe gulp.dest('./')

gulp.task 'coffee', () ->
  gulp.src './src/**/*.coffee'
    .pipe coffee
      bare: true
    #.pipe uglify(compress: drop_console: true)
    #.pipe uglify()
    .pipe gulp.dest('./js/')

gulp.task 'webserver', () ->
  gulp.src('./')
    .pipe webserver
      host: '0.0.0.0'
      livereload: false
      directoryListing: true
      port: 5467
      open: 'index.html'

gulp.task 'default', (callback) ->
  runSequence 'templates', 'coffee', 'webserver', callback
  gulp.watch './src/views/**/*.jade', ['templates']
  gulp.watch './src/**/*.coffee', ['coffee']