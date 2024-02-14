const express = require("express");
const router = express.Router();
const MovieController = require("../../controller/movie.controller");
const MovieValidator = require("../../validator/movie.validator");
const tokenGenerator = require("../../middlewares/tokenGenerator");
const authenticationMiddleware = require("../../middlewares/authentication");
const auth = require("../../middlewares/auth");
// route to create new movie record
router.post(
  "/",
  MovieValidator.create, // this validate the body
  MovieValidator.validate, // this will check the error present in above validation. If there are error the reponse will return from here with error messages
  MovieController.create
);
// route to get list of movies
router.get(
  "/",
  tokenGenerator, // this middleware generate a token and set in request header
  authenticationMiddleware, // this middleware verify the token validity
  auth.grantAccess, // this middleware grant the access for this route
  MovieController.list
);
// route to get specific movie

router.get(
  "/:movieId",
  MovieValidator.movieId, // this validate the id present in request params
  MovieValidator.validate,
  MovieController.show
);

module.exports = router;
