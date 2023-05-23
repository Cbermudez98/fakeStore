const { Model, DataTypes } = require("sequelize");
const { CART_TABLE } = require("./cart.model.js");
const { PRODUCT_TABLE } = require("./product.model.js");

const CART_PRODUCT_TABLE = "CartProduct";

const CartProductSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    cartId: {
        field: "cart_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CART_TABLE,
            key: "id"
        },
    },
    productId: {
        field: "product_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: PRODUCT_TABLE,
            key: "id"
        },
    }
};

class CartProduct extends Model {

    static config(sequelize) {
        return {
            sequelize,
            tableName: CART_PRODUCT_TABLE,
            modelName: "CartProduct",
            timestamps: false
        };
    }
}

module.exports = { CART_PRODUCT_TABLE, CartProductSchema, CartProduct };