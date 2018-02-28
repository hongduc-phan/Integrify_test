//var gulp = require('gulp'),
//    path = require('path'),
//    config = require('../config/config.json'),
//    argv = require('yargs').argv,
//    print = require('gulp-print').default,
//    inject = require('gulp-inject'),
//    gulpif = require('gulp-if');
//
//gulp.task('inject', function () {
//    var task = {
//        production: (argv[config.argv.production])
//    };
//
//    return gulp.src([path.join(config.paths.base.build, '/*.html')])
//        .pipe(print(function (filepath) {
//            return "Process file: " + filepath;
//        }))
//        .pipe(gulpif(!task.production,
//            inject(gulp.src(config.vendor.dev.js, {read: false}, {
//                relative: true
//            }))))
//        .pipe(gulpif(!task.production, inject(gulp.src(config.vendor.dev.css, {read: false}, {relative: true})
//        )))
//        .pipe(gulpif(task.production,
//            inject(gulp.src(path.join(config.paths.base.build, config.paths.assets.js, config.vendor.production.js),
//                {read: false}))))
//        .pipe(gulpif(task.production, inject(gulp.src(path.join(config.paths.base.build, config.paths.assets.css, config.vendor.production.css),
//            {read: false}))))
//        .pipe(gulp.dest('./'))
//});
//
