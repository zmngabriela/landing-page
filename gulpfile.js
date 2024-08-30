import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin'
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin'
import replace from 'gulp-replace'

async function htmlMin() {
  return gulp.src('src/*.html')
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  }))
  .pipe(replace('href="./main.css"', 'href="./styles/main.css"'))
  .pipe(gulp.dest('dist/'))
}

async function cssMin() {
  return gulp.src('src/main.css')
  .pipe(replace('./assets/services/roof-renovation.jpeg', '../assets/services/roof-renovation.jpeg'))
  .pipe(replace('./assets/services/renovation.jpeg', '../assets/services/renovation.jpeg'))
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('dist/styles'));
}

async function imageMin() {
  return gulp.src('src/assets/**/*', {encoding: false})
  .pipe(imagemin())
  .pipe(gulp.dest('dist/assets'))
}

export default gulp.series(htmlMin, cssMin, imageMin)
