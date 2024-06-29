// ../move-card/movie-card.jsx
// displays list of all movies in its own card

import PropTypes from "prop-types";
import { useState } from "react";

// importing react bootstrap
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // importing Link

// import scss
import "./movie-card.scss";

export const MovieCard = ({ movieData }) => {
  const [isFavorite, setIsFavorite] = useState(false); // sets isFavorite false

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    setIsFavorite(true);
  };

  return (
    <Card className="h-100" style={{ cursor: "pointer" }}>
      <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>
        <Card.Img
          className="w-100 card-image"
          variant="top"
          src={movieData.Image}
        />
        <Card.Body className="movie-card">
          <Card.Title>
            <h4>{movieData.Name}</h4>
          </Card.Title>
          <Button
            className="fav-btn"
            onClick={handleFavoriteClick}
            variant="link"
          >
            {isFavorite ? "\u2665" : "\u2661"}
          </Button>
        </Card.Body>
      </Link>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
