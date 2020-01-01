var url = "http://mylogger.io/log";

function log(message) {
  // Send an HTTP request
  console.log(message);
}

// 이름을 변경해서 export 할 수 있다.
module.exports.endPoint = url;

// module.exports.log = log;
// url의 경우 implementation detail 이기 때문에 실제에서는 export 하지 않아도 된다.
module.exports.url = url;

// 함수만 보내주고 싶은 경우
// module.exports = log;

console.log(module);
