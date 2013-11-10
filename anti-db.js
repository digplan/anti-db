
function model(){
	return function(target) {
	  require('harmony-reflect');
	  return Proxy(target, {
	    get: function(target, name) {
	      if(name=='inspect') return target;

	      if(name in target) return target[name];
	      throw Error('Anti-db: ' + name + ' is not a valid property for model');
	    },
	    set: function(target, name, val) {
	      if(name in target) return target[name] = val;
	      throw Error('Anti-db: ' + name + ' is not a valid property for model');
	    }
	  });
	}
}

module.exports = function(periodical){
  
  	var ef = function(){};
  	var debug = process.env.debug ? console.log : ef;

	if(!periodical){

		// Win32 SIGINT assistance
		// http://stackoverflow.com/a/14861513/1308338
		
		var readLine = require ("readline");
		if (process.platform === "win32"){
		    var rl = readLine.createInterface({
		        input: process.stdin,
		        output: process.stdout
		    });
		    rl.on ("SIGINT", function (){
		        process.emit("SIGINT");
		        debug('Win32 SIGINT');
		        process.exit(1);
		    });
		}
	}
   
	global._require = function (fn, isArray, safer){
		var tgt = ob = [];

		if(!Array.isArray(isArray)){
			tgt = ob = {};
			if(undefined !== isArray){
				debug('Object model was provided', isArray);
				ob = model()(isArray);
				tgt = ob.inspect;
			}
		}

	  	if(fs.existsSync(fn)){
	  		var s = fs.readFileSync(fn).toString();
	  		if(s != ''){
	  			debug('loading', fn);
	  			ob = JSON.parse(s);
	  		}
	  	}
		if(!periodical) funcs.push([fn, tgt]);
		if(safer){
			debug(fn, 'autosave every', safer);
			setInterval(function(){
				debug('Saving', fn);
				fs.writeFile(fn, JSON.stringify(ob, null, 4), ef);
			}, safer);
		}
		return ob;
	}

	var funcs = [], fs = require('fs');
	var save = function(){
			funcs.map(function(arr){
					debug('Saving', arr[0]);
					fs.writeFileSync(arr[0], JSON.stringify(arr[1], null, 4));
			})
	}
	var fin = function(){
			if(finalized) return;
			save();
			finalized = true;
			// This appears to ensure we see uncaught exception errors before exit
			setTimeout(process.exit, 0);
	}

	var finalized = false;
	if(!periodical){
			process.on('SIGINT', function(){
				debug('SIGINT');
				fin();
			});
			process.on('SIGTERM', function(){
				debug('SIGTERM');
				fin();
			});
			process.on('exit', function(){
				debug('exit');
				fin();
			});
	}
}