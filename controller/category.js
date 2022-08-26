const { Categories } = require("../models");
const { checkNameForCategory } = require("../middleware/category");

async function createCategory(req, res) {
  const data = req.body;
  const name = data.name;
  const description = data.description;
  try {
    const result = await Categories.create({ name, description });
    console.log(result);
    res.send({ msg: "Category has been created" });
  } catch (err) {
    console.log("err in creating categories", err);
    res.status((500).send({ msg: "Internal server error" }));
  }
}
async function getAllCategory(req, res) {
  try {
    const result = await Categories.findAll();
    res.send(result);
  } catch (err) {
    console.log("err in getting categories", err);
    res.status((500).send({ msg: "Internal server error" }));
  }
}
async function getCategortOnId(req, res) {
  const categoryId = req.params.id;
  try {
    const result = await Categories.findOne({
      where: {
        id: categoryId,
      },
    });
    res.send(result);
  } catch (err) {
    console.log("err in getting categories based on id");
    res.status(500).send({ msg: "internal server error" });
  }
}
async function updateCategory(req, res) {
  const categoryId = req.params.id;
  try {
    const result = await Categories.findOne({
      where: {
        id: categoryId,
      },
    });
    if (result) {
      result.name = req.body.name;
      result.description = req.body.description;
      result.save();
      res.send({ msg: "category updated", updatedCategory: result });
    } else {
      console.log("err in getting category", err);
      res.status(400).send({ msg: "category does not exist" });
    }
  } catch (err) {
    console.log("err in getting categories based on id");
    res.status(500).send({ msg: "internal server error" });
  }
}
async function deleteCategory(req, res) {
  const categoryId = req.params.id;
  try {
    const result = await Categories.destroy({
      where: {
        id: categoryId,
      },
    });
    res.send({ msg: "category destroyed", result });
  } catch (err) {
    console.log("err in deleting categories based on id");
    res.status(500).send({ msg: "internal server error" });
  }
}

module.exports = {
  createCategory,
  getAllCategory,
  getCategortOnId,
  updateCategory,
  deleteCategory,
};
