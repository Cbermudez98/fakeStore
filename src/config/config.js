require("dotenv").config();

const config = {
    env: process.env.NODE_END || "dev",
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    secretKeyEncrypt: process.env.SECRET_KEY_ENCRYPT
};

module.exports = { config };