// ../nav-bar/nav-bar.jsx

// importing react bootstrap
import { Navbar, Container, Nav } from "react-bootstrap";

// importing state based router
import { Link } from "react-router-dom";

import logo from "/img/hero.png";

// import scss
import "./nav-bar.scss";

export const NavBar = ({ user, onLoggedOut }) => {
  return (
    <>
      <Navbar className="nav-main">
        <Container className="nav-container">
          <img className="logo" src={logo} />
          <Navbar.Brand className="nav-header">MARVEL MANIA</Navbar.Brand>

          {/* <Navbar.Toggle className="nav-toggle" aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse>
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
                    <Nav.Link className="nav-link" as={Link} to="/">
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
