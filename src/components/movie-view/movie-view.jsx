// ../movie-view/movie-view.jsx
// displays information of each movie

// importing react bootstrap
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// importing routing
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss"; // importing movie-view.scss

export const MovieView = ({ movieData }) => {
  const { movieId } = useParams();

  const movie = movieData.find((m) => m._id === movieId);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Img className="w-100" src={movie.Image} />
              <Card.Body>
                <Card.Title>{movie.Name}</Card.Title>
                <Card.Text>{movie.Rating}</Card.Text>
                <Card.Text>Runtime: {movie.Runtime}</Card.Text>
                <Card.Text>{movie.Synopsis}</Card.Text>
                <Card.Text>Director(s): {movie.Directors}</Card.Text>
                <Card.Text>Genre(s): {movie.Genres}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Link to={`/`}>
          <Button className="back-button">Back</Button>
        </Link>
      </Container>
    </>
  );
};
