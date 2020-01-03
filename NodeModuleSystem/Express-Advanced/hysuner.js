const startDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const morgan = require("morgan");
const express = require("express");
const app = express();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startDebugger("Morgan enable...");
  // export DEBUG=app:startup
  // 다 없앨려면
  // export DEBUG=
  // muktiple names

  // export DEBUG=app:startup,app:db
  // or
  // export DEBUG=app:*
  // DEBUG modulee 사용의 장점은 색 구분을 통해 console.log와 달리 어느 부분에서 어떤 결과가
  // 출력되는지 알기 용이하다.

  // $DEBUG=app:db nodemon hyunser.js --> shortcut version

}

// db work
dbDebugger("Connected to the database...");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
