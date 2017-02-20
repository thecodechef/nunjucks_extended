import gulp from 'gulp';
import rename from 'gulp-rename';
import include from 'gulp-yaml-include';
import inject from 'gulp-inject-string';
import run from 'run-sequence';
import remove from 'gulp-remove-empty-lines';
import pug from 'gulp-pug';
import gulpStats from 'gulp-stats';
import path from 'path';
import bump from 'gulp-bump';
import releaser from 'conventional-github-releaser';
import changelog from 'conventional-changelog';
import git from 'gulp-git';
import yargs from 'yargs';
import del from 'del';
import _if from 'gulp-if';
import data from 'gulp-data';
import fs from 'fs';


const pkg = require('./package.json');
let argv = yargs.argv;

let njkSyntaxHeader = [
  '#',
  `# Project: ${pkg.projectName}`,
  `# Version: ${pkg.version}`,
  `# Author: ${pkg.author.name}`,
  `# Date: ${new Date().toDateString()}`,
  '#\n',
];

const paths = {
  'syntaxSrc': './src/syntaxes',
  'prefSrc': './src/prefs',
  'schemeSrc': './src/schemes',
  'snippetSrc': './src/snippets',
  'syntaxDest': './Syntaxes',
  'prefDest': './Preferences',
  'schemeDest': './Schemes',
  'snippetDest': './Snippets',
};

gulpStats(gulp);

gulp.task('bump', () => {
  return gulp.src(['./package.json'])
    .pipe(_if((Object.keys(argv).length === 2), bump()))
    .pipe(_if(argv.patch, bump()))
    .pipe(_if(argv.minor, bump({ type: 'minor' })))
    .pipe(_if(argv.major, bump({ type: 'major' })))
    .pipe(gulp.dest('./'));
});

gulp.task('changelog', () => {
  return changelog({
    preset: 'angular',
    releaseCount: 0
  })
    .pipe(fs.createWriteStream('CHANGELOG.md'));
});

gulp.task('inject:message', () => {
  let pkgVersion = require('./package.json').version;
  return gulp.src('./messages.json')
    .pipe(inject.after('{\n  "install": "messages/thanks.txt"',`,\n  "${pkg.version}": "messages/${pkg.version}.txt"`))
    .pipe(gulp.dest('./'));
});

gulp.task('git:tag', (done) => {
  let pkgVersion = require('./package.json').version;
  git.tag(`v${pkg.version}`, '', (err) => {
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

gulp.task('syntax:njk', () => {
  return gulp.src([`${paths.syntaxSrc}/base.yaml`])
    .pipe(include())
    .pipe(rename({basename: 'Nunjucks', extname: '.sublime-syntax'}))
    .pipe(gulp.dest(paths.syntaxDest))
    .pipe(remove())
    .pipe(inject.prepend('%YAML 1.2\n---\n'))
    .pipe(inject.before('  html:','\n# Html\n\n'))
    .pipe(inject.before('  tag-stuff:','\n# Tag Stuff\n\n'))
    .pipe(inject.before('  id-attr:','\n# Id Attribute\n\n'))
    .pipe(inject.before('  class-attr:','\n# Class Attribute\n\n'))
    .pipe(inject.before('  style-attr:','\n# Style Attribute\n\n'))
    .pipe(inject.before('  event-attr:','\n# Event Attribute\n\n'))
    .pipe(inject.before('  generic-attr:','\n# Generic Attribute\n\n'))
    .pipe(inject.before('  double-quoted:','\n# Double Quoted String\n\n'))
    .pipe(inject.before('  single-quoted:','\n# Single Quoted String\n\n'))
    .pipe(inject.before('  embedded:','\n# Embedded Code\n\n'))
    .pipe(inject.before('  php:','\n# Php\n\n'))
    .pipe(inject.before('  python:','\n# Python\n\n'))
    .pipe(inject.before('  ruby:','\n# Ruby\n\n'))
    .pipe(inject.before('  entities:','\n# Entities\n\n'))
    .pipe(inject.before('  njk:','\n# Nunjucks\n\n'))
    .pipe(inject.before('  comments:','\n# Nunjucks Comments\n\n'))
    .pipe(inject.before('  blocks:','\n# Nunjucks Blocks\n\n'))
    .pipe(inject.before('  braces:','\n# Nunjucks Braces\n\n'))
    .pipe(inject.before('  arrays:','\n# Nunjucks Arrays\n\n'))
    .pipe(inject.before('  constants:','\n# Nunjucks Constants\n\n'))
    .pipe(inject.before('  filters:','\n# Nunjucks Filters\n\n'))
    .pipe(inject.before('  functions:','\n# Nunjucks Functions\n\n'))
    .pipe(inject.before('  hashes:','\n# Nunjucks Hashes\n\n'))
    .pipe(inject.before('  keywords:','\n# Nunjucks Keywords\n\n'))
    .pipe(inject.before('  macros:','\n# Nunjucks Macros\n\n'))
    .pipe(inject.before('  objects:','\n# Nunjucks Objects\n\n'))
    .pipe(inject.before('  operators:','\n# Nunjucks Operators\n\n'))
    .pipe(inject.before('  properties:','\n# Nunjucks Properties\n\n'))
    .pipe(inject.before('  strings:','\n# Nunjucks Strings\n\n'))
    .pipe(gulp.dest(paths.syntaxDest))
})

gulp.task('syntax:html', () => {
  return gulp.src([`${paths.syntaxSrc}/base-alt.yaml`])
    .pipe(rename({basename: 'HTML (Nunjucks)', extname: '.sublime-syntax'}))
    .pipe(remove())
    .pipe(gulp.dest(paths.syntaxDest))
})

gulp.task('build:prefs', () => {
  return gulp.src([`${paths.prefSrc}/*.pug`])
    .pipe(pug({pretty: true}))
    .pipe(rename((file) => {
      file.basename = path.basename(file.basename, path.extname(file.extname));
      file.extname = '.tmPrefernces'
    }))
    .pipe(gulp.dest(paths.prefDest));
});

gulp.task('build:snippets', () => {
  return gulp.src([`${paths.snippetSrc}/*.pug`])
    .pipe(pug({pretty: true}))
    .pipe(rename((file) => {
      file.basename = path.basename(file.basename, path.extname(file.extname));
      file.extname = '.sublime-snippet'
    }))
    .pipe(gulp.dest(paths.snippetDest));
});


gulp.task('build:syntax', () => {
  run( 'syntax:njk','syntax:html' )
})

gulp.task('build', () => {
  run('build:syntax','build:prefs','build:snippets')
});

gulp.task('release', () => {
  run('changelog','git:tag','inject:message', 'github-release')
});

gulp.task('watch', () => {
  gulp.watch(`${paths.prefSrc}/*.pug`, ['build:prefs'])
  gulp.watch(`${paths.snippetSrc}/*.pug`, ['build:snippets'])
  gulp.watch(`${paths.syntaxSrc}/**/*.yaml`, ['build:syntax'])
  gulp.watch("gulpfile.babel.js").on("change", () => process.exit(0));
});

gulp.task('default',['build'], () => {});
