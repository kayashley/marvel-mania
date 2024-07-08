// ../movie-view/movie-view.jsx
// displays information of each movie

// importing react bootstrap
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// importing routing
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-view.scss"; // importing movie-view.scss

export const MovieView = ({ movieData }) => {
  const { movieId } = useParams();

  const movie = movieData.find((m) => m._id === movieId);

  return (
    <>
      <Container>
        <Row>
          <div className="w-100 detail-container">
            <Card className="image-card">
              <Card.Img className="w-100" src={movie.Image} />
            </Card>

            <Card className="detail-card">
              <Card.Header className="detail-header">
                <div className="header-container">
                  <Card.Title className="detail-title">
                    <h3>{movie.Name}</h3>
                  </Card.Title>
                </div>
                <Card.Text>{movie.Rating}</Card.Text>
                <Card.Text>Runtime: {movie.Runtime}</Card.Text>
              </Card.Header>

              <Card.Body>
                <Card.Text>{movie.Synopsis}</Card.Text>
                <Card.Text>Director(s): {movie.Directors}</Card.Text>
                <Card.Text>Genre(s): XX</Card.Text>
              </Card.Body>
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
