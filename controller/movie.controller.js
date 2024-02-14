const MovieServices = require("../services/movie.service");
const { responses } = require("../utils/response.js");

module.exports = {
  list: async (req, res) => {
    try {
      const movies = await MovieServices.list(req);
      responses(res, movies);
    } catch (error) {
      responses(res, {
        httpCode: 500,
        errors: [{ message: error.message }],
      });
    }
  },
  create: async (req, res) => {
    try {
      const movie = await MovieServices.create(req);
      responses(res, movie);
    } catch (error) {
      responses(res, {
        httpCode: 500,
        errors: [{ message: error.message }],
      });
    }
  },
  show: async (req, res) => {
    try {
      const movie = await MovieServices.show(req);
      responses(res, movie);
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      });
    }
  },
};
