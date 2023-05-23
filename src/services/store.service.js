const { TSVECTOR } = require("sequelize");
const { Store } = require("../db/models/store.model.js");

class StoreService {
    constructor() {}

    async createStore(storeDto) {
        try {
            const store = await Store.create(storeDto);
            delete store.dataValues.id;
            return store;
        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || "Error creating store"
            }
        }
    }

    async getStore(id) {
        try {
            const store = await Store.findByPk(id, {
                include: ["User"],
            });
            if (!store) {
                throw {
                    msg: "Not store was found"
                };
            }
            delete store.dataValues.userId;
            delete store.dataValues.user_id;
            delete store.dataValues.User.dataValues.password;
            return store;
        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || error.msg
            };
        }
    }

    async getStoresProducts(id) {
        try {
            const store = await Store.findByPk(id, {
                include: ["Products"]
            });
            if (!store) {
                throw {
                    msg: "Not store was found"
                };
            }
            delete store.dataValues.userId;
            delete store.dataValues.user_id;
            return store;
        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || error.msg
            };
        }
    }

    async updateStore(id, storeDto) {
        try {
            const store = await Store.findByPk(id);
            if (!store) {
                throw {
                    msg: "Not store was found"
                }
            }
            store.update(storeDto);
            return {
                msg: "Store update with success"
            }

        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || error.msg
            }
        }
    }
}

module.exports = { StoreService };