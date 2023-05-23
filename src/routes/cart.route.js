const express = require("express");

const { entityValidate } = require("../middlewares/entityValidate.js");
const { roleValidator } = require("../middlewares/roleValidator.js");
const { verifyToken } = require("../middlewares/jwtValidate.js");
const httpResponse = require("../modules/httpResponse.js");

const { CartService } = require("../services/cart.service.js");

const { ROLES } = require("../utils/enum.js");

const { addItem } = require("../schemas/cart.schema.js");

const cartRoute = express.Router();
const cartService = new CartService();

cartRoute.post("/addItem/:userId", verifyToken, roleValidator(ROLES.CUSTOMER), entityValidate(addItem), (req, res) => {
    httpResponse(cartService.addItem(req.params.userId, req.body), req, res);
});

cartRoute.patch("/updateItem/:userId", verifyToken, roleValidator(ROLES.CUSTOMER), entityValidate(addItem), (req, res) => {
    httpResponse(cartService.updateItem(req.params.userId, req.body), req, res);
});

cartRoute.delete("/removeItem/:userId/:productId", verifyToken, roleValidator(ROLES.CUSTOMER), (req, res) => {
    httpResponse(cartService.deleteItem(req.params.userId, req.params.productId), req, res);
});

cartRoute.get("/getCart/:userId", verifyToken, roleValidator(ROLES.CUSTOMER), (req, res) => {
    httpResponse(cartService.getCartProduct(req.params.userId), req, res);
});

cartRoute.patch("/updateCart/:userId", verifyToken, roleValidator(ROLES.CUSTOMER), (req, res) => {
    httpResponse(cartService.updateCart(req.params.userId), req, res);
});

module.exports = { cartRoute };