// ../movie-view/movie-view.jsx
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Container, Row, Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-view.scss";

export const MovieView = ({ movieData, toggleFavorite, favorites }) => {
  const { movieId } = useParams();
  const movie = movieData.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  const isFavorite = favorites.some((fav) => fav._id === movie._id);

  const handleFavoriteClick = () => {
    toggleFavorite(movie);
  };

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
                        {isFavorite ? "\u2665" : "\u2661"}
                      </Button>
                    </Card.Title>
                  </div>

                  <Card.Text>
                    <em>{movie.Rating}</em>
                  </Card.Text>

                  <Card.Text>
                    <em>{movie.Runtime}</em>
                  </Card.Text>
                </div>
              </Card.Header>

              <Card.Body>
                <Card.Text>{movie.Synopsis}</Card.Text>
                <Card.Text>DIRECTORS</Card.Text>
                <Card.Text>GENRES</Card.Text>
              </Card.Body>

              {/* <div className="fav-container">
                      
                    </div> */}

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

MovieView.propTypes = {
  movieData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired,
      Description: PropTypes.string,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }),
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
