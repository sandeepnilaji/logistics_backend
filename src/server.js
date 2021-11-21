const express = require("express");
const connect = require("./config/db");
const app = express();
var cors = require("cors");
app.use(cors());

const { register, login } = require("./controllers/loginreg.controller");
const productController = require("./controllers/product.controller");
const membersController = require("./controllers/uers.controller");
const orderController = require("./controllers/order.controller");

app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.use("/products", productController);
app.use("/users", membersController);
app.use("/orders", orderController);

app.listen(9090, async () => {
  await connect();
  console.log("listening to port 9090");
});
