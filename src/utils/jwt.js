const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");

const signToken = (role) => {
    return jwt.sign({ role }, config.secretKeyEncrypt);
};

module.exports = { signToken };