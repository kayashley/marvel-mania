// ../movie-view/movie-view.jsx
import PropTypes from "prop-types"; // import PropTypes
import { useParams } from "react-router-dom"; // import useParams
import { Container, Row, Card, Button } from "react-bootstrap"; // importing react bootstrap
import { Link } from "react-router-dom"; // import Link
import "./movie-view.scss"; // import scss

// MovieView component to display details of each movie
export const MovieView = ({ movieData, toggleFavorite, favorites }) => {
  const { movieId } = useParams(); // get movieId from the url param
  const movie = movieData.find((m) => m._id === movieId); // find the movie that matches the movieId

  // if movie is not found, display message
  if (!movie) {
    return <div className="no-movie">Movie not found!</div>;
  }

  // check if current movie is in favorites list
  const isFavorite = favorites.some((fav) => fav._id === movie._id);

  // handle click event for the favorite button
  const handleFavoriteClick = () => {
    toggleFavorite(movie);
  };

  console.log("Directors:", movie.Directors);
  console.log("Genres:", movie.Genres);

  return (
    <>
      <Container>
        <Row>
          {/* image card */}
          <div className="w-100 detail-container">
            <Card className="image-card">
              <Card.Img className="w-100" src={movie.Image} />
            </Card>

            {/* detail card */}
            <Card className="detail-card">
              <Card.Header className="detail-main">
                <div className="header-main">
                  <div className="header-container">
                    <Card.Title className="detail-title">
                      {movie.Name}
                      <Button
                        className="addFav-btn"
                        onClick={handleFavoriteClick}
                        variant={isFavorite ? "" : ""}
                      >
                        {/* favorite button, unicode heart */}
                        {isFavorite ? "\u2665" : "\u2661"}
                      </Button>
                    </Card.Title>
                  </div>
                  <Card.Text>
                    <em>{movie.Rating}</em>
                  </Card.Text>
                </div>

                <div className="movie-details">
                  <Card.Text>
                    <em>{movie.Runtime}</em>
                  </Card.Text>
                  <Card.Text>{movie.ReleaseDate}</Card.Text>
                  <Card.Text className="movie-details">
                    Directed by: {movie.MovieDirector}
                  </Card.Text>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Text>{movie.Synopsis}</Card.Text>

                <Card.Text className="movie-details">
                  <em>{movie.MovieGenre}</em>
                </Card.Text>
              </Card.Body>

              {/* back button to return to home page */}
              <Link to={`/`}>
                <Button className="back-btn">Back</Button>
              </Link>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

// PropTypes for MovieView component
MovieView.propTypes = {
  movieData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired,
      Synopsis: PropTypes.string.isRequired,
      Directors: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          Name: PropTypes.string.isRequired,
        })
      ).isRequired,
      Genres: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          Name: PropTypes.string.isRequired,
        })
      ).isRequired,
      Rating: PropTypes.string.isRequired,
      Runtime: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
