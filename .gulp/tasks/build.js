'use-strict';

import gulp from 'gulp';
import run from 'run-sequence';

gulp.task('clean',() => {
  run('clean:syntax','clean:prefs','clean:snippets')
});

gulp.task('build:syntax', () => {
  run( 'syntax:njk','syntax:html' )
})

gulp.task('build',['clean'], () => {
  run('build:syntax','build:prefs','build:snippets')
});
