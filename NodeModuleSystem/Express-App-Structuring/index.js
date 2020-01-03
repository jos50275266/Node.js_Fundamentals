const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("@hapi/joi");
const express = require("express");
const app = express();

//routes
const courses = require("./routes/courses");
const homepage = require("./routes/homepage");

app.set("view engine", "pug");
app.set("views", "./views"); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

app.use("/homepage", homepage);
app.use("/api/courses", courses);

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled...");
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
