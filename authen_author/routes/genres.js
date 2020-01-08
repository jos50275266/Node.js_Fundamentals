const admin = require('../middleware/admin')
const { auth } = require('../middleware/auth');
const { Genre, validateGenres } = require("../models/genre")
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
});

router.post("/", auth, async (req, res, next) => {

    // request header를 읽는다 - 이 부분을 매번 반복하면 좋은 코드가 아니기 때문에 함수로
    // 만들어서 middleware로 만들어보자
    // const token = req.header('x-auth-token');
    // res.status(401); // Client doesn't have credential to access the info

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

// 두 종류의 middleware
router.delete("/:id", [auth, admin], async (req, res, next) => {
    const genre = await Genre.findOneAndDelete(req.params.id);
    if (!genre) return res.status(404).send("The genre with the given ID was not found!");

    res.send(genre);
});

router.get("/:id", async (req, res, next) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("The genre with the given ID was not found!");

    res.send(genre);
});


module.exports = router;
