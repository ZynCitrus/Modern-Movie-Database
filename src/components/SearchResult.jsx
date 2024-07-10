import React, { useState } from "react";
import { searchMovie } from "../context/provider/MovieProvider";
import "../design/SearchResult.scss";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

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

  const resultsClass =
    movies.length > 0 ? "searchResultsWithContent" : "searchResultsEmpty";

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className={`searchResultsWrapper ${resultsClass}`}>
        <div className="searchResults">
          <ul className="searchResultsList">
            {currentMovies && currentMovies.length > 0 ? (
              <>
                {currentMovies.map((movie) => (
                  <div key={movie.id} className="searchResultsItem">
                    <h4>{movie.title}</h4>
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </Link>
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
              <> </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
