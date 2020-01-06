const { Customer, validateCustomers } = require("../models/customer")
const express = require('express');
const router = express.Router()

router.get('/', async (req, res, next) => {
    const Customers = await Customer.find().sort({ name: 1 })
    res.send(Customers)
})

router.post('/', async (req, res, next) => {
    const { error } = await validateCustomers(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })
    customer = await customer.save();

    res.send(customer)
})

router.put('/:id', async (req, res, next) => {
    const { error } = await validateCustomers(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        },
        { new: true }
    )

    if (!customer) return res.status(404).send('The customer with the given ID was not found...');

    res.send(customer);
})

router.delete('/:id', async (req, res, next) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found...');

    res.send(customer);
})

router.get('/:id', async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found...')

    res.send(customer)
})


module.exports = router