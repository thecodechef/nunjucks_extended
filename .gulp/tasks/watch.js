'use-strict';

import gulp from 'gulp';
import paths from '../paths';

gulp.task('watch', () => {
  gulp.watch(`${paths.prefSrc}/*.pug`, ['build:prefs'])
  gulp.watch(`${paths.snippetSrc}/*.pug`, ['build:snippets'])
  gulp.watch(`${paths.syntaxSrc}/**/*.yaml`, ['build:syntax'])
  gulp.watch("gulpfile.babel.js").on("change", () => process.exit(0));
});
