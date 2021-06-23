const express = require("express");
const router = express.Router();

const movieDetails = require("../data/movieDetails");

function requireJSON(req, res, next) {
  if (!req.is("application/json"))
    res.json({ msg: "Content type must be application/json" });
  next();
}

router.param("movieId", (req, res, next) => {
  //Update the db with analytics data

  console.log("Someone hit a route that used the movieId wildcard");
  next();
});

router.get("/top_rated", (req, res, next) => {
  let page = req.query.page;

  if (!page) {
    page = 0;
  }

  const results = movieDetails.sort((a, b) => {
    return b.vote_average - a.vote_average;
  });

  let indexToStart = (page - 1) * 20;
  res.json(results.slice(indexToStart, indexToStart + 20));
});

/* GET movie page */
router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;

  //Anytime you pull anything from the URL, ITS a Query String.
  //You need to convert it to a number if its to be used for that

  const results = movieDetails.find((movie) => movie.id === Number(movieId));
  if (!results)
    return res.json({ msg: "The movie you searched for cannot be found" });
  res.json(results);
});

router.post("/:movieId/rating", requireJSON, (req, res, next) => {
  const movieId = req.params.movieId;

  const userRating = req.body.value;

  if (userRating < 0.5 || userRating > 10)
    res.json({ msg: "Rating must be betweeen .5 and 10" });

  res.json({ msg: "Thank you for submitting your rating", status_code: 200 });
});

router.delete("/:movieId/rating", requireJSON, (req, res, next) => {
  res.json({ msg: "Rating Deleted!" });
});

module.exports = router;
