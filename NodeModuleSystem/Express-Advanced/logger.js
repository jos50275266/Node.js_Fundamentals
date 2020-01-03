function log(req, res, next) {
  console.log("Logging..."); // 만약에 여기에 json object가 있었으면
  // req.body로 설정하고 다음 middleware로 전달할 것 이다.
  next();
}

module.exports = log;
