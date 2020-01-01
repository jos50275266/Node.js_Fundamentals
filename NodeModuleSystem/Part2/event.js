// It is a class
const EventEmitter = require("events");
const emitter = new EventEmitter();

// 순서가 중요하다. 찾아보기

// Listen a specific event / Register a listener
// 만약에 emit method 이후에 listener(on) 을 작성하면, 아무일도 발생하지 않는다 왜냐하면,
// this emit iterates over all the registered listeners and calls them synchronous
// 만약 아래 emit method 에서 arguments를 작성했다면 이 정보를 on 에서는 첫번째 parameter로 접근 가능하다
// naming: arg or e or event
emitter.on("messageLogged", function(arg) {
  console.log("Listener called", arg);
});

// callback 함수에 arrow function을 사용해 더 간단한 syntax로 작성하자
emitter.on("logging", arg => {
  console.log("Listener called", arg);
});

// Raise an event, event arguments: {id: 1, url: "http://"}
emitter.emit("messageLogged", { id: 1, url: "http://" }); // raising an event or making a nose - signaling

emitter.emit("logging", { data: "Hello World!" });
