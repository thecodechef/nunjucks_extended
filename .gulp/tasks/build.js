'use-strict';

import gulp from 'gulp';
import run from 'run-sequence';

gulp.task('build:syntax', () => {
  run( 'syntax:njk','syntax:html' )
})

gulp.task('build', () => {
  run('build:syntax','build:prefs','build:snippets')
});
