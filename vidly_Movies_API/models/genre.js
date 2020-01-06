const Joi = require('@hapi/joi');
const mongoose = require('mongoose')


const genreSchema = new mongoose.Schema({
    name: { type: String, minlength: 5, maxlength: 50, required: true }
})

const Genre = mongoose.model('Genre', genreSchema);

async function validateGenres(genre) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
    });

    return schema.validate(genre)
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validateGenres = validateGenres;