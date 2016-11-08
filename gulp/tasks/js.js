var gulp = require('gulp'),
    path = require('path'),
    argv = require('yargs').argv,
    map = require('map-stream'),
    config = require('../config/config.json'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    gulpif = require('gulp-if');


gulp.task('js', function (cb) {

    pump([
            gulp.src(path.join(config.paths.base.src, config.paths.assets.js, '**/*.js')),
            jshint(path.join(config.paths.base.linter, config.paths.linter.js)),
            jshint.reporter('jshint-stylish'),
            gulpif((argv[config.argv.production]), uglify({
                mangle: true
            })),
            gulp.dest(path.join(config.paths.base.build, config.paths.assets.js))
        ],
        cb
    );

});