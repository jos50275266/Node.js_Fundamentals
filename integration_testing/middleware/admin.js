module.exports = function (req, res, next) {
    // 401 Unauthorized
    // 403 Forbidden
    // 이 경우 unit-test를 진행할 시 너무 많은 mock function을 생성해야하기 때문에
    // 이러한 경우에 unit-test 보다는 integration test를 한다.
    console.log('aaa', req.user)
    if (!req.user.isAdmin) return res.status(403).send('Access Denied');

    next();
}