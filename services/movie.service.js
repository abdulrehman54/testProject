const MovieModel = require("../models/Movie");

module.exports = {
  list: async (req) => {
    try {
      const movies = await MovieModel.find(); // get list of all movies

      if (movies?.length > 0) {
        return {
          httpCode: 200, // if data present then return array of movies
          data: movies,
        };
      } else
        return {
          httpCode: 204, // if there is no movie then return with status code 204
          data: {},
        };
    } catch (error) {
      return {
        httpCode: 500,
        errors: [{ message: error.message }],
      };
    }
  },
  create: async (req) => {
    try {
      const body = req?.body;
      const existingMovie = await MovieModel.findOne({ title: body.title }); //find movie by title
      if (existingMovie) {
        return {
          // if movie exist then return with error message
          httpCode: 400,
          errors: [{ message: "Movie with this title already exist" }],
        };
      }
      // otherwise create movie
      const movie = await MovieModel.create(body);
      if (movie) {
        return {
          httpCode: 201,
          data: movie,
        };
      } else {
        return {
          httpCode: 400, // to return the error if occur during creating record
          errors: [{ message: "Error in creating movie" }],
        };
      }
    } catch (error) {
      return {
        httpCode: 500,
        errors: [{ message: error.message }],
      };
    }
  },
  show: async (req) => {
    try {
      const { movieId } = req?.params;

      const movie = await MovieModel.findOne({ _id: movieId }); //find movie by id
      if (movie) {
        return {
          // if movie present then return the movie
          httpCode: 200,
          data: movie,
        };
      } else
        return {
          httpCode: 204,
          data: {},
        };
    } catch (error) {
      return {
        httpCode: 500,
        errors: [{ message: error.message }],
      };
    }
  },
};
