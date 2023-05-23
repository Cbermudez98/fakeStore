const { User } = require("../db/models/user.model.js");
const { encrypt, compare } = require("../utils/bcrypt.js");
const { signToken } = require("../utils/jwt.js");

class UserService {
    constructor() {}

    async createUser(user) {
        try {
            const password = encrypt(user.password);
            const created = await User.create({ ...user, password });
            delete created.dataValues.id;
            delete created.dataValues.password;
            return created.dataValues;
        } catch (error) {
            throw {
                msg: error.original.sqlMessage || "Error creating data"
            }
        }
    };

    async updateUser(id, userDto) {
        try {
            if (userDto.password) {
                userDto.password = encrypt(userDto.password);
            }
            const user = await User.findByPk(id);
            if(!user) {
                throw {
                    msg: "user not found"
                }
            }
            await user.update(userDto);
            return { msg: "User update with success" };
        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || error.msg
            }
        }
    };

    async login(user) {
        try {
            const userInfo = await User.findOne({
                where: [
                    { email: user.email }
                ]
            });
            if (!userInfo) {
                throw {
                    status: 403,
                    msg: "Not email was found"
                }
            }
            const valid = compare(user.password, userInfo.password);
            if (!valid) {
                throw {
                    status: 403,
                    msg: "Password doesn't match"
                }
            }
            return { token: signToken(userInfo.dataValues.role) };
        } catch (error) {
            throw {
                msg: error?.original?.sqlMessage || error.msg,
                status: error.status || ""
            };
        }
        
    };

    async getUser(id) {
        try {
            const user = await User.findByPk(id, {
                include: ["Stores"]
            });
            delete user.dataValues.password;
            return user;
        } catch (error) {
            console.log("🚀  ~ file: user.service.js:80 ~ UserService ~ getUser ~ error:", error);
            throw {
                msg: error?.original?.sqlMessage || "Error getting user"
            };
        }
    }
}

module.exports = { UserService };