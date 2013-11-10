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
   
   	// call like this..

   	// _require('./some.json');
   	// _require('./anarray.json', []);
   	// _require('./savedeveryminute.json', null, 60000);
   	// _require('./enforcemodel.json', {name:''});
   	// _require({'name': ''}); // no backing file, return obj

	global._require = function (fn, isArray, safer){
		var tgt = ob = [];

		// not an array
		if(!Array.isArray(isArray)){
			tgt = ob = {};
			if(typeof fn !== 'string' || typeof isArray === 'object'){
				// model
				debug('Object model was provided');
				ob = model()(isArray || fn);
				tgt = ob.inspect;
			}
			if(typeof fn !== 'string'){
				debug('Returning modeled object, no backing file');
				return ob;
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
					// make sure were saving targets and not proxies
					if(Array.isArray(arr[1])){
						var tgt = [];
						arr[1].forEach(function(i){
							if(i.isProxy){
								tgt.push(i.inspect);
							} else {
								tgt.push(i);
							}
						})
						arr[1] = tgt;
					} else if(typeof arr[1] === 'object'){
						for(i in arr[1]){
							if(arr[1][i].isProxy) arr[1][i] = arr[1][i].inspect;
						}
					}
					debug('Saving', arr[0], arr[1]);
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

	function model(){
		return function(target) {
		  require('harmony-reflect');
		  return Proxy(target, {
		    get: function(target, name) {
		      if(name=='inspect') return target;
		      if(name=='isProxy') return true;

		      if(name in target) return target[name];
		      save();
		      throw Error('Anti-db: ' + name + ' is not a valid property for model');
		    },
		    set: function(target, name, val) {
		      if(name in target) return target[name] = val;
		      save();
		      throw Error('Anti-db: ' + name + ' is not a valid property for model');
		    }
		  });
		}
	}
}