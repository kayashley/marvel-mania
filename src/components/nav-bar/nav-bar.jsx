// ../nav-bar/nav-bar.jsx

import { Navbar, Container, Nav } from "react-bootstrap"; // importing react bootstrap
import { Link } from "react-router-dom"; // importing state based router
import logo from "/public/img/hero.png";
import "./nav-bar.scss"; // importing scss

export const NavBar = ({ user, onLoggedOut, onHomeClick }) => {
  return (
    <>
      <Navbar className="nav-main" bg="light" expand="lg">
        <Container className="nav-container">
          <img className="logo" src={logo} alt="Logo" />
          <Navbar.Brand className="nav-header">MARVEL MANIA</Navbar.Brand>

          <Navbar.Toggle
            className="nav-toggle"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="nav-menu">
              <Nav className="nav-links">
                {!user && (
                  <>
                    <Nav.Link className="nav-link" as={Link} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link className="nav-link" as={Link} to="/signup">
                      Signup
                    </Nav.Link>
                  </>
                )}
                {user && (
                  <>
                    <Nav.Link
                      className="nav-link"
                      onClick={onHomeClick}
                      as={Link}
                      to="/"
                    >
                      Home
                    </Nav.Link>
                    <Nav.Link className="nav-link" as={Link} to="/profile">
                      Profile
                    </Nav.Link>
                    <Nav.Link className="nav-link" onClick={onLoggedOut}>
                      Logout
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
