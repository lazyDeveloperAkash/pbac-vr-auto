// it will handle syncronous Errors

class ErrorHandler extends Error {
  constructor(message, statusCode, success) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
    Error.captureStackTrace(this.constructor);
  }
}

module.exports = ErrorHandler;