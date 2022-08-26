const { Categories } = require("../models");
async function validateProductData(req, res, next) {
  const productData = req.body;
  if (!productData.name) {
    res.status(400).send({ msg: "name is mandatory" });
    return;
  }
  if (productData.CategoryId) {
    const result = await Categories.findByPk(productData.CategoryId);
    if (result) {
      next();
    } else {
      res.status(400).send({ msg: "Id does not match" });
      return;
    }
  } else {
    res.status(400).send({ msg: "Id is mandatory" });
    return;
  }
}

module.exports = { validateProductData };
