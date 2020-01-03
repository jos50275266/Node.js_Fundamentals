const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("@hapi/joi");
const logger = require("./logger");
const express = require("express");
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // undefined: 설정하지않으면
// 내부적으로 현재 환경을 찾는 역할을 한다.
// 하지만 process.env.NODE_ENV가 설정되지 않은상태면, by default로 development
console.log(`app: ${app.get("env")}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
// morgan log가 production 말고 development machine에 만 나오게 해보자.
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled...");
}

// production 으로 설정하는 방법은
// export NODE_ENV=production

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
