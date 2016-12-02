const gulp = require('gulp');
const useref = require('gulp-useref');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject');
const debug = require('gulp-debug');
const filter = require('gulp-filter');

const jsFilter = filter('**/*.js', {restore: true});


gulp.task('default', build);

function build() {

  return gulp.src('index.html')
    .pipe(useref()) // adds streams for referenced files in .tmp/index.html
    .pipe(debug({title: 'after useref'}))

    .pipe(jsFilter) // filter down to just javascript files
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rev()) // add a revision hash to the filename
    .pipe(sourcemaps.write('maps')) // write out the sourcemap
    .pipe(jsFilter.restore) // restore to full stream
    .pipe(debug({title: 'after jsFilter'}))

    .pipe(revReplace()) // replace files in index.html with single link to uglified

    .pipe(gulp.dest('dist'));
}
