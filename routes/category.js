const express = require("express");
const {
  createCategory,
  getAllCategory,
  getCategortOnId,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
const { checkNameForCategory, verifyToken, isAdmin } = require("../middleware");
const routes = express.Router();

routes.post(
  "/ecomm/api/v1/categories",
  [checkNameForCategory, verifyToken, isAdmin],
  createCategory
);
routes.get("/ecomm/api/v1/categories", getAllCategory);
routes.get("/ecomm/api/v1/categories/:id", getCategortOnId);
routes.put(
  "/ecomm/api/v1/categories/:id",
  [verifyToken, isAdmin],
  updateCategory
);
routes.delete(
  "/ecomm/api/v1/categories/:id",
  [verifyToken, isAdmin],
  deleteCategory
);

module.exports = { categoryRoutes: routes };
