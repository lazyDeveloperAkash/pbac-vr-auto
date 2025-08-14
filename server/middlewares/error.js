// it return error in json format
exports.generatedErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key")
  ) {
    err.message = "User with this Email Address already exists";
  }

  if (err.name === "TokenExpiredError" && err.message.includes("jwt expired")) {
    err.message = "Please Login First";
  }

  res.status(statusCode).json({
    message: err.message,
    success: err.success,
    errName: err.name,
    stack: err.stack,
  });
};