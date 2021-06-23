const express = require("express");
const router = express.Router();

const movies = require("../data/movies");
const people = require("../data/people");

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

  res.json({results});
});

router.get("/person", (req, res, next) => {
  const searchTerm = req.query.query;
  const results = movies.filter((person) => {
    let found = person.name.includes(searchTerm);
    return found;
  });

  res.json({results});
});

module.exports = router;
