// Gulp.js configuration
var gulp = require('gulp'),
	del = require('del'),
	concat = require('gulp-concat'),
	newer = require('gulp-newer'),
	connect = require('gulp-connect'),

	purify = require('gulp-purifycss'),
	imagemin = require('gulp-imagemin'),
	minify = require('gulp-minify'),

	htmlmin = require('gulp-htmlmin'),
	htmlreplace = require('gulp-html-replace');

gulp.task('images', function() {
	var out = 'build/img/';
	return gulp.src('src/img/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});

gulp.task('css-purify', () => {
	var out = 'build/css/';
	return gulp.src('src/css/*.css')
    .pipe(newer(out))
    .pipe(purify([
    	'src/js/modules/*.js',
    	'src/js/plugins/*.js',
    	'src/templates/*.html',
    	'src/index.html'
    ], {
		minify: true,
		rejected: false,
		info: true,
		whitelist: ['bg-white']
	}))
  .pipe(gulp.dest(out));
});

gulp.task('css', gulp.series('css-purify', (done) => {
	var files = ['build/css/now-ui-dashboard.css', 'build/css/default.css'],
		out = 'build/css/';

	gulp.src(files)
  	.pipe(concat('main.css'))
  	.pipe(gulp.dest(out))
  	.on('end', () => {
  		del(files).then(() => {
  			done();
  		});
  	});
}));

gulp.task('js-modules', (done) => {
	var files = ['src/js/modules/*'],
		out = 'build/js/modules/';

	gulp.src(files)
		.pipe(newer(out))
		.pipe(concat('app.js'))
		.pipe(minify())
		.pipe(gulp.dest(out))
		.on('end', () => {
			del('build/js/modules/app.js').then(() => {
				done();
			});
		});
});

gulp.task('templates', function() {
	let out = 'build/templates/';
  return gulp.src('src/templates/**')
  	.pipe(newer(out))
    .pipe(htmlmin({
    	collapseWhitespace: true,
    	maxLineLength: 150,
    	removeComments: true,
    	removeEmptyAttributes: true,
    	removeRedundantAttributes: true,
		ignoreCustomFragments: [ /\{\{[\s\S]*?\}\}/ ]
    }))
    .pipe(gulp.dest(out));
});

gulp.task('connect', function() {
  	connect.server({
	    root: 'build/',
	    livereload: true
	});
});

gulp.task('copy', gulp.series('images', 'css', 'js-modules', 'templates', (done) => {
	var files = ['src/**/*', '!src/img/**', '!src/css/**', '!src/js/modules/**', '!src/templates/**', '!src/index.html'];

	gulp.src('src/index.html')
		.pipe(newer('build/'))
    .pipe(htmlreplace({
      'css': 'css/main.css',
      'js': 'js/modules/app-min.js'
    }))
    .pipe(htmlmin({
    	collapseWhitespace: true,
    	maxLineLength: 150,
    	removeComments: true,
    	removeEmptyAttributes: true,
    	removeRedundantAttributes: true,
		ignoreCustomFragments: [ /\{\{[\s\S]*?\}\}/ ]
    }))
  	.pipe(gulp.dest('build/'))
  	.on('end', () => {
			gulp.src(files)
				.pipe(newer('build/'))
				.pipe(gulp.dest('build/'))
				.pipe(connect.reload());
			done();
  	});
}));

gulp.task('default', gulp.parallel('copy', 'connect'));
