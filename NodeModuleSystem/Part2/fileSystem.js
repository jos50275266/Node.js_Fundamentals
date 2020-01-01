const fs = require("fs");

// 항상 비동기 메소드 사용하기

// 동기 버전
// const files = fs.readdirSync("./");
// console.log(files);

// 비동기 버전
fs.readdir("./", function(err, files) {
  if (err) console.log("Error", err);
  else console.log("Result", files);
}); // (path, callback)

// Error 발생
// fs.readdir("$$", function(err, files) {
//     if (err) console.log("Error", err);
//     else console.log("Result", files);
//   }); // (path, callback)
