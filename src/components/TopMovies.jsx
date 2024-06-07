import React, { useEffect, useState, useRef } from "react";
import { topMovies } from "../context/provider/MovieProvider";

function TopMovies() {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    topMovies()
      .then((data) => {
        if (data && data.results) {
          setMovies(data.results.slice(0, 10));
        }
        console.log(movies);
      })
      .catch((err) => console.error("Error fetching top movies:", err));
  }, []);

  useEffect(() => {
    if (!scrollRef.current || movies.length === 0) return;

    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const scrollStep = () => {
      if (!scrollContainer) return;

      scrollAmount += 1; // Adjust this value to change the scroll speed
      if (
        scrollAmount >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    scrollIntervalRef.current = setInterval(scrollStep, 20); // Adjust the interval to change the scroll speed

    return () => clearInterval(scrollIntervalRef.current);
  }, [movies]);

  const handleMouseEnter = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = scrollContainer.scrollLeft;

    const scrollStep = () => {
      if (!scrollContainer) return;

      scrollAmount += 1; // Adjust this value to change the scroll speed
      if (
        scrollAmount >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    scrollIntervalRef.current = setInterval(scrollStep, 20); // Adjust the interval to change the scroll speed
  };
  return (
    <>
      <div className="topMoviesWrapper">
        <div
          className="topMovies"
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h3>TOP MOVIES</h3>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <h4>{movie.title}</h4>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
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
