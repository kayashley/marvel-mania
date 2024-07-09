// ../move-card/movie-card.jsx
// displays list of all movies in its own card

import PropTypes from "prop-types"; // import PropTypes

// importing react bootstrap
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // importing Link

// import scss
import "./movie-card.scss";

// MovieCard component to display movie and handle favorite toggle
export const MovieCard = ({ movieData, toggleFavorite, favorites = [] }) => {
  const isFavorite = favorites.some((fav) => fav._id === movieData._id); // check if the current movie is in the favorites list

  // handle click event for the favorite button
  const handleFavoriteClick = (e) => {
    e.preventDefault(); // prevents reload of page
    toggleFavorite(movieData);
  };

  return (
    // display movies within cards
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
            {/* favorite button, unicode heart */}
            {isFavorite ? "\u2665" : "\u2661"}
          </Button>
        </Card.Body>
      </Link>
    </Card>
  );
};

// PropTypes for MovieCard component
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
