var gulp = require('gulp'),
    path = require('path'),
    argv = require('yargs').argv,
    config = require('../config/config.json'),
    filter = require('gulp-filter'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat');


gulp.task('vendor', function () {

    var task = {
            production:(argv[config.argv.production])
        };

    gulp.src(config.vendor.dev.js, {base: './'})
        .pipe(gulpif(task.production, concat('vendor.js')))
        .pipe(gulpif(task.production, uglify()))
        .pipe(gulpif(task.production, gulp.dest(path.join(config.paths.base.build, config.paths.assets.js))))
        .pipe(gulpif(!task.production, gulp.dest(config.paths.base.build)));

    gulp.src(config.vendor.dev.css, {base: './'})
        .pipe(gulpif(task.production, concat('vendor.css')))
        .pipe(gulpif(task.production, cleanCSS()))
        .pipe(gulpif(task.production, gulp.dest(path.join(config.paths.base.build, config.paths.assets.css))))
        .pipe(gulpif(!task.production, gulp.dest(config.paths.base.build)))
});