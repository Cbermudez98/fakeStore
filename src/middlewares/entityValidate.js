const entityValidate = (schema) => {
    return (req, res, next) => {
        const { value, error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({
                msd: error.details[0].message
            });
        } else {
            next();
        }
    };
};

module.exports = { entityValidate };