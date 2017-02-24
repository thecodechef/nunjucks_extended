'use-strict';

import gulp from 'gulp';
import paths from '../paths';
var $ = require('gulp-load-plugins')();

gulp.task('build:snippets', () => {
  return gulp.src([`${paths.snippetSrc}/*.pug`])
    .pipe($.pug({pretty: true}))
    .pipe($.rename((file) => {
      file.basename = path.basename(file.basename, path.extname(file.extname));
      file.extname = '.sublime-snippet'
    }))
    .pipe(gulp.dest(paths.snippetDest));
});
