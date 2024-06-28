// ../move-card/movie-card.jsx
// displays list of all movies in its own card

import PropTypes from "prop-types";
// importing react bootstrap
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // importing Link

// import scss
import "./movie-card.scss";

export const MovieCard = ({ movieData }) => {
  return (
    <Card className="h-100 movie-card" style={{ cursor: "pointer" }}>
      <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>
        <Card.Img
          className="w-100 card-image"
          variant="top"
          src={movieData.Image}
        />
        <Card.Body>
          <Card.Title>
            <h4>{movieData.Name}</h4>
          </Card.Title>
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
