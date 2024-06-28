// ../main-view/main-view.jsx - parent

import { useEffect, useState } from "react"; // import useState from react

// importing state-based router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// importing components
import { MovieCard } from "../movie-card/movie-card"; // importing MovieCard
import { MovieView } from "../movie-view/movie-view"; // importing MovieView
import { LoginView } from "../login-view/login-view"; // importing LoginView
import { SignupView } from "../signup-view/signup-view"; // importing SignupView
import { NavBar } from "../nav-bar/nav-bar"; // importing NavBar
import { ProfileView } from "../profile-view/profile-view"; // importing ProfileView

// import react bootstrap
import { Row, Col } from "react-bootstrap";

// export to import to other components
// creates MainView component
export const MainView = () => {
  const storedUser = localStorage.getItem("user"); // stores localStorage value as the default for user from LoginView
  const storedToken = localStorage.getItem("token"); // stores localStorage value as the default for token from LoginView

  // log the values to understand what's retrieved from localStorage
  // console.log("Stored User:", storedUser);
  // console.log("Stored Token:", storedToken);

  // check if storedUser is a valid JSON string before parsing
  let parsedUser = null;
  if (storedUser && typeof storedUser === "string") {
    try {
      parsedUser = JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing storedUser:", error);
    }
  }

  // only parse storedUser if it's not null
  const [user, setUser] = useState(parsedUser); // user is set to parsedUser
  const [token, setToken] = useState(storedToken); // token is set to storedToken
  const [movies, setMovies] = useState([]); // movies is set to an array
  const [selectedMovie, setSelectedMovie] = useState(null); // selectedMovie is set to null

  // fetches api, promise
  useEffect(() => {
    // will not fetch if there's no token
    if (!token) {
      return;
    }
    // api from heroku
    fetch("https://mcumarvel-c028170c1f00.herokuapp.com/movies", {
      // allows for authenticated requests to api
      headers: { Authorization: `Bearer ${token}` },
    })
      // fetches response from default endpoint
      .then((response) => response.json())
      .then((moviesData) => {
        setMovies(moviesData);
      })
      .catch((error) => {
        console.error("Error fetching movies data: ", error);
      });
    console.log("movies from api:", movies);
  }, [token]); // fetches whenever token changes

  // organize movies into rows, 4 movies each
  const renderMovieRows = () => {
    const rows = []; // rows set to empty array
    // iterates through movies array in steps of 4
    for (let i = 0; i < movies.length; i += 4) {
      // constructs a new row component
      rows.push(
        <Row key={i} className="mb-4">
          {/* slices movies array in 4 and creates a col component */}
          {movies.slice(i, i + 4).map((movie) => (
            <Col key={movie._id} md={3}>
              <MovieCard movieData={movie} />
            </Col>
          ))}
        </Row>
      );
    }
    return rows;
  };

  return (
    // state-based router
    <BrowserRouter>
      <NavBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      {/* entire app is enveloped in a container in index.jsx */}
      <Row>
        <Routes>
          {/* movie list route */}
          <Route
            path="/"
            element={
              // if no user (not auth), route to login
              !user ? (
                <Navigate to="/login" replace />
              ) : // no movies, display message
              movies.length === 0 ? (
                <Col>No movies to display!</Col>
              ) : (
                <>
                  {/* renders 4 movies in rows */}
                  {renderMovieRows()}
                  {/* {movies.map((movie) => (
                    <Col className="mb-4" md={3} key={movie._id}>
                      <MovieCard movieData={movie} />
                    </Col>
                  ))} */}
                </>
              )
            }
          />
          {/* signup route */}
          <Route
            path="/signup"
            element={
              // user is routed to signup page
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />
          {/* login route */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                </Col>
              )
            }
          />
          {/* movie details route */}
          <Route
            path="/movies/:movieId"
            element={
              // if no user (not auth), route to login
              !user ? (
                <Navigate to="/login" replace />
              ) : // if no movies, display message
              movies.length === 0 ? (
                <Col>No movies to display!</Col>
              ) : (
                // routes to MovieView
                <MovieView movieData={movies} /> // Pass movies as prop
              )
            }
          />
          {/* profile route */}
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView user={user} token={token} setUser={setUser} />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
