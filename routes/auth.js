const express = require("express");
const routes = express.Router();
const { authRoutes } = require("./auth");
const { signUp, signIn } = require("../controller/auth");
const {
  checkDuplicateUsernameAndEmail,
  checkRoles,
} = require("../middleware/user");

routes.post(
  "/ecomm/api/v1/auth/signup",
  [checkDuplicateUsernameAndEmail, checkRoles],
  signUp
);
routes.post("/ecomm/api/v1/auth/signin", signIn);

module.exports = { authRoutes: routes };
