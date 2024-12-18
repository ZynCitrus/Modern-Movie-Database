import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../context/provider/MovieProvider";
import { useAuth } from "../context/context/AuthContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "../fbconfig/fbconfig";
import styles from "../design/MovieDetails.module.scss";
function MovieDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getMovieDetails(id)
      .then((data) => {
        setMovie(data);
        checkIfFavorite(data.id);
        console.log(data);
      })
      .catch((err) => console.error("Error fetching movie details:", err));
  }, [id]);

  const checkIfFavorite = async (movieId) => {
    if (user && user.uid) {
      const userDocRef = doc(db, `users/${user.uid}`);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const favorites = userDoc.data().favoritesID || [];
        setIsFavorite(favorites.includes(movieId));
      }
    }
  };

  const handleFavorite = async () => {
    if (user && user.uid) {
      const userDocRef = doc(db, `users/${user.uid}`);
      try {
        if (isFavorite) {
          await updateDoc(userDocRef, {
            favoritesID: arrayRemove(movie.id),
          });
        } else {
          await updateDoc(userDocRef, {
            favoritesID: arrayUnion(movie.id),
          });
        }
        setIsFavorite(!isFavorite);
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.MovieDetailsContainer}>
      <div className={styles.MovieDetails}>
        <h1>{movie.title}</h1>
        <img
          className={styles.img}
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <p>
          <strong>Släpptes:</strong> {movie.release_date}
        </p>
        <p>Betyg: {movie.vote_average}</p>
        <p>Genre: {movie.genres.map((genre) => genre.name).join(", ")}</p>

        <p>{movie.overview}</p>
        <button className={styles.favoriteButton} onClick={handleFavorite}>
          {isFavorite ? "TA BORT FAVORIT" : "FAVORITMARKERA"}
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
