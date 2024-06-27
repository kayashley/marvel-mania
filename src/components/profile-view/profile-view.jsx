// ../profile-view/profile-view.jsx

// Importing react bootstrap
import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form, Modal } from "react-bootstrap";

// Importing scss
import "./profile-view.scss";

export const ProfileView = ({ user, token, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [isFormVisible, setIsFormVisible] = useState(false);

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
        if (response.ok) {
          alert("Successfully saved changes!");
          return response.json();
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

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="profile-container">
      <Row>
        <Col>
          <Card className="profile-card">
            <Card.Body className="profile-body">
              <Card.Header>
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
                {new Date(user.Birthday).toDateString()}
              </Card.Text>
              <Button variant="primary" onClick={toggleFormVisibility}>
                Edit Profile
              </Button>
            </Card.Body>
          </Card>

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
                  <Button className="form-btn" variant="primary" type="submit">
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};
