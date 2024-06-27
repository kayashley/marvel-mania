// ../move-card/movie-card.jsx
// displays list of all movies in its own card

import PropTypes from "prop-types";
// importing react bootstrap
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // importing Link

export const MovieCard = ({ movieData }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>
      <Card className="h-100" style={{ cursor: "pointer" }}>
        <Card.Img className="w-100" variant="top" src={movieData.Image} />
        <Card.Body>
          <Card.Title>{movieData.Name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
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
