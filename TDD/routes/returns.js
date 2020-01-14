const Joi = require('@hapi/joi');
const validate = require('../middleware/validate');
const moment = require('moment');
const auth = require('../middleware/auth');
const { Movie } = require('../models/movie');
const { Rental } = require('../models/rental');
const express = require('express');
const router = express.Router();

router.post('/', [auth, validate(validateReturn)], async (req, res) => {

    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send('Rental not found...');

    if (rental.dateReturned) return res.status(400).send('Rental already processed...');

    // rental.dateReturned = 1; toBeDefined() test를 통과하는지 간략하게 확인하려고



    // Information Expert Principle
    // Encapsulate this logic inside rental object itself.
    // rental.dateReturned = new Date();
    // const rentalDays = moment().diff(rental.dateOut, 'days')
    // rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
    rental.return();
    await rental.save();

    // Let's use update first approach
    await Movie.update({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    });

    // Express will automatically set 200
    // return res.status(200).send(rental);
    return res.send(rental);
});

function validateReturn(req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })

    return schema.validate(req)
}

module.exports = router;