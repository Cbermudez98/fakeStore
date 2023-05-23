const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");

const verifyToken =  (req, res, next) => {
    try {
        const authorization = req.headers?.authorization?.split(" ")[1] || "";
        if (!authorization) {
            throw {
                status: 403,
                msg: "forbidden"
            }
        }
        const token = jwt.verify(authorization, config.secretKeyEncrypt);
        if (token) {
            req.role = token.role;
            next();
        } else {
            throw {
                status: 403,
                msg: "forbidden"
            }
        }
    } catch (error) {
        res.status(error?.status || 403).json({
            msg: error?.msg || error?.message
        });
    }
};

module.exports = { verifyToken };