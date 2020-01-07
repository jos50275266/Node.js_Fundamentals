const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose')
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res, next) => {
    // dateOut descending order
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res, next) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid Movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    // ---------------------------
    // rental = await rental.save()

    // movie.numberInStock--;
    // movie.save();
    // 현재 여기서 after rental.save() 이후에 movie.save가 동작하기전 어떤 문제가 발생할 수 있다.
    // 이때 우리는 transaction을 이용할 수 있다. (서버가 꺼지거나, 인터넷 꺼지거나 등등)
    // Atomicity를 보장하기위해: two phases commit or transaction
    // transaction: a group of operttion that should be performed in unit.
    // mongoDB에는 transction이 없어서, two phase commit을 사용해 transaction 구현.
    // mongoDB Two Phase Commits
    // -----------------------------
    // 대신 - Fawn을 사용하고 Promise로 연결하면 하나의 unit으로 간주
    // Actual name of the collection, plural - case-sensitive in fawn 사용에서
    // Fawn을 이용하면 ojlinttaskcollections collection이 자동생성된다, two-phases-commit을 execute 할려고
    // ojlinttaskcollctions which represents a transaction, 여기서 operation 진행하고, 이게 complete 되면,
    // 정상적으로 rental collection에 저장하고, ojlinttaskcollections의 document를 삭제한다.
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 } // decrement -1
            })
            .run(); // 이거 해야 최종적으로 실행됨.
    }

    catch (ex) {
        // Internal Server Error
        res.status(500).send('Something Failed');
    }


    res.send(rental);
})

module.exports = router;