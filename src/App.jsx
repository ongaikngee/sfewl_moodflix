import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";

// const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/'
const API_BASE_URL = "https://restcountries.com/v3.1";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    // Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/name/singapore`;
      // const endpoint = `${API_BASE_URL}/lang/chinese`;
      const response = await fetch(endpoint, API_OPTIONS);

      // Error logging
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      //Error with data
      const data = await response.json();
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      // Setting list into variable
      setMovieList(data);
    } catch (e) {
      console.error(`Error fetching movies: ${e}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <p className="text-white">Loading....</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
              <ul className="text-white">
                {movieList.map((movie, index) => (
                  <li key={index}>{movie.flag +" " + movie.name.common}</li>
                ))}
              </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
