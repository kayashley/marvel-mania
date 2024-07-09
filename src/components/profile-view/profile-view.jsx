// ../profile-view/profile-view.jsx

import PropTypes from "prop-types";

// importing react bootstrap
import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

// importing scss
import "./profile-view.scss";

export const ProfileView = ({
  user,
  token,
  setUser,
  favorites,
  toggleFavorite,
}) => {
  const [username, setUsername] = useState(user.Username); // set username to user data
  const [password, setPassword] = useState(""); // set password to empty string
  const [email, setEmail] = useState(user.Email); // set email to user data
  const [birthday, setBirthday] = useState(user.Birthday); // set username to user data
  const [isFormVisible, setIsFormVisible] = useState(false); // sets isFormVisible to false

  const removeFavorite = (e, movie) => {
    // e.stopPropagation();
    e.preventDefault();
    toggleFavorite(movie); // toggles the favorite status
  };

  // submits form
  const handleSubmit = (event) => {
    event.preventDefault(); // prevents from reloading page

    const data = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };

    if (password) {
      data["Password"] = password;
    }

    // fetches user data from api
    fetch(
      `https://mcumarvel-c028170c1f00.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        // if response matches, then return new changes
        if (response.ok) {
          alert("Successfully saved changes!");
          return response.json();
          // fails, send message
        } else {
          alert("Update failed. Please try again.");
        }
      })

      .then((data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }
      });
  };

  // toggles form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // renders users favorite movies
  const renderFavoriteMovies = () => {
    if (favorites.length === 0) {
      return <Col className="fav-body">No movies added to favorites!</Col>;
    }

    // Split the favorites array into chunks of 4
    const rows = [];
    for (let i = 0; i < favorites.length; i += 4) {
      const chunk = favorites.slice(i, i + 4);
      rows.push(
        <Row key={i} className="mb-4">
          {chunk.map((movie) => (
            <Col key={movie._id} md={3} className="mb-4">
              <Card className="h-100 movie-card">
                <Card.Img
                  className="w-100 movie-image"
                  variant="top"
                  src={movie.Image}
                />
                <Card.Body className="movie-body">
                  <div className="title-container">
                    <Card.Title className="fav-title">
                      <h4>{movie.Name}</h4>
                      <Button
                        className="remove-btn"
                        variant=""
                        onClick={(e) => removeFavorite(e, movie)}
                      >
                        &times;
                      </Button>
                    </Card.Title>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      );
    }

    return rows;
  };

  return (
    <div className="profile-container">
      <Row>
        <Col>
          {/* profile card */}
          <Card className="profile-card">
            <Card.Body className="profile-body">
              <Card.Header className="profile-header">
                <h3>Hi, {user.Username}</h3>
              </Card.Header>
              <Card.Text>Below are your account settings:</Card.Text>

              {/* users account details */}
              <Card.Text>
                <strong>Username: </strong> {user.Username}
              </Card.Text>
              <Card.Text>
                <strong>Email: </strong> {user.Email}
              </Card.Text>
              <Card.Text>
                <strong>Birthday: </strong>
                {new Date(user.Birthday).toISOString().slice(0, 10)}
              </Card.Text>
              <Button
                className="form-btn"
                variant=""
                onClick={toggleFormVisibility}
              >
                Edit Profile
              </Button>
            </Card.Body>
          </Card>

          {/* edit profile card */}
          {isFormVisible && (
            <Card className="form-card mt-3">
              <Card.Body className="form-body">
                <Card.Header className="form-header">
                  <h3>Edit Profile</h3>
                  <Button
                    className="close-button"
                    onClick={toggleFormVisibility}
                    style={{
                      backgroundColor: "white",
                      color: "gray",
                      border: "none",
                      fontSize: "24px",
                    }}
                  >
                    &times;
                  </Button>
                </Card.Header>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button
                    id="update-btn"
                    className="form-btn"
                    variant=""
                    type="submit"
                  >
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Row className="fav-container">
        <h3 className="fav-header">Favorite Movies</h3>
      </Row>
      <Row className="fav-list">{renderFavoriteMovies()}</Row>
    </div>
  );
};

ProfileView.propTypes = {
  movieData: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};
