const express = require("express");

const { entityValidate } = require("../middlewares/entityValidate.js");
const { roleValidator } = require("../middlewares/roleValidator.js");
const { verifyToken } = require("../middlewares/jwtValidate.js");
const httpResponse = require("../modules/httpResponse.js");

const { storeSchema, storeUpdateSchema } = require("../schemas/store.schema.js");

const { StoreService } = require("../services/store.service.js");

const { ROLES } = require("../utils/enum.js");

const storeRoute = express.Router();
const storeService = new StoreService();

storeRoute.post("/", verifyToken, roleValidator(ROLES.ADMIN), entityValidate(storeSchema), (req, res) => {
    httpResponse(storeService.createStore(req.body), req, res);
});

storeRoute.get("/:id", verifyToken, roleValidator(ROLES.ADMIN), (req, res) => {
    httpResponse(storeService.getStore(req.params.id), req, res);
});

storeRoute.get("/products/:id", verifyToken, roleValidator(ROLES.ADMIN), (req, res) => {
    httpResponse(storeService.getStoresProducts(req.params.id), req, res);
});

storeRoute.patch("/:id", verifyToken, roleValidator(ROLES.ADMIN), entityValidate(storeUpdateSchema), (req, res) => {
    httpResponse(storeService.updateStore(req.params.id, req.body), req, res);
});

module.exports = { storeRoute };