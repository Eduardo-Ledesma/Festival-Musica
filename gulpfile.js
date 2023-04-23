const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');

const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'));

    done(); 
}

function images(done) {
    const options = {
        optimizationLevel: 3
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(options)))
        .pipe(dest('build/img'));

    done();
}

function webpVersion(done) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(options))
        .pipe(dest('build/img'));

    done();
}

function avifVersion(done) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(options))
        .pipe(dest('build/img'));

    done();
}

function js(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'))
    
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)

    done();
}

exports.css = css;
exports.js = js;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.dev = parallel(images, webpVersion, avifVersion, js, dev);
