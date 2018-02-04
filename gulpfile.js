var gulp = require("gulp");

//ejs
var ejs = require("gulp-ejs");

//その他
var rename = require("gulp-rename");
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var browserSync = require("browser-sync");

var fs = require("fs");

/* ------------------------
ejs
------------------------ */
gulp.task("ejs", function() {
  console.log("---------- ejsをHTMLに変換 ----------");

  var result = JSON.parse(fs.readFileSync('./result.json'));

  return gulp.src("./index.ejs")
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(ejs({
    result: result
  }))
  .pipe(rename("index.html"))
  .pipe(gulp.dest("./"))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task("default",["ejs"]);