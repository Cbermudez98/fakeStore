const { userRoute } = require("./user.route.js");
const { storeRoute } = require("./store.route.js");
const { productRoute } = require("./product.route.js");
const { cartRoute } = require("./cart.route.js");

const initServe = (app) => {
    app.use("/user", userRoute);
    app.use("/store", storeRoute);
    app.use("/product", productRoute);
    app.use("/cart", cartRoute);
};

module.exports = { initServe };