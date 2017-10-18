"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var debug = require("gulp-debug");
var gulpIf = require("gulp-if");
var del = require("del");
var newer = require("gulp-newer");
var autoprefixer = require("gulp-autoprefixer");
var postcss = require("gulp-postcss");
var mqpacker = require("css-mqpacker");
var browserSync = require("browser-sync").create();
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var jsmin = require("gulp-jsmin");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");

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
    .pipe(postcss([
      mqpacker({
        sort: true
      })
    ]))
    .pipe(autoprefixer())
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("jsmin", function() {
  return gulp.src("src/js/*.js")
    .pipe(jsmin())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "src/**fonts/**/*.{woff,woff2}",
    "src/**js/libs/*.js",
    "src/**img/**/*.*",
    "src/*.html"
  ], {since: gulp.lastRun("copy")})
    .pipe(newer("build"))
    .pipe(debug({title: "copy"}))
    .pipe(gulp.dest("build"));
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.*")
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
       ]
      })
    ]))
    .pipe(debug({title: "imagemin"}))
    .pipe(gulp.dest('build/img'));
});

gulp.task("symbols", function() {
  return gulp.src("build/img/icons-sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img/icons-sprite"));
});

gulp.task("build", gulp.series(
  "clean",
  gulp.parallel("style", "copy", "jsmin"),
  "images", "symbols")
);

gulp.task("watch", function() {
  gulp.watch("src/sass/**/*.*", gulp.series("style"));
  gulp.watch([
    "src/**fonts/**/*.{woff,woff2}",
    "src/**img/**",
    "src/**js/**",
    "src/*.html"
  ], gulp.series("copy"));
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
