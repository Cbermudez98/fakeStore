const Joi = require("joi");
const { ROLES } = require("../utils/enum.js");

const name = Joi.string().min(3);
const lastName = Joi.string().min(3);
const email = Joi.string().email();
const age = Joi.number().integer().greater(17);
const password = Joi.string().min(6);
const role = Joi.string().valid(ROLES.CUSTOMER, ROLES.ADMIN);

const createUser = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    email: email.required(),
    age: age.required(),
    password: password.required(),
    role: role.required()
});

const updateUser = Joi.object({
    name,
    lastName,
    email,
    age,
    password,
    role
});

const userLogin = Joi.object({
    email: email.required(),
    password: password.required()
});

module.exports = { createUser, updateUser, userLogin };