const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: { type: Boolean, default: false, required: true },
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    phone: { type: String, required: true, minlength: 5, maxlength: 50 }
  })
);

router.get("/", async (req, res, next) => {
  const customers = await Customer.find().sort({ name: 1 });

  res.send(customers);
});

router.post("/", async (req, res, next) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });

  customer = await customer.save();

  res.send(customer);
});

router.put("/:id", async (req, res, next) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOneAndUpdate(
    req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone
    },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.delete("/:id", async (req, res, next) => {
  const customer = await Customer.findOneAndDelete(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.get("/:id", async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res.status(404).send("The customer with the given ID wa not found.");

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required()
  });

  return schema.validate(customer);
}

module.exports = router;
