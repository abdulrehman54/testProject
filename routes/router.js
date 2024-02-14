const router = require("express").Router();
const movieRoutes = require("./api/movies.routes");

router.use("/api/movies", movieRoutes);

module.exports = router;
