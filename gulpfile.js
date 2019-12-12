var gulp = require('gulp');
var load = require('gulp-load-plugins')();
var browser = require('browser-sync').create();


gulp.task('sass',function(done){
	gulp.src('./scss/*.scss')
	.pipe(load.sass())
	.pipe(gulp.dest('./css/css/'))
	done()
})


gulp.task('html',function(done){
	gulp.src('./scss/*.html')
	.pipe(load.minifyHtml())
	.pipe(gulp.dest("./css/"))
	done()
})


gulp.task('server',gulp.series(gulp.parallel('html','sass'),function(done){

	browser.init({
		server:'./css/',
		port:80
	})

	gulp.watch('./scss/',gulp.series(gulp.parallel('html','sass'),function(done){
		browser.reload()
		done()
	}))
	
	done()
}))
