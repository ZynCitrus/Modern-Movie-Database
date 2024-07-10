import React, { useEffect, useState, useRef } from "react";
import { topMovies as fetchTopMovies } from "../context/provider/MovieProvider";
import { Link } from "react-router-dom";

function TopMovies() {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    fetchTopMovies()
      .then((data) => {
        if (data && data.results) {
          setMovies(data.results.slice(0, 10));
          console.log("====================================");
          console.log(movies);
          console.log("====================================");
        }
      })
      .catch((err) => console.error("Error fetching top movies:", err));
  }, []);
  useEffect(() => {
    if (!scrollRef.current || movies.length === 0) return;

    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const scrollStep = () => {
      if (!scrollContainer) return;

      scrollAmount += 1;
      if (
        scrollAmount >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    scrollIntervalRef.current = setInterval(scrollStep, 20);

    return () => clearInterval(scrollIntervalRef.current);
  }, [movies]);

  const handleMouseEnter = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    let scrollAmount = scrollContainer.scrollLeft;

    const scrollStep = () => {
      if (!scrollContainer) return;

      scrollAmount += 1;
      if (
        scrollAmount >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    scrollIntervalRef.current = setInterval(scrollStep, 20);
  };
  return (
    <>
      <div className="topMoviesWrapper">
        <h3>TOP MOVIES</h3>
        <div
          className="topMovies"
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="topMoviesList">
            {movies.map((movie) => (
              <li key={movie.id} className="topMoviesItem">
                <h4>{movie.title}</h4>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
                <p>{movie.overview}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TopMovies;
