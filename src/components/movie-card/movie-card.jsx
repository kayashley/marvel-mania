// ../move-card/movie-card.jsx
// displays list of all movies in its own card

import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card
      className="h-100"
      onClick={() => onMovieClick(movieData)}
      style={{ cursor: "pointer" }}
    >
      <Card.Img className="w-100" variant="top" src={movieData.Image} />
      <Card.Body>
        <Card.Title>{movieData.Name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
