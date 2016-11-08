var gulp = require('gulp'),
    path = require('path'),
    config = require('../config/config.json'),
    imagemin = require('gulp-imagemin');


gulp.task('img', function () {
    return gulp.src(path.join(config.paths.base.src, config.paths.assets.img, '*'))
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest(path.join(config.paths.base.build, config.paths.assets.img)));
});