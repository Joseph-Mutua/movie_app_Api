const express = require("express");
const router = express.Router();

const movies = require("../data/movies");

//This will be used by all the routes in this router
function queryRequired(req, res, next) {
  const searchTerm = req.query.query;
  if (!searchTerm) res.json({ msg: "Query is required." });
  next();
}

router.use(queryRequired);

router.get("/movie", (req, res, next) => {
  const searchTerm = req.query.query;
  const results = movies.filter((movie) => {
    let found =
      movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  });

  res.json("Test");
});

router.get("/person", (req, res, next) => {});

module.exports = router;
