module.exports = function(period, nosaveonexit){
  
  	var ef = function(){},
  		funcs = [], 
  		fs = require('fs'),
  		debug = process.env.debug ? console.log : ef;

   	var obj = {
   		loadFunc: function(name, type){
   			if(fs.existsSync(name)){
   				var s = fs.readFileSync(name).toString();
		  		if(s != ''){
		  			debug('loading', name);
		  			return JSON.parse(s);
		  		}	
   			}
   			return null;
   		},
   		saveFunc: function(name, o){
   			debug('saving', name, o);
   			fs.writeFileSync(name, JSON.stringify(o, null, 4));
   		},
   		funcs: [],
   		obj: function(name, type){
   			var ob = this.loadFunc(name, type) || [];
   			if(!Array.isArray(ob)){
   				ob = type;
   				if(Object.keys(type).length === 0) Object.seal(ob);
   			}
   			if(!nosaveonexit) this.funcs.push([name, ob]);
   			if(period){
	   			debug(fn, 'autosave every', safer);
				setInterval(function(){
					debug('Saving', name, ob);
					this.saveFunc(name, ob);
				}, params.period);
			}
   			return ob;
   		},
   		saveAll: function(){
   			var that = this;
   			debug('saving all')
   			this.funcs.map(function(arr){
   				that.saveFunc(arr[0], arr[1]);
   			})
   		}
   	}

	var fin = function(){
			obj.saveAll();
			// This appears to ensure we see uncaught exception errors before exit
			setTimeout(process.exit, 0);
	}

	var finished = 0;

	if(!nosaveonexit){

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

		process.on('SIGINT', function(){
			debug('SIGINT');
			if(!finished) fin();
			finished = 1;
		});
		process.on('SIGTERM', function(){
			debug('SIGTERM');
			if(!finished) fin();
			finished = 1;
		});
		process.on('exit', function(){
			debug('EXIT');
			if(!finished) fin();
			finished = 1;
		});
	}

	return obj;
}