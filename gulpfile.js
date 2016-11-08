var gulp = require('gulp'),
    path = require('path'),
    argv = require('yargs').argv,
    gutil = require('gulp-util'),
    config = require('./gulp/config/config.json'),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    reload = browserSync.reload;

var requireDir = require('require-dir')('./gulp/tasks', {recurse: true});

var gulp_src = gulp.src;
gulp.src = function () {
    return gulp_src.apply(gulp, arguments)
        .pipe(plumber(function (error) {
                gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
                this.emit('end');
            })
        );
};


gulp.task('server', ['build', 'watch'], function () {
    browserSync.init({
        server: {
            baseDir: config.paths.base.build
        },
        reloadDelay: 1000,
        reloadDebounce: 1000
    });
});

gulp.task('clean', function (cb) {
    return del([config.paths.base.build], cb);
});

gulp.task('watch', function () {
    gulp.watch(config.paths.base.bower + '**/*', ['vendor']).on("change", reload);
    gulp.watch(config.paths.base.src + config.paths.assets.scss + '**/*.scss', ['scss']).on("change", reload);
    gulp.watch(config.paths.base.src + config.paths.assets.js + '**/*js', ['js']).on("change", reload);
    gulp.watch(config.paths.base.src + config.paths.assets.img + '**/*', ['img']).on("change", reload);
    gulp.watch(config.paths.base.src + '**/*.jade', ['jade']).on("change", reload);
});

gulp.task('build', function (cb) {
    runSequence('clean', 'vendor',
        ['copy', 'img', 'js', 'scss'],
        'jade', cb);
});

gulp.task('copy', function () {

    var task = {
        production:(argv[config.argv.production])
    };

    var src = task.production ? config.copy.production : config.copy.dev;

    for (var i = 0; i < src.length; i++) {
        gutil.log(
            gutil.colors.cyan('[Copying]'),
            (gutil.colors.green(src[i].src)),
            gutil.colors.yellow(' =====> '),
            (gutil.colors.green(src[i].to))
        );
        gulp.src(src[i].src)
            .pipe(gulp.dest(path.join(config.paths.base.build, src[i].to)));
    }
});