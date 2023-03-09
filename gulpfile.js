const { src, dest, watch, parallel } = require('gulp');

//* CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//* Imágenes
const cache = require('gulp-cache');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const imagemin = require('gulp-imagemin');

// Compilar SASS a CSS
function css(done) {
  // Identificar archivo SASS
  src('src/scss/**/*.scss')
    // Librería para evitar la detención del watch en un error
    .pipe(plumber())
    // Compilar
    .pipe(sass())
    // Almacenar
    .pipe(dest('build/css'));

  done(); // Callback que avisa a Gulp que hemos terminado
}

// Convertir imágenes en Webp
function webpConvert(done) {

  const calidad = {
    quality: 50
  };

  src('src/img/**/*.{png,jpg}')
    .pipe(webp(calidad))
    .pipe(dest('build/img'));

  done();
}

// Convertir imágenes en Avif
function avifConvert(done) {

  const calidad = {
    quality: 50
  };

  src('src/img/**/*.{png,jpg}')
    .pipe(avif(calidad))
    .pipe(dest('build/img'));

  done();
}

// Aligerar imágenes
function jpgReduce(done) {

  const calidad = {
    optimizationLevel: 3
  };

  src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(calidad)))
    .pipe(dest('build/img'));

  done();
}

// Monitor de cambios de CSS
function dev(done) {
  watch('src/scss/**/*.scss', css);

  done();
}

exports.css = css;
exports.webpConvert = webpConvert;
exports.avifConvert = avifConvert;
exports.jpgReduce = jpgReduce;

// Ejecutar en la consola como: npx gulp dev
exports.dev = parallel(jpgReduce, webpConvert, avifConvert, dev);