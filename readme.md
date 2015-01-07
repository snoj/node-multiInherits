# multiInherit
Takes nodejs' util.inherit() takes it up a notch by not destroying and objects existing prototype properties and lets multiple inheritances happen.

# multiInherits(constructor, superConstructors)
Follows similar rules as [util.inherits](http://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor). The difference come into play with superConstructors and how to access them from the constructor they were added to.

The superConstructors parameter can either be a single constructor, or an array or object of constructors. Using an object can make referencing a superConstructor later when invoking later on. (See supers_ for more.)

#### array
```
var ctorArray = [ctor1, ctor2, ctor3}]
```

#### object
```
var ctorObjs = {
    aUsefullName: ctor1
    ,else: ctor2
    ,entirely: ctor3
};
```

#### obj.supers_
After running multiInherits on an object, the supers_ property is populated with the objects that were inherited from.

The original objects are referenced by the constructor name or, if an object was used to list superConstructors, the id that was given is using instead.

```
var first = function() {};
multiInherits(first, { thereis: require('another').skywalker });
first.prototype.who = function() {
    this.OWKLies = [new first.supers_.thereis(), "Vader was Anakin"];
};

var firstinstance = new first();
```

# Example

```
var multiInherits = require('multiInherits');

//usual stuff
var first = function first() {};
first.prototype.athing = function() { return true; };

//oh lala
var second = function second() {};
Object.defineProperty(second.prototype, "allAbout", { get: function() { return "the base"; } });

var third = function third() {}
third.prototype.somethingelse = function() { this.hasbeen = "set"; this.wassetat = new Date(); return this; };

var aweirdone = function() {};

//bring it all together now
var finally = function() {};
finally.prototype.fantastic = function() { return 4; };

multiInherits(finally, [first, second, third, {id: "aweirdone", proto: aweirdone}])
var results = new finally();

results.somethingelse()
console.log(results.wassetat);

//doesn't fail!
if(finally.athing()) {
  console.log("You can do it!");
}
```

# License
The MIT License (MIT)

Copyright (c) 2015 Josh Erickson <josh@snoj.us>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
