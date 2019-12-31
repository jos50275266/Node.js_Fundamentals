// const로 require 하기, overwrite을 방지하기위해
// logger = 1; 하면 overwrite 문제 발생
const logger = require("./logger.js");

console.log(logger);
// logger.log("message");
logger("message");
// logger에서 바로 함수를 보낸 경우
