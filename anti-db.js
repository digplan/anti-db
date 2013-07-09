module.exports = function(){
	
	var funcs = [], fs = require('fs');
	
	global._require = function (fn, isArray, safer){
	
	  var ob = fs.existsSync(fn) ? JSON.parse(fs.readFileSync(fn).toString()) : (isArray ? [] : {});
		funcs.push([fn, ob]);
		var fin = function(){
			funcs.map(function(arr){ fs.writeFileSync(arr[0], JSON.stringify(arr[1], null, 4)) });
		}
	
		if(safer) setInterval(fin, safer);
	
		process.on('SIGINT', fin);
		process.on('exit', fin);
	
		return ob;
	}
}
