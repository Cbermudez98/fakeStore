const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const encrypt =  (data) => {
    return bcrypt.hashSync(data, salt);
};

const compare = (data, encrypted) => {
    return bcrypt.compareSync(data, encrypted);
};

module.exports = { encrypt, compare };