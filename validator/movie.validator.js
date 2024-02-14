const { body, param, validationResult } = require("express-validator");
// validates the data using express validator
module.exports = {
  //validation check for  movie id
  movieId: [
    param("movieId", "Movie Id is required or invalid")
      .not()
      .isEmpty()
      .isMongoId(),
  ],
  // validated the data for creating movie record
  create: [
    body("title", "title is mandatory or invalid title").not().isEmpty(),
    body("year", "year is mandatory").not().isEmpty(),
    body("genre", "Invalid Genre").isArray(),
  ],
  validate: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => {
        return {
          message: error.msg,
        };
      });
      return res.status(422).json({ error: errorMessages });
    }
    next();
  },
};
