const { Product } = require("../db/models/product.model.js");

class ProductService {
    constructor() {}

    async createProduct(productDto) {
        try {
            const product = await Product.create(productDto);
            return product;
        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || "Error creating product"
            };
        }
    }

    async getProduct(id) {
        try {
            const product = await Product.findByPk(id, {
                include: ["Store"]
            });
            if (!product) {
                throw {
                    msg: "Not product was found"
                };
            }
            delete product.dataValues.storeId;
            delete product.dataValues.store_id;
            delete product.dataValues.Store.dataValues.user_id;
            delete product.dataValues.Store.dataValues.userId;
            return product;
        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || error.msg
            };
        }
    }

    async updateProduct(id, productDto) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw {
                    msg: "Not product was found"
                };
            }
            await product.update(productDto);
            return {
                msg: "Product was updated with success"
            };
        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || error.msg
            };
        }
    }
}

module.exports = { ProductService };