# gulp-kill-semicolon

```npm install gulp-kill-semicolon```

How often did this happen to you?
```javascript
var s = 'hello;'
```
Or this?
```javascript
var o = {
		h: 'world,'
	}
```
(*If you still didn't notice, then you might already have this problem somewhere else - it's either semicolon or colon accidentally included INSIDE the string - within the quotes!*)

Did you spend hours on searching for what was wrong with your code? No IDE showed you that there was something wrong..

Well, suffer no more, as here comes gulp-kill-semicolon.

Usage example:
```javascript
var gulp = require('gulp');
var killSemicolon = require('gulp-kill-semicolon').killSemicolon;

gulp.task('sem', function(){
	return gulp.src([
					'./*.js' //it's up to you to pick files you want to analyze
					 ])
			.pipe(killSemicolon());
});
```

**Please note that this plugin WILL NOT modify your files. It will ONLY log the warnings to your console**, indicating the lines of code in particular files that have either colon or semicolon at the end of the string declaration. Works with both single and double quotation.