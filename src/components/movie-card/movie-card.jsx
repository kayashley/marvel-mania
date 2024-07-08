// ../move-card/movie-card.jsx
// displays list of all movies in its own card

import PropTypes from "prop-types";
import { useState } from "react";
import { useParams } from "react-router-dom";

// importing react bootstrap
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // importing Link

// import scss
import "./movie-card.scss";

export const MovieCard = ({ movieData, toggleFavorite, favorites = [] }) => {
  const isFavorite = favorites.some((fav) => fav._id === movieData._id);

  // favorite movies
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    console.log("favorite btn clicked");
    toggleFavorite(movieData);
  };

  return (
    <Card className="h-100 movie-card" style={{ cursor: "pointer" }}>
      <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>
        <Card.Img
          className="w-100 movie-image"
          variant="top"
          src={movieData.Image}
        />
        <Card.Body className="movie-body">
          <Card.Title>
            <h4>{movieData.Name}</h4>
          </Card.Title>
          <Button
            className="fav-btn"
            onClick={handleFavoriteClick}
            variant="link"
          >
            {/* unicode heart */}
            {isFavorite ? "\u2665" : "\u2661"}
          </Button>
        </Card.Body>
      </Link>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
