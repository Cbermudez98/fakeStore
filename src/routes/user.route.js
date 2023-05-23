const express = require("express");
const { entityValidate } = require("../middlewares/entityValidate.js");
const { roleValidator } = require("../middlewares/roleValidator.js");
const { createUser, updateUser, userLogin } = require("../schemas/user.schema.js");
const { UserService } = require("../services/user.service.js");
const { verifyToken } = require("../middlewares/jwtValidate.js");

const httpResponse = require("../modules/httpResponse.js");

const { ROLES } = require("../utils/enum.js");

const userRoute = express.Router();

const userService = new UserService();
userRoute.post("/", entityValidate(createUser), (req, res) => {
    httpResponse(userService.createUser(req.body), req, res);
});

userRoute.patch("/:id",verifyToken, roleValidator(ROLES.CUSTOMER), entityValidate(updateUser), (req, res) => {
    httpResponse(userService.updateUser(req.params.id, req.body), req, res);
});

userRoute.post("/login", entityValidate(userLogin), (req, res) => {
    httpResponse(userService.login(req.body), req, res);
});

userRoute.get("/:id", verifyToken, roleValidator(ROLES.CUSTOMER), (req, res) => {
    httpResponse(userService.getUser(req.params.id), req, res);
});

module.exports = { userRoute };