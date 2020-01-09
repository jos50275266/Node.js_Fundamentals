const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// middleware로 만들어주자
// asyncMiddleware function이 req, res, next method를 이용할 수 있게 만들어보자.
// function asyncMiddleware(handler) {
//   // return a standard express router handler
//   return async (req, res, next) => {
//     try {
//       await handler(req, res);
//     }
//     catch (ex) {
//       next(ex);
//     }
//   };
// }

// We're not calling (req, res, next) functions, but referencing
// 1. call this fucntion
// 2. call this function (req, res, next) at runtime
// router.get('/another', (req, res, next) => {

// })

router.get('/', asyncMiddleware(async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres)


  // Removing Try Catch Blocks
  // // Handling Rejected Promises
  // try {
  //   const genres = await Genre.find().sort('name');
  //   res.send(genres);
  // }

  // catch (ex) {
  //   // index.js의 Express Error Middleware로
  //   // 중간에 DB가 종료되는 상황
  //   // Proper Response
  //   // 500: Interner Server Error
  //   // Log the exception
  //   // res.status(500).send('Someting Failed.');
  //   next(ex);
  //   // 여기서 보내준 exception을 index.js의 Express Error Middleware의 첫번째 err 인자에서 받는다.
  // }

}));

router.post('/', auth, asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
}));

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router;