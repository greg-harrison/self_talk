var gulp = require('gulp');
var runsync = require('run-sequence');
var requireDir = require('require-dir');
var watch = require('gulp-watch');
var Server = require('karma').Server;

gulp.task('src/test', function(done){
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() { done; }).start();
});

requireDir('./gulp', {
  recurse: true
});

gulp.task('test', function() {
  runsync('src/clean',
          'src/minify-html',
          'src/minify-partials',
          'src/styles',
          'src/scripts',
          'src/test');
});

gulp.task('default', function() {
  runsync('src/clean',
          'src/minify-html',
          'src/minify-partials',
          'src/styles',
          'src/scripts');
});


gulp.task('watch', function() {
  watch(['src/scss/*.scss', 'src/features/**/scss/*.scss'], function() {
    runsync('src/styles');
  });

  watch('src/features/**/*.html', function() {
    runsync('src/minify-partials', 'src/scripts');
  });

  watch('src/views/*.html', function() {
    runsync('src/minify-html');
  });

  watch(['src/*.js', 'src/features/**/*.js'], function() {
    runsync('src/scripts');
  });
});
