var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    jshint = require('gulp-jshint'),
    uglify  = require('gulp-uglify'),
    clean = require('gulp-rimraf'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    jsValidate = require('gulp-jsvalidate'),
    killSemicolon = require('gulp-kill-semicolon').killSemicolon;

var autoprefixerOptions = {
    browsers: ['last 2 versions']
};

function errorLog(error) {
    console.error.bind(error);
    this.emit('end'); 
}

var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error));
      this.emit('end');
    })
  );
};

gulp.task('clean', [], function() {
  console.log("Clean all files in build folder");
     return gulp.src(["web/bundles/app/css/", "web/bundles/app/js"], { read: false })
        .pipe(clean());
});

gulp.task('scripts', function() {
    return gulp.src(['src/AppBundle/Resources/assets/js/*.js'])
        .on('error', errorLog)
        .pipe(jsValidate())
        .pipe(killSemicolon())
        .pipe(jshint())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('web/bundles/app/js'))
});

gulp.task('sass', function() {
    return gulp.src(['src/AppBundle/Resources/assets/gfx/scss/main.scss'])
        .pipe(sass({
            includePaths: ['view/css/scss/'],
            indentedSyntax : false,
            errLogToConsole: true
        }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(cssmin())
        .on('error', errorLog)
        .pipe(gulp.dest('src/AppBundle/Resources/public/css/'))
        .pipe(gulp.dest('web/bundles/app/css/'))
});

gulp.task('imagein', () =>
    gulp.src('src/AppBundle/Resources/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('web/assets/img'))
);

gulp.task('copyfonts', function() {
   gulp.src('src/AppBundle/Resources/assets/fonts/*.{ttf,woff,eof,svg}')
   .pipe(gulp.dest('web/assets/fonts'));
});

gulp.task('watch', function() {
    gulp.watch('vsrc/AppBundle/Resources/assets/js/main.js', function(event) {
        gulp.run('scripts');
    })
    gulp.watch('src/AppBundle/Resources/assets/gfx/scss/main.scss', function(event) {
        gulp.run('sass');
    })
});

gulp.task('default', ['clean', 'imagein', 'sass', 'scripts', 'copyfonts']);
gulp.task('gulp js', ['scripts']);
gulp.task('css', ['sass']);
gulp.task('img', ['imagein']);