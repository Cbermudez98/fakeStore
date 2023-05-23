const express = require("express");

const { entityValidate } = require("../middlewares/entityValidate.js");
const { roleValidator } = require("../middlewares/roleValidator.js");
const { verifyToken } = require("../middlewares/jwtValidate.js");
const httpResponse = require("../modules/httpResponse.js");

const { ProductService } = require("../services/product.service.js");

const { productSchema, productUpdateSchema } = require("../schemas/product.schema.js");

const { ROLES } = require("../utils/enum.js");

const productRoute = express.Router();

const productService = new ProductService();

productRoute.post("/", verifyToken, roleValidator(ROLES.ADMIN), entityValidate(productSchema), (req, res) => {
    httpResponse(productService.createProduct(req.body), req, res);
});

productRoute.get("/:id", verifyToken, roleValidator(ROLES.ADMIN), (req, res) => {
    httpResponse(productService.getProduct(req.params.id), req, res);
});

productRoute.patch("/:id", verifyToken, roleValidator(ROLES.ADMIN), entityValidate(productUpdateSchema), (req, res) => {
    httpResponse(productService.updateProduct(req.params.id, req.body), req, res);
});

module.exports = { productRoute };