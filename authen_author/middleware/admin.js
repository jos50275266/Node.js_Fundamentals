module.exports = function (req, res, next) {
    // req.user
    if (!req.user.isAdmin) {
        // 401 Unauthorized
        // 403 Forbidded - valid jsonwebtoken but access denied
        return res.status(403).send('Access denied.');
    }

    next();
}