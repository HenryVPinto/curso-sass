var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var browserify = require ('gulp-browserify');
var merge = require ('merge-stream');
var fuentesJS = [
  'js/funciones.js',
  'js/main.js'
]

gulp.task('sass', function() {
 var archivoSASS,
     archivosCSS;

     archivoSASS = gulp.src('scss/app.scss')
      .pipe(autoprefixer())
      .pipe(sass({
        includePaths:['scss']
      }))
});
gulp.task('js', function(){
  gulp.src(fuentesJS)
   .pipe(concat('scripts.js'))
   .pipe(browserify())
   .pipe(gulp.dest('app/js'))
   .pipe(reload({stream:true}))
});

// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('serve', ['sass'], function() {
  browserSync.init(["app/css/*.css", "app/js/*.js", "app/*.html"], {
    server: {
      baseDir: 'app'
    }
  });

});

gulp.task('watch', ['sass', 'serve', 'js'], function() {
  gulp.watch(["scss/*.scss"], ['sass']);
  gulp.watch(["js/*.js"], ['js']);
});
