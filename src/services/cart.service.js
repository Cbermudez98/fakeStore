const { Cart } = require("../db/models/cart.model.js");
const { CartProduct } = require("../db/models/cartProduct.model.js");
const { CART_STATUS } = require("../utils/enum.js");

class CartService {
    constructor() {}

    async getCart(userId) {
        try {
            const [ cart ] = await Cart.findOrCreate({
                where: { userId, status:  CART_STATUS.ACTIVE }
            });
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async addItem(userId, itemDto) {
        try {
            const cart = (await this.getCart(userId)).dataValues;

            const product = {
                ...itemDto,
                cartId: cart.id
            };
            const [cartProduct, created] = await CartProduct.findOrCreate({
                where: { cartId: product.cartId, productId: itemDto.productId },
                defaults: { amount: itemDto.amount }
            });
            if (!created) {
                const amount = cartProduct.dataValues.amount + itemDto.amount;
                cartProduct.update({ amount }); 
            }
            return {
                msg: "Added with success"
            };
        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || "Error adding item"
            };
        }
    }

    async updateItem(userId, itemDto) {
        try {
            const cart = (await this.getCart(userId)).dataValues;
            const cartProduct = await CartProduct.findOne({
                where: {
                    cartId: cart.id, productId: itemDto.productId
                }
            });
            if (!cartProduct) {
                throw {
                    msg: "Not product in cart was found"
                }
            }
            await cartProduct.update(itemDto);
            return {
                msg: "Item update with success"
            };
        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || error.msg
            }
        }
    }

    async deleteItem(userId, productId) {
        try {
            const cart = (await (this.getCart(userId))).dataValues;
            await CartProduct.destroy({ where: { productId, cartId: cart.id } });
            return {
                msg: "Product delete with success"
            };
        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || "Error removing product"
            }
        }
    }

    async getCartProduct(userId) {
        try {
            const cart = await Cart.findOne({
                where: { userId, status:  CART_STATUS.ACTIVE },
                include: ["products"]
            });
            if (!cart) {
                return {
                    msg: "No cart available"
                };
            }
            const total = cart.dataValues.products.reduce((acc, next) => acc += (next.price * next.CartProduct.dataValues.amount), 0);
            dataValues.total = total;
            return { cart: cart.dataValues };
        } catch (error) {
            console.log("🚀  ~ file: cart.service.js:93 ~ CartService ~ getCartProduct ~ error:", error);
            throw {
                msg: error?.original?.sqlMessage || "Error getting products"
            };
        }
    }

    async updateCart(userId) {
        try {
            const cart = await this.getCart(userId);
            cart.update({ status: CART_STATUS.FACTORED });
            return {
                msg: "Cart update with success"
            };
        } catch (error) {
            console.log("🚀  ~ file: cart.service.js:107 ~ CartService ~ updateCart ~ error:", error);
            throw {
                msg: error?.original?.sqlMessage || "Error updating cart"
            }
        }
    }
}

module.exports = { CartService };