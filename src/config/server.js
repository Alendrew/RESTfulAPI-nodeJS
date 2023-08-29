const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const orderRoutes = require('../models/order/order_routes')
const db = require('./dbconfig.js'); 

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

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

app.get("/", (req, res) => {
  res.json({ message: "Hello World." });
});

app.use('/api/v1/orders', orderRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});