const { src, dest, watch, parallel } = require('gulp');

//* CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//* Imágenes
const cache = require('gulp-cache');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const imagemin = require('gulp-imagemin');

//* Javascript
const terser = require('gulp-terser-js');

// Compilar SASS a CSS
function css(done) {
  // Identificar archivo SASS
  src('src/scss/**/*.scss')
    // Librería para evitar la detención del watch en un error
    .pipe(sourcemaps.init())
    .pipe(plumber())
    // Compilar
    .pipe(sass())
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
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

// Función para ir trasportando código JS al build
function javascript(done) {
  src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));

  done();
}

// Monitor de cambios de CSS y ejecución de tareas
function dev(done) {
  watch('src/scss/**/*.scss', css);
  watch('src/js/**/*.js', javascript);

  done();
}

exports.css = css;
exports.js = javascript;
exports.webpConvert = webpConvert;
exports.avifConvert = avifConvert;
exports.jpgReduce = jpgReduce;

// Ejecutar en la consola como: npx gulp dev
exports.dev = parallel(css, jpgReduce, webpConvert, avifConvert, javascript, dev);