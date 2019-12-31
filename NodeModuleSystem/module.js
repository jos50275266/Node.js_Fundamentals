// In Browser
// window // represent global object in Browser
// JS Engine will prefix (window.)

// global scope: global object which means we can access it anywhere in anyfile
// Examples:
// console.log(); 

// setTimeout();
// clearTimeout();

// setInterval();
// clearInterval();

// window.console.log = console.log 
// window.setTimeout()

// By the same token
// var message = '';
// window.message
// However, In Node.js we don't have this window object.

// -----------------------------------------------------------
// Nodejs
// Instead, we have another object called global!
var message = ''
// In Node.js the varialbe "message" is not being added to global object unlike window.
console.log(global.message); // "undefined" on console.
// global object 에 추가되지않는다, 즉 message 변수 및 함수는 
// 딱 globalObject라는 파일의 scope에 한정된다.

// ------------------------------------------------------------
/* Node.js에서 아래와 같은 방식을 취하지 않고 각 file에 scope을 한정하는 이유는
한 프로그램은 여러개의 파일로 구성되는데 만약 아래와 같이 sayHello라는 함수가 global로
설정되면 다른 파일에서 동일한 이름의 함수를 설정한 경우 overwrite되는 문제가 발생하기 때문이다.

그러므로, 의존성 있고, 유지보수가 용이한 프로그램을 작성하기위해서는 global에 설정을 피해야한다.
*/
var sayHello = function() {

}

window.sayHello()


/*
Node.js 에서는 모든 파일이 Module으로 간주된다. 한 파일(모듈에) 정의된 함수/변수는 모두 해당
파일(모듈)의 범위(Scope)에 한정된다. OOP의 용어로는 Private과 유사한 개념이라 생각할 수 있다.
만일 Private 상태의 다른 모듈의 함수/변수 등을 사용할려면, import를 통해 pulbic으로 변경해주어야한다.

Node.js 프로그램에는 적어도 하나의 main module/file이 존재한다. 예를 들면, app.js
*/

console.log(module);
// module object는 global object가 아니다.

Module {
    id: '.',
    path: 'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\NodeModuleSystem',
    exports: {},
    parent: null,
    filename: 'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\NodeModuleSystem\\module.js',
    loaded: false,
    children: [],
    paths: [
      'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\NodeModuleSystem\\node_modules',
      'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\node_modules',
      'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\node_modules',
      'C:\\Users\\user\\Desktop\\node_modules',
      'C:\\Users\\user\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules'
    ]
  }

// exports 부분을 통해 확인할 수 있다.
// app.js 에서 module을 생성해보자.
// -----------------------------------------------------------
logger.js
var url = "http://mylogger.io/log";

function log(message) {
  // Send an HTTP request
  console.log(message);
}

// 이름을 변경해서 export 할 수 있다.
// module.exports.endPoint = url;

module.exports.log = log;
// url의 경우 implementation detail 이기 때문에 실제에서는 export 하지 않아도 된다.
module.exports.url = url;

// -------------------------------------------------------------
app.js
// const로 require 하기, overwrite을 방지하기위해
// logger = 1; 하면 overwrite 문제 발생
const logger = require("./logger.js");

console.log(logger);
logger.log("message");

// result
{ log: [Function: log], url: 'http://mylogger.io/log' }
message


// -------------------------------------------------------------
logger.js
var url = "http://mylogger.io/log";

function log(message) {
  // Send an HTTP request
  console.log(message);
}

// 함수만 보내주고 싶은 경우
module.exports = log;

// -------------------------------------------------------------
app.js
// const로 require 하기, overwrite을 방지하기위해
// logger = 1; 하면 overwrite 문제 발생
const logger = require("./logger.js");

console.log(logger);
// logger에서 바로 함수를 보낸 경우
logger('message');

// result
[Function: log]
message