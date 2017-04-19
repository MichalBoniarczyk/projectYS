var should = require('should');
var kS = require('../');
var gulp = require('gulp');
var path = require('path');

var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); }

describe('gulp-kill-semicolon', function(){
	it('should find four violated lines in single-quoted string', function(done){
		gulp.src(fixtures('singleQuotes.js'))
			.pipe(kS.killSemicolon())
			.on('finish', function(){
				var violations = kS.violatedLinesCount();
				violations.should.equal(4);
				done();
			});
	});

	it('should find four violated lines in double-quoted string', function(done){
		gulp.src(fixtures('doubleQuotes.js'))
			.pipe(kS.killSemicolon())
			.on('finish', function(){
				var violations = kS.violatedLinesCount();
				violations.should.equal(4);
				done();
			});
	});
});