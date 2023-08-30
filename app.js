const express = require("express");
const cors = require("cors");
const orderRoutes = require("./src/models/order/order_routes");
const itemRoutes = require("./src/models/item/item_routes");
const db = require("./src/config/dbconfig.js");

const app = express();

const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: `http://localhost:${PORT}`,
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

app.use("/orders", orderRoutes);
app.use("/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
