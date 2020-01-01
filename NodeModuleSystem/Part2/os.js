const os = require("os");

var freeMemory = os.freemem();
var totalMemory = os.totalmem();

// Templage String
// ES6 / ES2015 : ECMAScript 6
console.log(`freeMemory: ${freeMemory}, totalMemory: ${totalMemory}`);
