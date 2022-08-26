const jwt = require("jsonwebtoken");
const { User } = require("../models");
async function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (token) {
    try {
      const result = await jwt.verify(token, "helloiamsecretkey");
      if (result.id) {
        req.userId = result.id;
        next();
      } else {
        res.status(400).send({ msg: "Auth Token has expired, please relogin" });
      }
    } catch (err) {
      res.status(400).send({ msg: "Auth Token has expired, please relogin" });
    }
  } else {
    res.status(400).send({ msg: "Auth Token is missing" });
  }
}

async function isAdmin(req, res, next) {
  const userId = req.userId;
  try {
    const user = await User.findByPk(userId);
    const userRoles = await user.getRoles();

    for (let i = 0; i < userRoles.length; i++) {
      if (userRoles[i].dataValues.name === "Admin") {
        next();
        return;
      }
    }
    res.status(400).send({ msg: "User does not have admin privilages" });
  } catch (err) {
    console.log(userId);
    res.status(500).send({ msg: "Internal Server Error", err });
    return;
  }
}

module.exports = { verifyToken, isAdmin };
