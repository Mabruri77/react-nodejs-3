const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const HttpError = require("../models/HttpError")
const jwt = require("jsonwebtoken")
exports.login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      const compare = await bcrypt.compare(password, user.password)
      if (compare) {
        const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        })
        const userData = user.toObject()
        delete userData["password"]
        userData["token"] = token
        userData["exp"] = jwt.decode(token).exp
        res.status(200).json(userData)
      } else {
        const err = new HttpError("invalid password", 400)
        throw err
      }
    } else {
      const err = new HttpError("user not found", 400)
      throw err
    }
  } catch (error) {
    const err = new HttpError(error.message, 500)
    return next(err)
  }
}

exports.register = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  try {
    if (password === confirmPassword) {
      const newPass = await bcrypt.hash(password, 10)
      const user = User({
        name,
        email,
        password: newPass,
      })
      await user.save()
      res.status(201).json({ message: "user created successfully" })
    } else {
      const err = new HttpError("failed to create user password and confirm password not same", 400)
      throw err
    }
  } catch (error) {
    const err = new HttpError(error.message, 500)
    return next(err)
  }
}

exports.updateUser = async (req, res, next) => {
  const { name, email, password, newEmail } = req.body
  try {
    const user = await User.findOne({ email })
    user.name = name
    user.email = newEmail
    if (password) {
      user.password = bcrypt.hashSync(password)
    }
    const newUser = await user.save()

    res.status(200).json(newUser)
  } catch (error) {
    const err = new HttpError(error.message, 500)
    return next(err)
  }
}
