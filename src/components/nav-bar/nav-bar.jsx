// ../nav-bar/nav-bar.jsx

// importing react bootstrap
import { Navbar, Container, Nav } from "react-bootstrap";
// importing state based router
import { Link } from "react-router-dom";

export const NavBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Marvel Mania</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse>
          <Nav>
            {!user && (
              <>
                <Nav.Link to="/login">Login</Nav.Link>
                <Nav.Link to="/signup">Signup</Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
