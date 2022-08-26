const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Cart } = require("../models");

async function signUp(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 8);
  console.log("password", password);
  try {
    const user = await User.create({ username, email, password });
    await Cart.create({ id: user.id });
    if (req.body.roles) {
      const roles = req.body.roles;
      const result = await user.setRoles(roles);
      console.log("user defined roles", result);
    } else {
      const result = await user.setRoles([1]);
      console.log("default roles", result);
    }
    res.send({ msg: "user created" });
  } catch (err) {
    res.status(500).send({ msg: "Internal server error" });
  }
}
async function signIn(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (user) {
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        res.status(500).send({ msg: "Wrong username or password" });
        return;
      }
      const token = await jwt.sign({ id: user.id }, "helloiamsecretkey", {
        expiresIn: "110h",
      });
      const authorities = [];
      const roles = await user.getRoles();
      for (let i = 0; i < roles.length; i++) {
        authorities.push(roles[i].name);
      }
      const finalUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        token: token,
        authorities: authorities,
      };
      res.send(finalUser);
      // res.send(token);
    } else {
      res.status(500).send({ msg: "Wrong password or Username" });
    }
  } catch (err) {
    res.status(500).send({ msg: "internal server error" });
  }
}
module.exports = { signUp, signIn };