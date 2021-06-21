const express = require("express");
const router = express.Router();

const movieDetails = require("../data/movieDetails");

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
module.exports = router;
