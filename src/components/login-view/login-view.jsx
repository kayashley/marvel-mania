// ../login-view/login-view.jsx

import React, { useState } from "react"; // import useState
import { Card, Form, Button } from "react-bootstrap"; // importing react-bootstrap
import logo from "/img/hero.png"; // importing logo

// LoginView component allows user to login to their account
export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState(""); // sets username to string
  const [password, setPassword] = useState(""); // sets password to string

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents from resending

    // loginData, username and password
    const loginData = {
      Username: username,
      Password: password,
    };

    // fetches POST request to login user
    fetch("https://mcumarvel-c028170c1f00.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed."); // throws error for failed login
        }
        return response.json(); // returns json data for successful login
      })
      .then((loginData) => {
        console.log("Login response: ", loginData);
        if (loginData.user) {
          // allows data storage across browser sessions, prevents user from bieng logged out
          localStorage.setItem("user", JSON.stringify(loginData.user));
          localStorage.setItem("token", loginData.token);
          // calls onLoggedIn callback for a successful login
          onLoggedIn(loginData.user, loginData.token);
          console.log(
            "Logged in successfully!",
            loginData.user,
            loginData.token
          );
        } else {
          alert("No such user exists.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Please try again."); // alert user for failed login
      });
  };

  return (
    <div className="login-container">
      <Card className="h-100 login-card" md={4}>
        <div className="logo-container">
          <img className="login-logo" src={logo} />
        </div>
        <Form onSubmit={handleSubmit} className="login-form">
          {/* Username field */}
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="form-field"
              type="text"
              value={username}
              // listens for changes from the user
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
            ></Form.Control>
          </Form.Group>
          {/* Password field */}
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="form-field"
              type="password"
              value={password}
              // listens for changes from the user
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={5}
            ></Form.Control>
          </Form.Group>
          {/* Submit button */}
          <Button className="login-btn" variant="" type="submit">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};
