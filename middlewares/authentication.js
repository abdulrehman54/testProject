const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorizationHeaders =
    req.headers.authorization || req.headers.Authorization;
  if (!authorizationHeaders) {
    return res.status(401).send({ message: "No token provided" });
  } else {
    const jwtToken = authorizationHeaders
      ? `${authorizationHeaders}`.split("Bearer ")[1]
      : "";
    jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Invalid token" });
      } else {
        req.token = decoded;
        next();
      }
    });
  }
};
