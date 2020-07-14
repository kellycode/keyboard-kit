const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');



// "FAV" ICONS copy over to deploy
const iconFiles = ['home/apple-touch-icon.png', 'home/favicon.gif', 'home/favicon.ico', 'home/favicon.png'];
const iconDest = '../keyboard-kit-deploy';

gulp.task('icons', function () {
    return gulp.src(iconFiles)
            .pipe(gulp.dest(iconDest));
});


// IMAGES COMPRESS AND MOVE
const imgFiles = 'home/img/*';
const imgDest = '../keyboard-kit-deploy/img';
gulp.task('img', function () {
    return gulp.src(imgFiles)
            .pipe(imagemin())
            .pipe(gulp.dest(imgDest));
});


// copies everything in home/css over to deploy
const cssFiles = 'home/css/**/*.*';
const cssDest = '../keyboard-kit-deploy/css';
gulp.task('css', function () {
    return gulp.src(cssFiles)
            .pipe(gulp.dest(cssDest));
});


// copies all site js over ( not ext )
const jsFiles = ['home/js/Module.KeyboardKit.Main.js', 'home/js/Module.KeyboardKit.NoteData.js', 'home/js/Module.KeyboardKit.NoteMethods.js', 'home/js/Module.KeyboardKit.Directives.js', 'home/js/Module.KeyboardKit.App.js'];
const jsDest = '../keyboard-kit-deploy/js';
gulp.task('js', function () {
    return gulp.src(jsFiles)
            .pipe(concat('keyboardkit.bundle.js'))
            .pipe(gulp.dest(jsDest))
            .pipe(rename('keyboardkit.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(jsDest));
});




// DEPLOY CSS
const allCssFiles = [
    "home/css/bootstrap_4.4.1_darkly/bootstrap.min.css",
    "home/css/keyboardkit.css",
    "home/page_modules/*.css"];
const allCssDest = '../keyboard-kit-deploy/css';

gulp.task('deploy_css', function () {
    return gulp.src(allCssFiles)
            .pipe(concat('keyboardkit.bundle.css'))
            //.pipe(gulp.dest(allCssDest))
            .pipe(rename('keyboardkit.min.css'))
            .pipe(cleanCSS())
            .pipe(gulp.dest(allCssDest));
});


// DEPLOY JS
const allJsFiles = [
    'home/ext/angular/angular-1.7.9/angular.min.js',
    'home/ext/angular/angular-1.7.9/angular-animate.min.js',
    'home/ext/angular/angular-1.7.9/angular-sanitize.min.js',
    'home/ext/angular/angular-1.7.9/angular-cookies.min.js',
    'home/ext/ui-bootstrap-custom-build/ui-bootstrap-custom-tpls-2.5.0.min.js',
    'home/ext/ui-bootstrap-custom-build/ui-bootstrap-custom-2.5.0.min.js',
    'home/js/Module.KeyboardKit.Main.js', 
    'home/js/Module.KeyboardKit.NoteData.js',
    'home/js/Module.KeyboardKit.Directives.js', 
    'home/js/Module.KeyboardKit.NoteMethods.js', 
    'home/js/Module.KeyboardKit.App.js'];

const allJsDest = '../keyboard-kit-deploy/js';

gulp.task('deploy_js', function () {
    return gulp.src(allJsFiles)
            .pipe(concat('keyboardkit.bundle.js'))
            //.pipe(gulp.dest(allJsDest))
            .pipe(rename('keyboardkit.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(allJsDest));
});


// PAGE MODULES just the html
const moduleFiles = 'home/page_modules/*.html';
const moduleDest = '../keyboard-kit-deploy/page_modules';

gulp.task('modules', function () {
    return gulp.src(moduleFiles)
            .pipe(gulp.dest(moduleDest));
});



gulp.task('default', gulp.series('deploy_css', 'deploy_js', 'modules', 'img', 'icons'));
gulp.task('deploy', gulp.series('deploy_css', 'deploy_js', 'modules', 'img', 'icons'));
// if we've already got images in deploy and just updating the js and css
gulp.task('core_deploy', gulp.series('deploy_css', 'deploy_js', 'modules'));
