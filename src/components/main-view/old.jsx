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
</Row>;

<Route
  path="/"
  element={
    <>
      {!user ? (
        <Navigate to="/login" replace />
      ) : (
        <>
          {movies.map((movie) => (
            <Col>
              <MovieCard
                key={movie._id}
                movieData={movie}
                onMovieClick={(clickedMovie) => {
                  setSelectedMovie(clickedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </>
  }
/>;

{
  /* login route */
}
<Route
  path="/"
  element={
    <>
      {/* if user is not logged in route them to the login page */}
      {user ? (
        <Navigate to="/" />
      ) : (
        <Col md={5}>
          <LoginView onLoggedIn={(user) => setUser(user)} />
        </Col>
      )}
    </>
  }
/>;
