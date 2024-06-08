import React, { useState } from "react";
import { searchMovie } from "../context/provider/MovieProvider";
import "../design/SearchResult.scss";
import SearchBar from "./SearchBar";

function SearchResult() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 8;

  const handleSearch = (searchQuery) => {
    searchMovie(searchQuery)
      .then((data) => {
        if (data && data.results) {
          setMovies(data.results);
          setCurrentPage(1);
        }
      })
      .catch((err) => console.error("Error fetching movies:", err));
  };

  const indexOfLastMovie = currentPage * resultsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - resultsPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / resultsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startResult = indexOfFirstMovie + 1;
  const endResult = Math.min(indexOfLastMovie, movies.length);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="searchResultsWrapper">
        <div className="searchResults">
          <h3>SÖKRESULTAT</h3>
          <ul className="searchResultsList">
            {currentMovies && currentMovies.length > 0 ? (
              <>
                {currentMovies.map((movie) => (
                  <div key={movie.id} className="searchResultsItem">
                    <h4>{movie.title}</h4>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <p>{movie.overview}</p>
                  </div>
                ))}
                <div className="pagination">
                  <button
                    className="prevResButton"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Föregående
                  </button>
                  <button
                    className="nextResButton"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Nästa
                  </button>
                </div>
                <div className="resultsInfo">
                  <p>
                    Visar {startResult} - {endResult} av {movies.length} filmer
                  </p>
                </div>
              </>
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
