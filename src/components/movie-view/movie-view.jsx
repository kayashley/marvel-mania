// ../movie-view/movie-view.jsx
// displays information of each movie

import "./movie-view.scss";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const MovieView = ({ movieData, onBackClick }) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Img className="w-100" src={movieData.Image} />
              <Card.Body>
                <Card.Title>{movieData.Name}</Card.Title>
                <Card.Text>Director(s): </Card.Text>
                <Card.Text>Genre(s): </Card.Text>
                <Card.Text>Runtime: </Card.Text>
                <Card.Text>Description: </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button className="back-button" onClick={onBackClick}>
          Back
        </Button>
      </Container>
    </>
  );
};
