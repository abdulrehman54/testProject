const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  req.headers.authorization = `Bearer ${token}`; // set the generated token in req header
  next();
};
