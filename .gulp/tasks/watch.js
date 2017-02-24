'use-strict';

import gulp from 'gulp';
import paths from '../paths';

gulp.task('watch', () => {
  gulp.watch(`${paths.prefSrc}/*.pug`, ['clean:prefs','build:prefs'])
  gulp.watch(`${paths.snippetSrc}/*.pug`, ['clean:snippets','build:snippets'])
  gulp.watch(`${paths.syntaxSrc}/**/*.yaml`, ['clean:syntax','build:syntax'])
  gulp.watch("gulpfile.babel.js").on("change", () => process.exit(0));
});
