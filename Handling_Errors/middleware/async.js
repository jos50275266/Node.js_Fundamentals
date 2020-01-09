// middleware로 만들어주자
// asyncMiddleware function이 req, res, next method를 이용할 수 있게 만들어보자.
// function asyncMiddleware(handler) {
//   // return a standard express router handler
//   return async (req, res, next) => {
//     try {
//       await handler(req, res);
//     }
//     catch (ex) {
//       next(ex);
//     }
//   };
// }

module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (ex) {
            next(ex);
        }
    }
}

// asyncMiddleware를 잘 구현했지만, 문제는 우리가 항상 router를 생성할 때 마다
// 이 middleware를 붙여주는 것을 기억해야하는 것 이다. 대신에, 모든 곳에 적용되게 만들어보자.
