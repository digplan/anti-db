module.exports = function(periodical){

	if(!periodical){
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
	}
	var funcs = [], fs = require('fs');
	
	global._require = function (fn, isArray, safer){
	
		var ob = isArray ? [] : {};

	  	if(fs.existsSync(fn)){
	  		var s = fs.readFileSync(fn).toString();
	  		if(s != '') ob = JSON.parse(s);
	  	}

		funcs.push([fn, ob]);
		var fin = function(){
			funcs.map(function(arr){
					fs.writeFileSync(arr[0], JSON.stringify(arr[1], null, 4));
			})
			// This appears to ensure we see uncaught exception errors before exit
			if(!safer) setTimeout(process.exit, 0);
		}
	
		if(safer) setInterval(fin, safer);
	
		if(!periodical){
			process.on('SIGINT', fin);
			process.on('SIGTERM', fin);
			process.on('exit', fin);
		}
		return ob;
	}
}
