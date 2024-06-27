// ../profile-view/profile-view.jsx

// importing react bootstrap
import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form, Modal } from "react-bootstrap";

// importing scss
import "./profile-view.scss";

export const ProfileView = ({ user, token, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [showModal, setShowModal] = useState(false);

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
          return response.json;
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

  const handleShowModal = () => {
    console.log("Before setShowModal:", showModal);
    setShowModal(true);
    console.log("After setShowModal:", showModal);
  };

  useEffect(() => {
    console.log("showModal state changed: ", showModal);
  }, [showModal]);

  return (
    <>
      <Row>
        <Col>
          <Card className="profile-card">
            <Card.Body>
              <Card.Header className="profile-title">
                Hi, {user.Username}
              </Card.Header>
              <Card.Text>Below are your account settings:</Card.Text>

              {/* users account details */}
              <Card.Text>
                <strong>Username: </strong> {user.Username}
              </Card.Text>
              {/* <Card.Text>
                <strong>Password: </strong>
              </Card.Text> */}
              <Card.Text>
                <strong>Email: </strong> {user.Email}
              </Card.Text>
              <Card.Text>
                <strong>Birthday: </strong>
                {new Date(user.Birthday).toDateString()}
              </Card.Text>
              <Button variant="primary" onClick={handleShowModal}>
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* edit users account details through modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* username */}
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            {/* password */}
            {/* <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group> */}
            {/* email */}
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            {/* birthday */}
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
