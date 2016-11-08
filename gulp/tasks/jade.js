var gulp = require('gulp'),
    path = require('path'),
    config = require('../config/config.json'),
    argv = require('yargs').argv,
    jade = require('gulp-pug'),
    htmlhint = require('gulp-htmlhint'),
    print = require('gulp-print'),
    inject = require('gulp-inject'),
    gulpif = require('gulp-if');

// Task [Jade] Convert Jade files to HTML files
gulp.task('jade', function () {

    var task = {
        production: (argv[config.argv.production])
    };

    return gulp.src([path.join(config.paths.base.src, '**/*.jade'),
        '!' + path.join(config.paths.base.src, 'includes/**/*.jade')])
        .pipe(print(function (filepath) {
            return "Process file: " + filepath;
        }))
        .pipe(jade({
            pretty: '  '
        }))
        .pipe(gulpif(!task.production, inject(gulp.src(config.vendor.dev.js, {read: false}, {relative: true}))))
        .pipe(gulpif(!task.production, inject(gulp.src(config.vendor.dev.css, {read: false}, {relative: true}))))
        .pipe(gulpif(task.production, inject(gulp.src(path.join(config.paths.base.build, config.paths.assets.js, config.vendor.production.js),
            {read: false}), {ignorePath: 'build'})))
        .pipe(gulpif(task.production, inject(gulp.src(path.join(config.paths.base.build, config.paths.assets.css, config.vendor.production.css),
            {read: false}), {ignorePath: 'build'})))
        .pipe(htmlhint(config.paths.base.linter + config.paths.linter.html))
        .pipe(gulp.dest(config.paths.base.build))
        //.pipe(htmlhint.reporter());
        .pipe(htmlhint.reporter('htmlhint-stylish'));
});

