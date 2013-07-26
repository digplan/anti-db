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

	global._require = function (fn, isArray, safer){
		var ob = isArray ? [] : {};
	  	if(fs.existsSync(fn)){
	  		var s = fs.readFileSync(fn).toString();
	  		if(s != '') ob = JSON.parse(s);
	  	}
		funcs.push([fn, ob]);
		if(safer) setInterval(save, safer);
		return ob;
	}

	var funcs = [], fs = require('fs');
	var save = function(){
			funcs.map(function(arr){
					fs.writeFileSync(arr[0], JSON.stringify(arr[1], null, 4));
			})
	}
	var fin = function(){
			if(finalized) return;
			if(process.env.debug) console.log('anti-db finishing');
			finalized = true;
			// This appears to ensure we see uncaught exception errors before exit
			setTimeout(process.exit, 0);
	}

	var finalized = false;

	if(!periodical){
			process.on('SIGINT', function(){
				if(process.env.debug) console.log('SIGINT');
				fin();
			});
			process.on('SIGTERM', function(){
				if(process.env.debug) console.log('SIGTERM');
				fin();
			});
			process.on('exit', function(){
				if(process.env.debug) console.log('exit');
				fin();
			});
	}
}