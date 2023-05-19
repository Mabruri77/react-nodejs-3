class HtppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.code = statusCode
  }
}

module.exports = HtppError
