const validate = require('../middleware/validate');
const validateObjectId = require('../middleware/validateObjectId');
const mongoose = require('mongoose')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validateGenre } = require("../models/genre")
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find({}).sort('name');
    res.send(genres);
});

router.post('/', [auth, validate(validateGenre)], async (req, res) => {
    // const { error } = await validateGenre(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', [auth, validateObjectId, validate(validateGenre)], async (req, res) => {
    // const { error } = await validateGenre(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send('The genre with the given ID was not found...');

    res.send(genre);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found...');

    res.send(genre);
})

router.get('/:id', validateObjectId, async (req, res) => {
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //     return res.status(404).send('Invalid ID.')
    // }

    const genre = await Genre.findById(req.params.id);
    // 위 if statement이 있기 이전에는 바로 error middleware가 아래 조건문에 도달하기전
    // try...catch로 error를 잡아서 500 error가 발생했음으로 위와 같이 조건문을 하나 더
    // 추가 함으로써 404 errror를 출력하게 할 수 있다.
    // 하지만 현재 위 코드는 다른 라우터 함수에서도 사용될 수 있기 때문에 별도의 함수로 Refactoring 하자.
    // middleware로 만들어 주자
    if (!genre) return res.status(404).send('The genre with the given ID was not found...');

    res.send(genre);
})

module.exports = router;