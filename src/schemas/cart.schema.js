const Joi = require("joi");

const productId = Joi.number().integer();
const amount = Joi.number().integer();

const addItem = Joi.object({
    productId: productId.required(),
    amount: amount.required()
});

module.exports = { addItem };