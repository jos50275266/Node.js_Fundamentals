const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("@hapi/joi");
const logger = require("./logger");
const express = require("express");
const app = express();

// Request Processing Pipeline

// Request --> express.json() --> route() --> Response
// Middleware function은 in sequence로 호출됨.
// 간단하게 이해하면 매 request가 발생할 때 마다 제일 위에서 부터 in sequence로
// middleware 가 순차적으로 실행됨으로인해 req.body를 json 형태로 parse도 할 수 있다

app.use(express.json());
// 만약 json object가 있으면, populate req.body 를 해준다.

app.use(express.urlencoded({ extended: true }));
// parse incoming urlencoded payload:
// ex) key=value&key=value, html input field 등등
// parse this body and populate req.body like json object
// 이전에는 postman 에서 raw --> application/json --> { "name": "hello world"}
// 근데 x-www-form-urlencoded 에서는 key/value로 동일하게 post 할 수 있다.
// array and complex object using urlencoded (extended: true 하면)

app.use(express.static("public"));
// public folder의 image, html, css 등을 static
// localhost:3000/readme.txt 하면 static asset을 읽을 수 있다.
// 주목 할 점은 url에 public이 없다.

// Third-Party-Middleware
// helmet: helps secure your apps by setting various HTTP headers
// morgan: log HTTP Request
app.use(helmet());
app.use(morgan("tiny"));

// Creating Custom Middleware
app.use(logger);

app.use(function(req, res, next) {
  console.log("Authenticate...");
  next();
});

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res, next) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res, next) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res
      .status(404)
      .send("The course with the given ID was not found...");
  }

  res.send(course);
});

app.post("/api/courses", (req, res, next) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res, next) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res
      .status(404)
      .send("The course with the given ID was not found...");
  }

  const { error } = validateCourse(req.body);
  if (error) {
    // If invalid return 400 - Bad Request
    return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res, next) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course with the given ID was not found.");
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });

  return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
