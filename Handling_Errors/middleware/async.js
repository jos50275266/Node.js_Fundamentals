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