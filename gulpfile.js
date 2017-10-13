"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var debug = require("gulp-debug");
var gulpIf = require("gulp-if");
var del = require("del");
var newer = require("gulp-newer");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

gulp.task("style", function() {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: "Style",
          message: err.message
        };
      })
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest("build/css"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src("src/**{img/**/*.*,js/**/*.*,fonts/**/*.*,*.html}", {since: gulp.lastRun("copy")})
    .pipe(newer("build"))
    .pipe(debug({title: "copy"}))
    .pipe(gulp.dest("build"));
});

gulp.task("build", gulp.series(
  "clean",
  gulp.parallel("style", "copy"))
);

gulp.task("watch", function() {
  gulp.watch("src/sass/**/*.*", gulp.series("style"));
  gulp.watch("src/**{img/**/*.*,js/**/*.*,fonts/**/*.*,*.html}", gulp.series("copy"));
});

gulp.task("serve", function() {
  browserSync.init({
    server: "build"
  });
  browserSync.watch("build/**/*.*").on("change", browserSync.reload);
});

gulp.task("dev",
    gulp.series("build", gulp.parallel("watch", "serve"))
);
