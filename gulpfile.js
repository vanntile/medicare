// Gulp.js configuration
var gulp = require('gulp'),
	del = require('del'),
	newer = require('gulp-newer'),
	purify = require('gulp-purifycss'),
	cleanCSS = require('gulp-clean-css'),
	//sourcemaps = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin'),
	htmlclean = require('gulp-htmlclean'),
	concat = require('gulp-concat'),
	deporder = require('gulp-deporder'),
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),

	folder = {
		src: 'src/',
		build: 'build/'
	};

gulp.task('images', function() {
  	var out = folder.build + 'img/';
  	return gulp.src(folder.src + 'img/**/*')
	    .pipe(newer(out))
	    .pipe(imagemin({ optimizationLevel: 5 }))
	    .pipe(gulp.dest(out));
});

gulp.task('html-templates', function() {
	var out = folder.build + 'templates/';
    return gulp.src(folder.src + 'templates/*')
      	.pipe(newer(out))
		.pipe(htmlclean())
		.pipe(gulp.dest(out));
});

gulp.task('js', function() {
	return gulp.src(folder.src + 'js/**/*')
    	.pipe(deporder())
    	.pipe(concat('main.js'))
		.pipe(stripdebug())
      	.pipe(uglify())
      	.pipe(gulp.dest(folder.build + 'js/'));
});

gulp.task('css', function() {
  	return gulp.src(folder.src + 'css/**/*')
	    .pipe(purify([folder.src + 'js/**/*', folder.src + 'html/**/*']))
		.pipe(cleanCSS())
		//.pipe(sourcemaps.write())
	    .pipe(gulp.dest(folder.build + 'css/'));
});

/*
gulp.task('webserver', function() {
  gulp.src(folder.build)
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
*/
