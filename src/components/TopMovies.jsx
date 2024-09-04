import React, { useEffect, useState, useRef } from "react";
import { topMovies as fetchTopMovies } from "../context/provider/MovieProvider";
import { Link } from "react-router-dom";
import "../design/TopMovies.scss";

function TopMovies() {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);
  const scrollAnimationRef = useRef(null); // Using requestAnimationFrame reference
  const scrollSpeed = 1; // Adjusted for smoother scroll

  useEffect(() => {
    fetchTopMovies()
      .then((data) => {
        if (data && data.results) {
          setMovies(data.results.slice(0, 10));
        }
      })
      .catch((err) => console.error("Error fetching top movies:", err));
  }, []);

  useEffect(() => {
    if (!scrollRef.current || movies.length === 0) return;

    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const scrollStep = () => {
      if (scrollContainer) {
        scrollAmount += scrollSpeed;
        if (
          scrollAmount >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
        scrollAnimationRef.current = requestAnimationFrame(scrollStep);
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(scrollAnimationRef.current);
  }, [movies]);

  const handleMouseEnter = () => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!scrollRef.current) return;

    scrollAnimationRef.current = requestAnimationFrame(() => {
      const scrollContainer = scrollRef.current;
      let scrollAmount = scrollContainer.scrollLeft;

      const scrollStep = () => {
        if (scrollContainer) {
          scrollAmount += scrollSpeed;
          if (
            scrollAmount >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth
          ) {
            scrollAmount = 0;
          }
          scrollContainer.scrollLeft = scrollAmount;
          scrollAnimationRef.current = requestAnimationFrame(scrollStep);
        }
      };

      scrollAnimationRef.current = requestAnimationFrame(scrollStep);
    });
  };

  return (
    <div className="topMoviesWrapper">
      <h1>TOPPFILMER DENNA VECKA:</h1>
      <div
        className="topMovies"
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul className="topMoviesList">
          {movies.map((movie) => (
            <li key={movie.id} className="topMoviesItem">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="imgTopMovies"
                />
              </Link>
              <p>{movie.overview}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopMovies;
