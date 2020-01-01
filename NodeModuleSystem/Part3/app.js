// Extending Event Emitter

// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// // Register a listener
// emitter.on("messagLogged", arg => {
//   console.log("Listener called", arg);
// });

const Logger = require("./logger");
const logger = new Logger();

// Register a listener
logger.on("messageLogged", arg => {
  console.log("Listener called", arg);
});

logger.log("message");

// 둘 다 동일한 EventEmitter Class를 가지고 있기 때문에 이제는 가능하다.
// 다른 모듈에서 발생한 이벤트를 on or emit 하기 위해서는 클래스를 하나 생성하고 EventEmitter를 상속하면
// EventEmitter 상속한 클래스는 EventEmitter으 모든 functionalities를 가지게된다.
