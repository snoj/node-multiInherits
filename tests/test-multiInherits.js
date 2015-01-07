var assert = require('assert');
var util = require('util');
var mi = require('../');

var a = function a() {}; a.prototype.test_a = function() { console.log(this.__proto__.constructor.name);};
var b = function b() {}; b.prototype.test_b = function() { console.log(this.__proto__.constructor.name);};
var c = function () {}; c.prototype.test_c = function() { console.log(this.__proto__.constructor.name);};
var d = function () {}; d.prototype.test_d = function() { console.log(this.__proto__.constructor.name);};
var f = function f() {}; f.prototype.test_f = function() { console.log(this.__proto__.constructor.name);};
var f2 = function () {}; f2.prototype.test_f2 = function() { console.log(this.__proto__.constructor.name);};

Object.defineProperty(a.prototype, "hiddenget", { get: function() { return true; } });

mi(f, [a,b,{id: "cats", proto: c}]);

assert.ok(f.prototype.test_f);
assert.ok(f.prototype.test_a);
assert.ok(f.prototype.test_b);
assert.ok(f.prototype.test_c);
assert.ok(f.prototype.hiddenget);
assert.ok(f.supers_);
assert.ok(f.supers_.cats)

util.inherits(f2, f)
assert.ok(f2.prototype.test_a);
assert.ok(f2.prototype.test_b);
assert.ok(f2.prototype.test_c);
assert.ok(typeof f2.prototype.test_f2, 'undefined');
assert.ok(f2.super_)
assert.ok(f2.super_.supers_);

var hashtest = function() {};
mi(hashtest, {a: a, cats: c, bats: b});

assert.ok(hashtest.prototype.test_c);
