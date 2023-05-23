const roleValidator = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.role)) {
            next();
        } else {
            res.status(403).json({
                msg: "role not authorize"
            });
        }
    };
};

module.exports = { roleValidator };