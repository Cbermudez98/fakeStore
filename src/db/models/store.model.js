const { ROLES } = require("../../utils/enum.js");
const { USER_TABLE } = require("./user.model.js");

const { Model, DataTypes, Sequelize } = require("sequelize");

const STORE_TABLE = "stores";

const StoreSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    nit: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    direction: {
        allowNull: false,
        type: DataTypes.STRING
    },
    telephone: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    role: {
        allowNull: false,
        type: DataTypes.ENUM(ROLES.STORE)
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "user_id",
        references: {
            model: USER_TABLE,
            key: "id"
        }
    }
};

class Store extends Model {
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id" });
        this.hasMany(models.Product, { foreignKey: "store_id" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: STORE_TABLE,
            modelName: "Store",
            timestamps: false
        }
    }
}

module.exports = { STORE_TABLE, StoreSchema, Store };