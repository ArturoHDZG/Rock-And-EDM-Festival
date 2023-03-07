const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

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

// Monitor de cambios de CSS
function dev(done) {
  watch('src/scss/**/*.scss', css);

  done();
}

exports.css = css;
exports.dev = dev; // Ejecutar en la consola como: npx gulp dev