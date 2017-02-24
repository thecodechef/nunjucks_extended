'use-strict'

import gulp from 'gulp';
import git from 'gulp-git';
import run from 'run-sequence';
import fs from 'fs';
import releaser from 'conventional-github-releaser';
var $ = require('gulp-load-plugins')({rename: {'gulp-inject-string': 'inject'}});

gulp.task('inject:message', () => {
  let pkgVersion = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  return gulp.src('./messages.json')
    .pipe($.inject.after('{\n  "install": "messages/thanks.txt"',`,\n  "${pkgVersion}": "messages/${pkgVersion}.txt"`))
    .pipe(gulp.dest('./'));
});

gulp.task('git:tag', (done) => {
  let pkgVersion = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  git.tag(`v${pkgVersion}`, '', (err) => {
    if (err) throw err;
  }, done);
});

gulp.task('github-release', (done) => {
  releaser({
    type: 'oauth',
    token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
  }, {
    preset: 'angular'
  }, done);
});

gulp.task('release', () => {
  run('bump','changelog','git:tag','inject:message', 'github-release')
});
