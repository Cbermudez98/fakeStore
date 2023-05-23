const { DataTypes, Model } = require("sequelize");
const { STORE_TABLE } = require("../models/store.model.js");

const PRODUCT_TABLE = "products";

const ProductSchema = {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    brand: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING
    },
    storeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "store_id",
        references: {
            model: STORE_TABLE,
            key: "id"
        }
    }
};

class Product extends Model {
    static associate(models) {
        this.belongsTo(models.Store, { foreignKey: "store_id" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: "Product",
            timestamps: false
        }
    }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };