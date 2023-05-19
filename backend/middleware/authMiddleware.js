const HttpError = require("../models/HttpError")
const jwt = require("jsonwebtoken")
exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (token != "undefined" && token) {
      const decoded = jwt.decode(token)
      req.user = decoded
      next()
    } else {
      throw new HttpError("not authorized!", 400)
    }
  } catch (error) {
    const err = new HttpError("not authorized!", 400)
    return next(err)
  }
}
