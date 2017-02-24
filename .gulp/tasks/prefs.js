'use-strict';

import gulp from 'gulp';
import paths from '../paths'
var $ = require('gulp-load-plugins')();

gulp.task('build:prefs', () => {
  return gulp.src([`${paths.prefSrc}/*.pug`])
    .pipe($.pug({pretty: true}))
    .pipe($.rename((file) => {
      file.basename = path.basename(file.basename, path.extname(file.extname));
      file.extname = '.tmPrefernces'
    }))
    .pipe(gulp.dest(paths.prefDest));
});
