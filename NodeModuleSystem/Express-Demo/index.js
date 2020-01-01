const Joi = require("@hapi/joi");
const express = require("express");
const app = express();

app.use(express.json());
// https://medium.com/@chullino/1%EB%B6%84-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%86%8C%EA%B0%9C-body-parser%EB%A5%BC-%EC%86%8C%EA%B0%9C%ED%95%A9%EB%8B%88%EB%8B%A4-%ED%95%98%EC%A7%80%EB%A7%8C-body-parser%EB%A5%BC-%EC%93%B0%EC%A7%80-%EB%A7%88%EC%84%B8%EC%9A%94-bc3cbe0b2fd
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res, next) => {
  res.send([1, 2, 3]);
});

// Get Request
app.get("/api/courses/:id", (req, res, next) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course with the given ID was not found");
    // 404 - Chrome Developer 에서 Network Tab 에서 404 Code 확인가능
  }
  res.send(course);
});

// POST Request
app.post("/api/courses", (req, res, next) => {
  //  Input Validation
  //   const schema = Joi.object({
  //     name: Joi.string()
  //       .min(3)
  //       .required()
  //   });

  //   const validation = schema.validate(req.body);
  //   console.log(validation);
  //   // https://github.com/hapijs/joi/issues/2145

  //   if (!req.body.name || req.body.name.length < 3) {
  //     // 400 Bad Request
  //     // res.status(400).send("Name is required and should be minimum 3 characters");
  //     // validation.error
  //     res.status(400).send(validation.error.details[0].message);
  //     return; // 나머지 함수가 실행되는 것을 원치 않기 때문에
  //   }

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

// PUT Request
app.put("/api/courses/:id", (req, res, next) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    // return 중요함
    return res.status(404).send("The course with the given ID was not found.");
  }

  // Validate
  //   const result = validateCourse(req.body);
  // Object Destructuring
  const { error } = validateCourse(req.body); // result.error

  // If invalid, return 400 - Bad Request
  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }

  // Update Course
  course.name = req.body.name;
  // Return the update course
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });

  return (validation = schema.validate(course));
}

app.delete("/api/courses/:id", (req, res, next) => {
  // Look up the course
  // Non-existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course with the given ID was not found.");
  }

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

// /api/courses/1
// Route Parameters
// QueryString: /api/posts/2018/1?sortBy=name
app.get("/api/posts/:year/:month", (req, res, next) => {
  //   res.send(req.params);
  res.send(req.query);
});

// Environment Variables
// In production 에서는 hosting or deployment 에서 다이나믹하게 포트가 할당됨으로 환경 변수로 설정하자
// PORT
const port = process.env.PORT || 3000;
// 만약에 배포 혹은 호스팅 과정에서 동적으로 할당된 PORT가 존재하면 process.env.PORT를 사용하고 아니면 3000
// export PORT=5000   : 터미널에서 환경변수 설정방법

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
