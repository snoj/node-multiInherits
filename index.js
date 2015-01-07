var util = require('util');

var multiInherits = module.exports = function(ctor, supers) {
  var superlist = [];
  if(supers.constructor.name == "Object")
    superlist = Object.keys(supers).map(function(k) { 
      return {id: k, proto: supers[k]}
    });
  else if(!(supers instanceof Array))
    superlist = [supers];
  else if(supers instanceof Array)
    superlist = supers;
  else
    throw "Something went wrong, check the superConstructor parameter of multiInherits";

  var tmp = function() {};
  tmp.prototype = Object.create(ctor.prototype);
  ctor.supers_ = {};
  superlist.forEach(function(v, i) {
    var s = v;
    if(v.id && v.proto)
      s = v.proto;
    var m = Object.getOwnPropertyNames(s.prototype);
    ctor.supers_[v.id || s.prototype.constructor.name || i] = s;
    m.forEach(function(mi) {
      var t = Object.getOwnPropertyDescriptor(s.prototype, mi);
      Object.defineProperty(tmp.prototype, mi, t);
    });
  });
  util.inherits(ctor, tmp);
}
