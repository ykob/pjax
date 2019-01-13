const gulp = require('gulp');

const $ = require('../plugins');
const conf = require('../conf').cleanCss;

gulp.task('cleanCss', () => {
  const format = require('yargs').argv.format;
  const dest = (format === 'cms') ? conf.dest.cms : conf.dest.static;
  const rename = (format === 'cms')
    ? { basename: 'style' }
    : { suffix: '.min' };
  if (format === 'cms') {
    const reg = new RegExp(/(url)(\(\"|\(\'|\()(?!.*http)(.*?)(img|font)(.*?)(\"\)|\'\)|\))/g);
    return gulp.src(conf.src)
      .pipe($.replace(reg, '$1$2./assets/$4$5$6'))
      .pipe($.cleanCss())
      .pipe($.rename(rename))
      .pipe(gulp.dest(dest));
  } else {
    return gulp.src(conf.src)
      .pipe($.cleanCss())
      .pipe($.rename(rename))
      .pipe(gulp.dest(dest));
  }
});
