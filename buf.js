var net = require('net'),
	s = net.Socket(),
    debug = process.env.debugbuf;

module.exports = {
		send: function(ip, port, data, cb){
			if(typeof data==='object') data = JSON.stringify(data);
			var s = require('net').Socket();
			s.on('data', function(d){
				if(debug) console.log(ip, port, 'CLIENT < ', d);
			    cb(d);
			});
			s.connect(port, ip);
			if(debug) console.log(ip, port, 'CLIENT > ', data);
			s.write(data);
			s.end();
		},
		server: function(ip, port, cb){
			net.createServer(function(c){
				c.on('data', function(data){
					if(debug) console.log(ip, port, 'SERVER < ', data);
					c.write(cb(data, c));
				})
			}).listen(port, ip);
		}
}
