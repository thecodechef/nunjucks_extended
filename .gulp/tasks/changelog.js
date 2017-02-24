'use-strict';

import gulp from 'gulp';
import fs from 'fs';
import changelog from 'conventional-changelog';

gulp.task('changelog', () => {
  return changelog({
    preset: 'angular',
    releaseCount: 0
  })
    .pipe(fs.createWriteStream('CHANGELOG.md'));
});
