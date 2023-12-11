const unAuthorizedError = () => {
  try {
    return new { status: 401, message: "Unauthorized" }();
  } catch (error) {
    return new { status: 500, message: "server error" }();
  }
};

module.exports = { unAuthorizedError };
