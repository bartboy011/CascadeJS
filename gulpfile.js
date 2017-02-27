var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
//var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var minify = require('gulp-minify');

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('sass', function () {
    gulp.src('./src/css/cascade.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass({
        outputStyle: 'compressed'
      }))
      .pipe(autoprefixer())
      .pipe(rename('cascade.min.css'))
      .pipe(gulp.dest('dist'))
      .pipe(livereload());

    gulp.src('./src/css/cascade.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('dist'))
      .pipe(livereload());

    gulp.src('./src/css/cascade.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('docs/css/src'))
      .pipe(livereload());

    gulp.src('./docs/css/styles.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('docs/css'))
      .pipe(livereload());
});

gulp.task('js', function () {
  gulp.src([
    'src/js/initializers/*.js',
    'src/js/cascade.js'
  ])
    .pipe(plumber(plumberErrorHandler))
    .pipe(babel({
      presets: [
        ["es2015", { "modules": false }]
      ]
    }))
    .pipe(concat('cascade.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());

  gulp.src([
    'src/js/initializers/*.js',
    'src/js/cascade.js'
  ])
    .pipe(plumber(plumberErrorHandler))
    .pipe(babel({
      presets: [
        ["es2015", { "modules": false }]
      ]
    }))
    .pipe(concat('cascade.js'))
    .pipe(gulp.dest('docs/js'))
    .pipe(livereload());
});

/*gulp.task('img', function() {
  gulp.src('src/img/*.{png,jpg,gif,svg}')
    .pipe(plumber(plumberErrorHandler))
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe(livereload());
});*/

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/css/**/*.scss', ['sass']);
  gulp.watch('docs/css/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
  //gulp.watch('img/*.{png,jpg,gif,svg}', ['img']);
});

gulp.task('default', ['sass', 'js', 'watch']);
