const { Sequelize } = require("sequelize");
const { config } = require("../config/config");
const { setupModel } = require("../db/models");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: "mysql",
    logging: false
});

setupModel(sequelize);

module.exports = { sequelize };