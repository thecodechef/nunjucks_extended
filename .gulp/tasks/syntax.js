'use-strict';

import gulp from 'gulp';
import paths from '../paths';
var $ = require('gulp-load-plugins')({rename: {
  'gulp-inject-string': 'inject',
  'gulp-remove-empty-lines': 'remove',
  'gulp-yaml-include': 'include'
}});

gulp.task('syntax:njk', () => {
  return gulp.src([`${paths.syntaxSrc}/base.yaml`])
    .pipe($.include())
    .pipe($.rename({basename: 'Nunjucks', extname: '.sublime-syntax'}))
    .pipe(gulp.dest(paths.syntaxDest))
    .pipe($.remove())
    .pipe($.inject.prepend('%YAML 1.2\n---\n'))
    .pipe($.inject.before('  html:','\n# Html\n\n'))
    .pipe($.inject.before('  tag-stuff:','\n# Tag Stuff\n\n'))
    .pipe($.inject.before('  id-attr:','\n# Id Attribute\n\n'))
    .pipe($.inject.before('  class-attr:','\n# Class Attribute\n\n'))
    .pipe($.inject.before('  style-attr:','\n# Style Attribute\n\n'))
    .pipe($.inject.before('  event-attr:','\n# Event Attribute\n\n'))
    .pipe($.inject.before('  generic-attr:','\n# Generic Attribute\n\n'))
    .pipe($.inject.before('  double-quoted:','\n# Double Quoted String\n\n'))
    .pipe($.inject.before('  single-quoted:','\n# Single Quoted String\n\n'))
    .pipe($.inject.before('  embedded:','\n# Embedded Code\n\n'))
    .pipe($.inject.before('  php:','\n# Php\n\n'))
    .pipe($.inject.before('  python:','\n# Python\n\n'))
    .pipe($.inject.before('  ruby:','\n# Ruby\n\n'))
    .pipe($.inject.before('  entities:','\n# Entities\n\n'))
    .pipe($.inject.before('  njk:','\n# Nunjucks\n\n'))
    .pipe($.inject.before('  comments:','\n# Nunjucks Comments\n\n'))
    .pipe($.inject.before('  blocks:','\n# Nunjucks Blocks\n\n'))
    .pipe($.inject.before('  braces:','\n# Nunjucks Braces\n\n'))
    .pipe($.inject.before('  arrays:','\n# Nunjucks Arrays\n\n'))
    .pipe($.inject.before('  constants:','\n# Nunjucks Constants\n\n'))
    .pipe($.inject.before('  filters:','\n# Nunjucks Filters\n\n'))
    .pipe($.inject.before('  functions:','\n# Nunjucks Functions\n\n'))
    .pipe($.inject.before('  hashes:','\n# Nunjucks Hashes\n\n'))
    .pipe($.inject.before('  keywords:','\n# Nunjucks Keywords\n\n'))
    .pipe($.inject.before('  macros:','\n# Nunjucks Macros\n\n'))
    .pipe($.inject.before('  objects:','\n# Nunjucks Objects\n\n'))
    .pipe($.inject.before('  operators:','\n# Nunjucks Operators\n\n'))
    .pipe($.inject.before('  properties:','\n# Nunjucks Properties\n\n'))
    .pipe($.inject.before('  strings:','\n# Nunjucks Strings\n\n'))
    .pipe(gulp.dest(paths.syntaxDest))
})

gulp.task('syntax:html', () => {
  return gulp.src([`${paths.syntaxSrc}/base-alt.yaml`])
    .pipe($.rename({basename: 'HTML (Nunjucks)', extname: '.sublime-syntax'}))
    .pipe($.remove())
    .pipe(gulp.dest(paths.syntaxDest))
})
