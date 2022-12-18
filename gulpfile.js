const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
  // Identificar archivo SASS
  src("src/scss/app.scss")
    // Compilar
    .pipe(sass())
    // Almacenar
    .pipe(dest("build/css"));

  done(); // Callback que avisa a Gulp que hemos terminado
}

exports.css = css;