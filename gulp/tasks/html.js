var gulp = require('gulp'),
    path = require('path'),
    config = require('../config/config.json'),
    argv = require('yargs').argv,
    htmlhint = require('gulp-htmlhint'),
    print = require('gulp-print'),
    inject = require('gulp-inject'),
    gulpif = require('gulp-if');

gulp.task('html', function () {

    var task = {
        production: (argv[config.argv.production])
    };

    return gulp.src(path.join(config.paths.base.src, '**/*.html'))
        .pipe(print(function (filepath) {
            return "Process file: " + filepath;
        }))
        .pipe(htmlhint(config.paths.base.linter + config.paths.linter.html))
        .pipe(gulp.dest(config.paths.base.build))
        //.pipe(htmlhint.reporter());
        .pipe(htmlhint.reporter('htmlhint-stylish'));
});

