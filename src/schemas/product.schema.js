const Joi = require("joi");

const name = Joi.string();
const price = Joi.number();
const brand = Joi.string();
const description = Joi.string();
const storeId = Joi.number().integer();

const productSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    brand: brand.required(),
    description: description.required(),
    storeId: storeId.required()
});

const productUpdateSchema = Joi.object({
    name,
    price,
    brand,
    description,
    storeId
});

module.exports = { productSchema, productUpdateSchema };