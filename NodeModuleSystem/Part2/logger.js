// // Module Wrapper Function
// (function(exports, require, module, __filename, __dirname) {
//   console.log(__filename);
//   console.log(__dirname);
//   var url = "http://mylogger.io/log";

//   function log(message) {
//     console.log(message);
//   }

//   module.exports = log;
//   module.exports.log = log;
//   exports.log = log;

//   //  exports = log; // module.exports
// });

// Module Wrapper Function
console.log(__filename);
console.log(__dirname);
var url = "http://mylogger.io/log";

function log(message) {
  console.log(message);
}

module.exports = log;
module.exports.log = log;
exports.log = log;

//  exports = log; // module.exports

// https://medium.com/free-code-camp/require-module-in-node-js-everything-about-module-require-ccccd3ad383
```
TL;DR
Each file in Node.js is referred to as a module.

Before executing the code written in a module, Node.js takes the entire code written inside the module and converts it into a function wrapper, which has the following syntax:
(function(exports, require, module, __filename, __dirname) {
 // entire module code lives in here
});

The function wrapper ensures that all the code written inside a module is private to it unless explicitly stated otherwise (exported). The parameters exports, require, module, __filename, and __dirname act as the variables global to the entire code in a module. Since each module has a function wrapper of its own, the code written inside one function wrapper becomes local to that function wrapper (read module) and is not accessible inside another function wrapper (read module).
module keyword refers to the object representing the current module. The module object has a key named exports. module.exports is another object which is used for defining what can be exported by a module and can be made available to other modules. In short, if a module wants to export something, it should be added to the module.exports object.
The default value of module.exports object is {}.

There are three methods in which you can export something from a module, or add something to the module.exports object:

1. Define all the constructs first and then use multiple module.exports statements where each statement is used to export a construct.

2. Define all the constructs first and then use a single module.exports statement to exports all constructs at once following object literal notation.

3. Add constructs to the module.exports object while defining them.
require keyword refers to a function which is used to import all the variables and functions exported using the module.exports object from another module. In short, if a file wants to import something it has to declare it using the following syntax:
require('idOrPathOfModule');

While exporting something from a module, you can use any valid identifier. It is not mandatory that you need to give the exact name of the variable/function as the key of the property added to module.exports object. Just make sure that you use the same key for accessing something which you used while exporting it.
```;
