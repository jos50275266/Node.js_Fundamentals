const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: { type: String, minlength: 5, maxlength: 50, required: true }
})
);

async function validateGenres(genre) {
    const schema = Joi.object({
        name: Joi.string()
            .min(5)
            .max(50)
            .required()
    });

    return schema.validate(genre)
}

module.exports.Genre = Genre;
module.exports.validateGenres = validateGenres;