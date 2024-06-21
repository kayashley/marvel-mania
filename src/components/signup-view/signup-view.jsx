// ../signup-view/signup-view/jsx

import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // submit button function
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents from refreshing

    const signupData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://mcumarvel-c028170c1f00.herokuapp.com/users/", {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.ok) {
        console.log(
          "Username:",
          signupData.Username,
          "Password:",
          signupData.Password,
          "Email:",
          signupData.Email,
          "Birthday:",
          signupData.Birthday
        );
        alert("Signup successful!");
        window.location.reload(); // reloads so the user can login
      } else {
        alert("Signup failed. Please try agian."); // alerts user that signup failed
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Username field */}
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          // listens for user change
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
        ></Form.Control>
      </Form.Group>
      {/* Password field */}
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          // listens for user change
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={5}
        ></Form.Control>
      </Form.Group>
      {/* Email field */}
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          // listens for user change
          onChange={(e) => setEmail(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      {/* Birthday field */}
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          // listens for user change
          onChange={(e) => setBirthday(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      {/* Submit button */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
