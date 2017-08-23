const gulp = require('gulp');

const $ = require('../plugins');
const conf = require('../conf').replace;

gulp.task('replaceHtml', () => {
  return gulp.src(conf.html.src)
    .pipe($.replace(/(src="\/pjax\/js\/)([a-z0-9_\.\-]*)(\.js")/g, '$1$2.min$3'))
    .pipe($.replace(/(href="\/pjax\/css\/)([a-z0-9_\.\-]*)(\.css")/g, '$1$2.min$3'))
    .pipe(gulp.dest(conf.html.dest));
});
