const { Movie, validateMovies } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const movies = await Movie.find().sort({ name: 1 });
    res.send(movies);
});

router.post('/', async (req, res, next) => {
    const { error } = await validateMovies(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // 검토
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre...')

    let movie = await new Movie({
        title: req.body.title,
        // genre: genre,
        // timestampe 등 모두 저장할 필요 없이 필요한 것만 selectively 저장할려고
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    movie = await movie.save();
    res.send(movie)
});

router.put('/:id', async (req, res, next) => {
    const { error } = await validateMovies(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            genre: req.body.genre,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },
        { new: true }
    )

    if (!movie) return res.status(404).send('The movie with the given ID was not found...');
    res.send(movie);
})

router.delete('/:id', async (req, res, next) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found...');

    res.send(movie);
});

router.get('/:id', async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found...');

    res.send(movie);
});

module.exports = router;

