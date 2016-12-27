var gulp      = require('gulp'),
runSequence   = require('run-sequence'),
jade          = require('gulp-jade'),
del           = require('del'),
ts            = require("gulp-typescript"),
tsProject     = ts.createProject("tsconfig.json"),
gulpWebpack   = require('gulp-webpack'),
webpack       = require('webpack'),
browserSync   = require('browser-sync').create();

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
    .pipe(gulp.dest('js/bundle/'));
});

gulp.task('default', ['serve']);

gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('./src/views/**/*.jade', ['templates', 'del:jade']);
    gulp.watch('./src/**/*.ts', ['typescript']);
    gulp.watch('./js/*.js', ['webpack']);

    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./js/bundle/bundle.js").on('change', browserSync.reload);
    gulp.watch("./css/*.css").on('change', browserSync.reload);
});