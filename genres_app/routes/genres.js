const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Genre = mongoose.model("Genre", new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true }
})
);

router.get("/", async (req, res, next) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

router.post("/", async (req, res, next) => {
  const { error } = await validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", async (req, res, next) => {
  const { error } = await validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findOneAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("The genre with the given ID was not found!");

  res.send(genre);
});

router.delete("/:id", async (req, res, next) => {
  const genre = await Genre.findOneAndRemove(req.params.id);
  if (!genre) return res.status(404).send("The genre with the given ID was not found!");

  res.send(genre);
});

router.get("/:id", async (req, res, next) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("The genre with the given ID was not found!");

  res.send(genre);
});

async function validateGenres(genre) {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  });

  return schema.validate(genre)
}

module.exports = router;
