import React, { useEffect, useState } from "react";
import { searchMovie } from "../context/provider/MovieProvider";
import "../design/SearchResult.scss";

function SearchResult() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovie("Harry Potter")
      .then((data) => {
        if (data && data.results) {
          setMovies(data.results.slice(0, 10));
        }
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <>
      <div className="searchResultsWrapper">
        <div className="searchResults">
          <h3>SÖKRESULTAT</h3>
          <ul className="searchResultsList">
            {movies && movies.length > 0 ? (
              movies.map((movie) => (
                <div key={movie.id} className="searchResultsItem">
                  <h4>{movie.title}</h4>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p>
                    <strong>Release Date:</strong> {movie.release_date}
                  </p>
                  <p>{movie.overview}</p>
                </div>
              ))
            ) : (
              <li>No movies found</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
