const admin = require('../middleware/admin');
const { Genre, validateGenre } = require("../models/genre")
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find({}).sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
    const { error } = await validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = await validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send('The genre with the given ID was not found...');

    res.send(genre);
});

router.delete('/:id', admin, async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found...');

    res.send(genre);
})

module.exports = router;