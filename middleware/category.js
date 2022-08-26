async function checkNameForCategory(req, res, next) {
  const categoryData = req.body;
  if (!categoryData.name) {
    res.status(400).send({ msg: "name is mandatory" });
  } else {
    next();
  }
}

module.exports = { checkNameForCategory };
