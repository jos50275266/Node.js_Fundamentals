const validate = require('../middleware/validate');
const { Customer, validateCustomer } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// 이 부분은 영화관의 직원 혹은 그에 준하는 관계자가 post 하도록 isGold 때문에 
router.post('/', validate(validateCustomer), async (req, res) => {
    // const { error } = await validateCustomer(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();

    res.send(customer);
});

// 이 부분은 영화관의 직원 혹은 그에 준하는 관계자가 post 하도록 isGold 때문에 
router.put('/:id', validate(validateCustomer), async (req, res) => {
    // const { error } = await validateCustomer(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

// 이 부분은 영화관의 직원 혹은 그에 준하는 관계자가 post 하도록 isGold 때문에 
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

// 이 부분은 영화관의 직원 혹은 그에 준하는 관계자가 post 하도록 isGold 때문에 
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

module.exports = router; 