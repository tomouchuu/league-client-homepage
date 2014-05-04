/* Test gulpfile */
'use strict';

/* Load Gulp Taks */
var gulp = require('gulp');
var clean = require('gulp-clean');
var rimraf = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var coffeelint = require('gulp-coffeelint');
var less = require('gulp-less');
var recess = require('gulp-recess');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');
var browserSync = require('browser-sync');

/* Clean our Files */
gulp.task('wipeAssets', function () {
	return gulp.src([
			'/assets'
		])
		.pipe(rimraf());
});

/* Move our HTML to the root of the project */
gulp.task('html', function () {
	gulp.src('src/*.html')
		.pipe(gulp.dest('./'));
});

/* Copy our Files */
gulp.task('images', function () {
	/* Clean Images from Assets */
	gulp.src([
			'/assets/img/**'
		])
		.pipe(clean());

	/* Move Images to Assets */
	gulp.src([
			'src/img/**'
		])
		.pipe(gulp.dest('assets/img'));
});

/* Tasks for Scripts */
gulp.task('scripts', function () {
	/* JSHint the Scripts */
	gulp.src(['src/js/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('src/compiled/js/'));

	/* CoffeeLint Coffeescripts */
	gulp.src(['src/coffee/**/*.coffee'])
		.pipe(coffeelint())
		.pipe(coffeelint.reporter())
		.pipe(coffee({bare: true}).on('error', console.log))
		.pipe(gulp.dest('src/compiled/js/'));

	/* Move Vendor Files to Compiled */
	gulp.src([
			'src/vendor/jquery/jquery.js',
			'src/vendor/angular/angular.js',
			'src/vendor/reddit.js/reddit.js',
			'src/vendor/bootstrap/assets/js/html5shiv.js',
			'src/vendor/bootstrap/assets/js/respond.min.js'
		])
		.pipe(gulp.dest('src/compiled/js'));


	/* Concat BootstrapJS Files */
	gulp.src([
			'src/vendor/bootstrap/js/transition.js',
			'src/vendor/bootstrap/js/alert.js',
			'src/vendor/bootstrap/js/button.js',
			'src/vendor/bootstrap/js/carousel.js',
			'src/vendor/bootstrap/js/collapse.js',
			'src/vendor/bootstrap/js/dropdown.js',
			'src/vendor/bootstrap/js/modal.js',
			'src/vendor/bootstrap/js/tooltip.js',
			'src/vendor/bootstrap/js/popover.js',
			'src/vendor/bootstrap/js/scrollspy.js',
			'src/vendor/bootstrap/js/tab.js',
			'src/vendor/bootstrap/js/affix.js'
		])
		.pipe(concat('bootstrap.js'))
		.pipe(gulp.dest('src/compiled/js'));

	/* Concat all JS Files and move to Assets */
	gulp.src([
			'src/compiled/js/jquery.js',
			'src/compiled/js/angular.js',
			'src/compiled/js/bootstrap.js',
			'src/compiled/js/reddit.js',
			'src/compiled/js/config.js',
			'src/compiled/js/summonerctrl.js',
			'src/compiled/js/redditctrl.js'
		])
		.pipe(concat('combined.js'))
		.pipe(gulp.dest('assets/js'));

	/* Move our IE Compat Scripts */
	gulp.src([
			'src/compiled/js/boxsizing.htc',
			'src/compiled/js/html5shiv.js',
			'src/compiled/js/respond.min.js'
		])
		.pipe(gulp.dest('assets/js'));
});

/* Tasks for our Styles */
gulp.task('styles', function () {
	/* Compile the Bootstrap Less */
	gulp.src('src/vendor/bootstrap/less/bootstrap.less')
		.pipe(less())
		.pipe(gulp.dest('src/compiled/css'));

	/* Compile our Less */
	gulp.src('src/less/site.less')
		.pipe(recess())
		.pipe(less())
		.pipe(gulp.dest('src/compiled/css'));

	/* Concat all CSS Files and move to Assets */
	gulp.src([
			'src/compiled/css/bootstrap.css',
			'src/compiled/css/site.css',
		])
		.pipe(concat('combined.css'))
		.pipe(gulp.dest('assets/css'));

	/* Move our IE Compat Bootstrap Style */
	gulp.src('src/compiled/css/bootstrap-ie7.css')
		.pipe(gulp.dest('assets/css'));
});

gulp.task('browser-sync', function () {
  browserSync.init([
		'assets/css/*.css',
		'assets/js/*.js',
		'*.html'
	], {
		server: {
      baseDir: './'
		}
  });
});

/* The Default Build Task */
gulp.task('default', function () {
	gulp.run('wipeAssets', 'html', 'images', 'scripts', 'styles');
});

/* The Watch Task */
gulp.task('watch', ['html', 'images', 'scripts', 'styles', 'browser-sync'], function () {
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/img/**', ['images']);
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/less/*.less', ['styles']);
});

/* Wipes the /dist directory */
gulp.task('wipeDist', function () {
	gulp.src('./dist')
		.pipe(rimraf());
});

/* Builds the site to the /dist directory */
gulp.task('build', ['wipeDist'], function () {
	/* Move our HTML */
	gulp.src('./*.html')
		.pipe(gulp.dest('dist'));
  
    /* Move .htaccess */
    gulp.src('./.htaccess')
		.pipe(gulp.dest('dist'));

	/* Move our IMG */
	gulp.src([
			'src/img/**'
		])
		.pipe(gulp.dest('dist/assets/img'));

	/* Uglify our JS */
	return gulp.src('assets/js/*.js')
		.pipe(gulp.dest('dist/assets/js/'));

	/* UnCSS & Minify our CSS */
	gulp.src([
			'assets/css/combined.css'
		])
		.pipe(uncss({
			html: [
				'index.html'
			]
		}))
		.pipe(csso())
		.pipe(gulp.dest('dist/assets/css'));
});
