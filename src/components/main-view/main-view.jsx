// ../main-view/main-view.jsx - parent

import { useEffect, useState } from "react"; // import useState from react

// importing components
import { MovieCard } from "../movie-card/movie-card"; // importing MovieCard
import { MovieView } from "../movie-view/movie-view"; // importing MovieView
import { LoginView } from "../login-view/login-view"; // importing LoginView
import { SignupView } from "../signup-view/signup-view"; // importing SignupView

// import react bootstrap
import { Row, Col, Button } from "react-bootstrap";

// export to import to other components
// creates MainView component
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")); // stores localStorage value as the default for user from LoginView
  const storedToken = localStorage.getItem("token"); // stores localStorage value as the default for token from LoginView
  const [user, setUser] = useState(storedUser); // user is set to storedUser
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

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          {/* if no user is logged in present login or signup */}
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        // if movie is selected, display MovieView
        <Col md={8} style={{ border: "1px solid black" }}>
          <MovieView
            style={{ border: "1px solid green" }}
            movieData={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        // no movies to display, show message
        <div>No movies to display!</div>
      ) : (
        <>
          {/* displays list of movies */}
          {movies.map((movie) => (
            <Col
              className="mb-5"
              key={movie._id}
              md={3}
              style={{ border: "1px solid blue" }}
            >
              <MovieCard
                movieData={movie}
                // displays movie data when user selects a movie
                onMovieClick={(newSelectedMovie) =>
                  setSelectedMovie(newSelectedMovie)
                }
              />
            </Col>
          ))}
        </>
      )}
      <Button
        // logs user out, nullify user and token
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear(); // clears localStorage
        }}
      >
        Logout
      </Button>
    </Row>
  );
};
