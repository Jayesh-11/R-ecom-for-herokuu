const { serverPort } = require("./config/server.config");
const express = require("express");
const { Categories, sequelize, Products, Role } = require("./models");
const {
  categoryRoutes,
  productRoutes,
  authRoutes,
  cartRoutes,
} = require("./routes");
const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);

app.listen(serverPort, async () => {
  console.log(serverPort);
  await init();
});

async function init() {
  try {
    await sequelize.sync({ force: true });
    const defaultCategories = [
      {
        name: "Beauty",
        description: "Beauty Products",
      },
      {
        name: "Fragnance",
        description: "Fragnance Products",
      },
      {
        name: "Cloth",
        description: "Clothing Products",
      },
    ];
    const defaultProducts = [
      {
        name: "Make up ",
        description: "good one",
        cost: 420,
        quantity: 20,
        CategoryId: 1,
      },
      {
        name: "Fogg",
        description: "Best one",
        cost: 4200000,
        quantity: 3,
        CategoryId: 2,
      },
      {
        name: "Female shirts",
        description: "For women",
        cost: 4200000,
        quantity: 3,
        CategoryId: 3,
      },
    ];
    const defaultRoles = [
      {
        name: "User",
      },
      {
        name: "Admin",
      },
    ];
    await Categories.bulkCreate(defaultCategories);
    await Products.bulkCreate(defaultProducts);
    await Role.bulkCreate(defaultRoles);
  } catch (err) {
    console.log("err", err);
  }
}
