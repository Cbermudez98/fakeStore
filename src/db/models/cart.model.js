const { USER_TABLE } = require("../models/user.model.js");

const { CART_STATUS } = require("../../utils/enum.js");

const { DataTypes, Model } = require("sequelize");

const CART_TABLE = "carts";

const CartSchema = {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        allowNull: false,
        field: "user_id",
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: "id"
        }
    },
    status: {
        allowNull: false,
        type: DataTypes.ENUM(CART_STATUS.ACTIVE, CART_STATUS.FACTORED),
        defaultValue: CART_STATUS.ACTIVE
    }
};

class Cart extends Model {
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id" });
        this.belongsToMany(models.Product, {
            as: "products",
            through: models.CartProduct,
            foreignKey: "cartId",
            otherKey: "productId"
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CART_TABLE,
            modelName: "Cart",
            timestamps: false
        };
    }
}

module.exports = { CART_TABLE, CartSchema, Cart };