module.exports = {
  grantAccess: async (req, res, next) => {
    try {
      const { token } = req; //extracting token from request
      if (!token) {
        return res.status(401).send({ message: "Access Denied" });
      } else next(); // if token present then allow the request to move forward
    } catch (error) {
      return res.status(401).send({ message: error });
    }
  },
};
