const express = require("express");
const cors = require("cors");
const swaggerFile = require('./swagger-output.json')
const swaggerUi = require('swagger-ui-express')
const routes = require("./src/models/routes");
const db = require("./src/config/dbconfig.js");

const app = express();

const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: `http://localhost:${PORT}`,
};

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
