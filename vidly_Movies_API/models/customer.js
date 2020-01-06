const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: { type: Boolean, default: false, required: true },
    name: { type: String, minlength: 5, maxlength: 50, required: true },
    phone: { type: String, minlength: 5, maxlength: 50, required: true }
}))

async function validateCustomers(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean().required(),
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required()
    })

    return schema.validate(customer)
}

module.exports.Customer = Customer;
module.exports.validateCustomers = validateCustomers;