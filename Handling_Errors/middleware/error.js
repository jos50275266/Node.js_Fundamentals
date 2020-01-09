module.exports = function (err, req, res, next) {
    //   // 중간에 DB가 종료되는 상황
    //   // Proper Response
    //   // 500: Interner Server Error
    //   // Log the exception
    res.status(500).send('Someting Failed.');
}
