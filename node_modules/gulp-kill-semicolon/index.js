var through = require('through2');
var gutil = require('gulp-util');
var colors = require('colors');

//this is for testing purposes
var violatedLines;

function report(i, line){
	console.log("line "+i+": "+line.yellow);
	violatedLines++;
}

function findIt(file){
	var cont = file.contents.toString();
	var lines = cont.split('\n');
	var filePath = file.path;

	var found = false;
	for(var i = 0; i<lines.length; i++){
		if(lines[i].match(/.+?(?=(;|,)('|"))/)) {
			found = true;
			report(i+1, lines[i]);
		}
	}
	if(found){
		console.log("in file: ".cyan+filePath);
		console.log(" ");
	}
}

function killSemicolon(){
	violatedLines = 0;
	var stream = through.obj(function(file, enc, cb){
		findIt(file);
		this.push(file);
		cb();
	});

	return stream;
}

module.exports = {
		killSemicolon: killSemicolon,
		violatedLinesCount: function(){
			return violatedLines;
		}
	};