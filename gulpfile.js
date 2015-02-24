"use strict";

var require, console,
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    csso = require('gulp-csso'),
    minifyCSS = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss'),
    rimraf = require('gulp-rimraf'),
    spritesmith = require('gulp.spritesmith'),
    runSequence = require('run-sequence'),
    useref = require('gulp-useref'),
    wiredep = require('wiredep').stream,
    gulpif = require('gulp-if');


// ============================================= WORKING TASKS



//local server config 
gulp.task('connect', function () {
    connect.server({
        root: 'app/',
        livereload: true
    });
});



// jade
gulp.task('jade', function () {
    var YOUR_LOCALS = {};
    gulp.src('_dev/_template/page/*.jade')
        .pipe(jade({
            pretty: true,
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('_dev/'))
        .pipe(connect.reload())
        .pipe(notify('JADE'));
});



// css plugins
gulp.task('sass', function () {
    gulp.src('_dev/_style/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('_dev/css'))
        .pipe(connect.reload())
        .pipe(notify('SCSS'));
});
gulp.task('plugin-css', function () {
    gulp.src('_dev/_style/plugins/*.scss')
        .pipe(sass())
        .pipe(concat('plugin.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload())
        .pipe(notify('plugin-CSS'));
});
gulp.task('uncss', function () {
    return gulp.src('_dev/css/*.css')
        .pipe(uncss({
            html: ['_dev/index.html']
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload())
        .pipe(notify('CSS was CLEAN & MIN'));
});
gulp.task('css', function (cb) {
    runSequence('sass', 'plugin-css', 'uncss', cb);
});




// sprite, image, favicon
gulp.task('sprite', function () {
    var spriteData = gulp.src('_dev/_sprite/*.png')   // путь, откуда берем картинки для спрайта
        .pipe(spritesmith({
            imgName: '../img/sprite.png',          // Имя в css - url('*.*')
            cssName: 'sprite.css'
        }));
    spriteData.img.pipe(gulp.dest('app/img/'))     // путь, куда сохраняем картинку
        .pipe(notify('SPRITE img'));
    spriteData.css.pipe(gulp.dest('_dev/css/'))     // путь, куда сохраняем стили
        .pipe(notify('SPRITE css'));
    spriteData.img.pipe(imagemin())              // Оптимизируем изображение
        .pipe(gulp.dest('app/img/'))
        .pipe(connect.reload())
        .pipe(notify('img OPTIMIZED'));
});
gulp.task('img', function () {
    gulp.src('_dev/_img/*.*')
        .pipe(gulp.dest('app/img/'))
        .pipe(connect.reload())
        .pipe(notify('IMG'));
});
gulp.task('favicon', function () {
    gulp.src('_dev/_favicon/*.ico')
        .pipe(gulp.dest('app/'))
        .pipe(connect.reload())
        .pipe(notify('FAVICON'));
});
gulp.task('images', function (cb) {
    runSequence('sprite', 'img', 'favicon', cb);
});



// javascript 
gulp.task('module-js', function () {
    gulp.src('_dev/_script/module/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/js/'))
        .pipe(uglify())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest('app/js/'))
        .pipe(connect.reload())
        .pipe(notify('module JS'));
}); 
gulp.task('plugin-js', function () {
    gulp.src('_dev/_script/plugins/**/*.js')
        .pipe(concat('plugin.js'))
        .pipe(gulp.dest('app/js/'))
        .pipe(uglify())
        .pipe(rename("plugin.min.js"))
        .pipe(gulp.dest('app/js/plugin'))
        .pipe(connect.reload())
        .pipe(notify('plugin JS'));
});
gulp.task('dest-scripts-comp', function () {
    gulp.src(['_dev/_script/plugins/**/*.gif', '_dev/_script/plugins/**/*.png'])
        .pipe(gulp.dest('app/js/plugin'))
        .pipe(notify('dest-scripts-comp'));
});
gulp.task('scripts', function (cb) {
    runSequence('module-js', 'plugin-js', 'dest-scripts-comp', cb);
});



// vendor
gulp.task('rimraf', function () {
    return gulp.src('./app/*.html')
        .pipe(rimraf())
        .pipe(notify('rimraf-rimraf-rimraf-rimraf-rimraf'));
});
gulp.task('bower', function () {
    return gulp.src('./_dev/*.html')
        .pipe(wiredep({
            directory: './_dev/_bower',
            devDependencies: true
        }))
        .pipe(gulp.dest('./_dev/vendor'));
});
gulp.task('useref', function () {
    var assets = useref.assets();
    return gulp.src('./_dev/vendor/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./app'))
        .pipe(connect.reload())
        .pipe(notify('VENDOR'));
});
gulp.task('vendor', function (cb) {
    runSequence('rimraf', 'bower', 'useref', cb);
});




// general build
gulp.task('build', function (cb) {
    runSequence(['jade', 'sass'], 'scripts', 'images', cb);
});




//// watch
gulp.task('watch', function () {
    gulp.watch(['_dev/_template/**/*.jade'], ['jade']);
    gulp.watch(['_dev/_style/**/*.scss'], ['css']);
    gulp.watch(['_dev/_sprite/*.*'], ['sprite']);
    gulp.watch(['_dev/_img/*.*'], ['images']);
    gulp.watch(['_dev/_favicon/*.ico'], ['images']);
    gulp.watch(['_dev/_script/*.*'], ['js']);
    gulp.watch(['_dev/_template/**/*.jade'], ['vendor']);
});




gulp.task('default', ['build', 'connect', 'watch']);
