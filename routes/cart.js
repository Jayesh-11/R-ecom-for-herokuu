const express = require("express");
const { updateCart, getCart } = require("../controller/cart");
const { verifyToken } = require("../middleware");
const routes = express.Router();

routes.put("/ecom/api/v1/carts/:id", [verifyToken], updateCart);
routes.get("/ecom/api/v1/carts/:id", [verifyToken], getCart);

module.exports = { cartRoutes: routes };
