'use-strict';

import gulp from 'gulp';
import fs from 'fs';

let $ = require('gulp-load-plugins')({
  rename: {'gulp-conventional-chanelog':'changelog'}
})

gulp.task('changelog', () => {
  return $.changelog({
    preset: 'angular',
    releaseCount: 0
  })
    .pipe(fs.createWriteStream('CHANGELOG.md'));
});
