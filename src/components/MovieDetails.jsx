import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../context/provider/MovieProvider";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id)
      .then((data) => {
        setMovie(data);
        console.log(data);
      })
      .catch((err) => console.error("Error fetching movie details:", err));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>{movie.overview}</p>
      {/* Lägg till mer detaljerad information här */}
    </div>
  );
}

export default MovieDetails;
