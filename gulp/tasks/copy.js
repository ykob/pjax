const gulp = require('gulp');

const conf = require('../conf').copy;

gulp.task('copyToDest', () => {
  return gulp.src(conf.dest.src, conf.dest.opts)
    .pipe(gulp.dest(conf.dest.dest));
});

gulp.task('copyToBuild', () => {
  const dest = (require('yargs').argv.format === 'cms') ? conf.build.dest.cms : conf.build.dest.static;
  return gulp.src(conf.build.src, conf.build.opts)
    .pipe(gulp.dest(dest));
});

gulp.task('copyPhpToBuild', () => {
  const dest = (require('yargs').argv.format === 'cms') ? conf.php.dest.cms : conf.php.dest.static;
  return gulp.src(conf.php.src, conf.php.opts)
    .pipe(gulp.dest(dest));
});

gulp.task('copyCmsToBuild', () => {
  return gulp.src(conf.cms.src, conf.cms.opts)
    .pipe(gulp.dest(conf.cms.dest));
});
