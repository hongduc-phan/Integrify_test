var gulp = require('gulp'),
    path = require('path'),
    argv = require('yargs').argv,
    config = require('../config/config.json'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    csslint = require('gulp-csslint'),
    cleanCSS = require('gulp-clean-css'),
    gutil = require('gulp-util'),
    print = require('gulp-print'),
    gulpif = require('gulp-if');


gulp.task('scss', function () {

    var task = {
            minified: false,
            production: (argv[config.argv.production])
        },
        checkOutput = {
            linter: (!argv[config.argv.silent] && !argv[config.argv.noLinter]),
            minify: (argv[config.argv.minify])
        };
    gulp.src(path.join(config.paths.base.src, config.paths.assets.scss, '**/*.scss'))
        .pipe(gulpif((checkOutput.linter), sassLint({
            configFile: path.join(config.paths.base.linter, config.paths.linter.sass)
        })))
        .pipe(gulpif((checkOutput.linter), sassLint.format()))
        .pipe(gulpif((checkOutput.linter), sassLint.failOnError()));

    gulp.src(path.join(config.paths.base.src, config.paths.assets.scss, '*.scss'))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({browsers: ['> 1%', 'IE 9'], cascade: false}))
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(print(function (filepath) {
            if (task.production) {
                console.log();
                gutil.log(
                    gutil.colors.cyan('[Minifying]'),
                    gutil.colors.underline(filepath)
                );
            }
        }))
        .pipe(gulpif(task.production, cleanCSS({debug: true}, function (details) {
            if (!argv.silent) {
                task.minified = true;
                gutil.log(
                    gutil.colors.yellow('===>[Result]'),
                    gutil.colors.magenta(details.name),
                    'reduce',
                    gutil.colors.red((100 - (details.stats.minifiedSize / details.stats.originalSize * 100)).toFixed(2) + '%'),
                    'size, from',
                    gutil.colors.red(details.stats.originalSize),
                    gutil.colors.red('->'),
                    gutil.colors.red(details.stats.minifiedSize + '.')
                );
            }

        })))
        .pipe(gulpif((checkOutput.linter), csslint(path.join(config.paths.base.linter, config.paths.linter.css))))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(config.paths.base.build, config.paths.assets.css)))
        .pipe(gulpif((checkOutput.linter), csslint.reporter(function (file) {

            console.log();

            gutil.log(
                gutil.colors.cyan('[Linting]'),
                gutil.colors.underline(gutil.colors.magenta(file.path))
            );

            gutil.log(
                gutil.colors.yellow('===>[Result]'),
                gutil.colors.red('[' + file.csslint.errorCount + '] problems')
            );

            if (task.minified) {
                gutil.log(
                    gutil.colors.red('Beware, the output file has been minified.')
                );
            }

            file.csslint.results.forEach(function (result) {
                //console.log(result);
                gutil.log(
                    '[' + result.error.line + ':' + result.error.col + ']',
                    gutil.colors.cyan('[' + result.error.rule.id + ']'),
                    result.error.message
                );
                gutil.log(
                    '===================>',
                    result.error.evidence
                );
            });

        })));
});
