import gulp from 'gulp';
import yargs from 'yargs';

let argv = yargs.argv;
var $ = require('gulp-load-plugins')();


gulp.task('bump', () => {
  return gulp.src(['./package.json'])
    .pipe($.if((Object.keys(argv).length === 2), $.bump()))
    .pipe($.if(argv.patch, $.bump()))
    .pipe($.if(argv.minor, $.bump({ type: 'minor' })))
    .pipe($.if(argv.major, $.bump({ type: 'major' })))
    .pipe(gulp.dest('./'));
});
