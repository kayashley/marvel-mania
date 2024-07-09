// ../signup-view/signup-view/jsx

import { useState } from "react"; // importing useState
import { Card, Form, Button } from "react-bootstrap"; // importing react-bootstrap

// SignupView component allows user to create an account
export const SignupView = () => {
  const [username, setUsername] = useState(""); // username is set to an empty string
  const [password, setPassword] = useState(""); // password is set to an empty string
  const [email, setEmail] = useState(""); // email is set to an empty string
  const [birthday, setBirthday] = useState(""); // birthday is set to an empty string

  // submit button function
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents from refreshing

    // creates signup object with user inputs
    const signupData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    // fetches a POST request to the api to create a new user
    fetch("https://mcumarvel-c028170c1f00.herokuapp.com/users/", {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      // checks if response is successful
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
    <div className="signup-container">
      <Card className="signup-card">
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
          <Button className="signup-btn" variant="" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};
