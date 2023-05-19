const Order = require("../models/orderModel")
const HttpError = require("../models/HttpError")
exports.createOrder = async (req, res, next) => {
  const { orderItems, user, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } =
    req.body
  try {
    const order = await Order.create({
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    res.status(200).json(order)
  } catch (err) {
    const error = new HttpError(err.message, 400)
    return next(error)
  }
}

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id }).populate("user", "name email")
    if (order) {
      res.status(200).json(order)
    } else {
      const err = new HttpError("no order found", 404)
      throw err
    }
  } catch (error) {
    const err = new HttpError(error.message, 404)
    return next(err)
  }
}
