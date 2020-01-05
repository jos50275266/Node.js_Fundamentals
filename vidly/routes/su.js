const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Genre = mongoose.model('Hello', new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (v) => Promise.resolve(v && v.length > 4)
        },
        message: 'name must be longer than 4 characters or not null',
        required: true,
        maxlength: 50
    }
}))

router.get('/', async (req, res, next) => {
    const genres = await Genre.find({ name: 1 });
    res.send(genres);
})

router.post('/', async (req, res, next) => {
    // req.body.name 으로 보내지 않는 이유는 @hapi/joi는 object {name: something} 형태로
    // 값을 받고 validation 과정을 진행하기 때문이다.
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    await genre.save();

    res.send(genre);
})

router.put('/:id', async (req, res, next) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    if (!genre) return res.status(404).send('The genre with the given ID was not found.')
    res.send(genre);
})

router.delete('/:id', async (req, res, next) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send("The genre with the given ID was not ofund.")
    res.send(genre);
})

router.get('/:id', async (req, res, next) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
})

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string()
            .min(5)
            .max(50)
            .required()
    });

    return schema.validate(genre);
}

module.exports = router