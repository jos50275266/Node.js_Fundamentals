const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("@hapi/joi");
const logger = require("./logger");
const express = require("express");
const app = express();

app.set("view engine", "pug");
// Nodejs Engine이 pug require안해도 자동으로 함
app.set("views", "./views"); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// Configuration - You should not store application secret in configuration file,
// such as ) Password
// 이 문제를 해결하기우해 environment variable을 이용해보자
// export app_password=1234
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

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
  // res.send("Hello World!");
  res.render("index", { title: "My Express App", message: "Hello" });
  // first: name of our file
  // second: object
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
