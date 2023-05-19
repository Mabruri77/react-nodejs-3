const Product = require("../models/productModel")

exports.getAll = async (req, res, next) => {
  try {
    const data = await Product.find({})
    res.status(200).json(data)
  } catch (error) {}
}
