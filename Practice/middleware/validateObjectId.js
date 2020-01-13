const mongoose = require('mongoose');

module.exports = function (req, res, next) {
    // if the parameter of this object is not a valid ID, it will return 404 
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send('Invalid ID.')
    }

    // otherwise
    next();
}