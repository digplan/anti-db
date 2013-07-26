require('anti-db')(periodical=1);
var s = _require('s.json', null, 200000);
s.dope = 'ness';
console.log(s);
setTimeout(function(){throw Error}, 4000)
