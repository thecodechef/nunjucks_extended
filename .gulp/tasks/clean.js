'use strict';

import gulp from 'gulp';
import paths from '../paths';
import del from 'del';

gulp.task('clean:prefs', function() {
  return del([`${paths.prefDest}/*.tmPreferences`]);
});

gulp.task('clean:snippets', function() {
  return del([`${paths.snippetDest}/*.sublime-snippet`]);
});

gulp.task('clean:syntax', function() {
  return del([`${paths.syntaxDest}/*.sublime-syntax`]);
});
