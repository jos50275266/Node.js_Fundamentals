const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener
emitter.on("messageLogged", arg => {
  console.log("Listener called", arg);
});

const log = require("./eventlogger");
log("message");

// log 함수에 message 이후 emitter.emit event 가 동작하지 않는 이유는,
// 서로 동일한 EventEmitter를 사용함에도 불구하고, 현재 둘 클래스를 인스턴스화 한 emitter는 서로 다르기 때문이다.
// 그러므로 eventlogger의 emit 이 동작해도 eventEmitter.js 의 emitter.on이 동작하지 않는 것 이다.

// 이 문제를 해결하는 것을 Part 3 에서 보자.
