const Joi = require("joi");
const { ROLES } = require("../utils/enum.js");

const name = Joi.string();
const nit = Joi.string();
const direction = Joi.string();
const telephone = Joi.number().integer();
const role = Joi.string().valid(ROLES.STORE);
const userId = Joi.number().integer();

const storeSchema = Joi.object({
    name: name.required(),
    nit: nit.required(),
    direction: direction.required(),
    telephone: telephone.required(),
    role: role.required(),
    userId: userId.required()
});

const storeUpdateSchema = Joi.object({
    name,
    nit,
    direction,
    telephone,
    role,
    userId
});


module.exports = { storeSchema, storeUpdateSchema };