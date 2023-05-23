const express = require("express");
const { config } = require("./src/config/config.js");
const { initServe } = require("./src/routes/server.js");
const { sequelize } = require("./src/libs/sequelize.js");

const app = express();

app.use(express.json());
sequelize.authenticate();

initServe(app);

app.set("SERVER_PORT", config.port);

app.listen(app.get("SERVER_PORT"), () => {
    console.log(`Server running at http://localhost:${app.get("SERVER_PORT")}`);
});
