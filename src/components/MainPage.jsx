import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/context/AuthContext";
import SearchBar from "./SearchBar";
import { topMovies } from "../context/provider/MovieProvider";
import "../design/MainPage.scss";

function MainPage() {
  const { user } = useAuth();
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
      <div>
        <SearchBar />
        {user ? (
          <div>
            <p>Välkommen, {user.username}!</p>
          </div>
        ) : (
          <div>
            <h1>Välkommen till din moderna filmdatabas</h1>
            <h2>Skapa gärna ett konto eller gör en sökning</h2>
          </div>
        )}
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
      </div>
    </>
  );
}

export default MainPage;
