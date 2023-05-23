const { ROLES } = require("../../utils/enum.js");

const { Model, DataTypes, Sequelize } = require("sequelize");

const USER_TABLE = "users";

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastName: {
        allowNull: false,
        field: "last_name",
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    age: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    role: {
        allowNull: false,
        type: DataTypes.ENUM(ROLES.CUSTOMER, ROLES.ADMIN)
    }
};

class User extends Model {
    static associate(models) {
        this.hasMany(models.Store, { foreignKey: "user_id" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: "User",
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User };