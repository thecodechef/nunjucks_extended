'use-strict';

import gulp from 'gulp';
import gulpStats from 'gulp-stats';
import tasks from './.gulp/tasks';

gulpStats(gulp)

gulp.task('default', tasks);
