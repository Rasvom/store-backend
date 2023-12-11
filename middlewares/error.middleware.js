module.exports = async (err, req, res, next) => {
  if (err.status) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500);
};
