module.exports = function(debug){
	/*
		Win32 SIGINT assistance
		http://stackoverflow.com/a/14861513/1308338
	*/
	var readLine = require ("readline");
	if (process.platform === "win32"){
	    var rl = readLine.createInterface({
	        input: process.stdin,
	        output: process.stdout
	    });
	    rl.on ("SIGINT", function (){
	        process.emit("SIGINT");
	        process.exit(1);
	    });
	}
	
	var funcs = [], fs = require('fs');
	
	global._require = function (fn, isArray, safer){
	
	  	var ob = fs.existsSync(fn) ? JSON.parse(fs.readFileSync(fn).toString()) : (isArray ? [] : {});

		funcs.push([fn, ob]);
		var fin = function(){
			funcs.map(function(arr){
					fs.writeFileSync(arr[0], JSON.stringify(arr[1], null, 4));
			})
			process.exit(1);
		}
	
		if(safer) setInterval(fin, safer);
	
		process.on('SIGINT', fin);
		process.on('exit', fin);
	
		return ob;
	}
}
