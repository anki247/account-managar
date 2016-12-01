var gulp      = require('gulp'),
webserver     = require('gulp-webserver'),
runSequence   = require('run-sequence'),
jade          = require('gulp-jade'),
del           = require('del'),
ts            = require("gulp-typescript"),
tsProject     = ts.createProject("tsconfig.json"),
gulpWebpack   = require('gulp-webpack'),
webpack       = require('webpack');

gulp.task('templates', () => {
  gulp.src('./src/views/**/*.jade')
    .pipe(jade({locals: {}}))
    .pipe(gulp.dest('./'));
});

gulp.task('del:jade', () => {
  del([
    './*.html',
    '!./index.html'
  ]);
});

gulp.task("typescript", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("js"));
});

gulp.task('webpack', function() {
  return gulp.src('js/Main.js')
    .pipe(gulpWebpack({
      output: {
        filename: 'bundle.js'
      },
      console: true,
      plugins: [
          new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
              drop_console: true
            }
          })
        ]
    }))
    .pipe(gulp.dest('js/'));
});

gulp.task('webserver', () =>{
  gulp.src('./')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: false,
      directoryListing: true,
      port: 5467,
      open: 'index.html'
    }));
});

gulp.task('default', (callback) => {
    runSequence('templates', 'del:jade', 'typescript', 'webpack', 'webserver', callback);
    gulp.watch('./src/views/**/*.jade', ['templates', 'del:jade']);
    gulp.watch('./src/**/*.ts', ['typescript', 'webpack']);
  }
);