const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const { genreSchema } = require("../models/genre")

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: { type: String, minlength: 5, maxlength: 255, trim: true, required: true },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, min: 0, max: 255, required: true },
    dailyRentalRate: { type: Number, min: 0, max: 255, required: true }
}))

async function validateMovies(movie) {
    const Schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    })

    return Schema.validate(movie)
}

module.exports.Movie = Movie;
module.exports.validateMovies = validateMovies;