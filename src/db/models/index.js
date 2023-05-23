const { User, UserSchema } = require("./user.model");
const { Store, StoreSchema } = require("./store.model.js");
const { Product, ProductSchema } = require("./product.model.js");
const { Cart, CartSchema } = require("./cart.model.js");
const { CartProduct, CartProductSchema } = require("./cartProduct.model.js");

const setupModel = (sequelize) => {
    User.init(UserSchema, User.config(sequelize));
    Store.init(StoreSchema, Store.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Cart.init(CartSchema, Cart.config(sequelize));
    CartProduct.init(CartProductSchema, CartProduct.config(sequelize));

    User.associate(sequelize.models);
    Store.associate(sequelize.models);
    Product.associate(sequelize.models);
    Cart.associate(sequelize.models);
};

module.exports = { setupModel };