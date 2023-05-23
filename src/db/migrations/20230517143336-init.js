'use strict';

const { USER_TABLE, UserSchema } = require("../models/user.model.js");
const { STORE_TABLE, StoreSchema } = require("../models/store.model.js");
const { PRODUCT_TABLE, ProductSchema } = require("../models/product.model.js");
const { CART_TABLE, CartSchema } = require("../models/cart.model.js");
const { CART_PRODUCT_TABLE, CartProductSchema } = require("../models/cartProduct.model.js");

/** @type {require('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(STORE_TABLE, StoreSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CART_TABLE, CartSchema);
    await queryInterface.createTable(CART_PRODUCT_TABLE, CartProductSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CART_PRODUCT_TABLE);
    await queryInterface.dropTable(CART_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(STORE_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
