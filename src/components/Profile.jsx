import React, { useState, useEffect } from "react";
import { useAuth } from "../context/context/AuthContext";
import { db } from "../fbconfig/fbconfig";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { getMovieByID } from "../context/provider/MovieProvider";
import styles from "../design/Profile.module.scss";
import { fetchRecommended } from "../context/provider/FavoritesProvider";

const Profile = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user && user.uid) {
        try {
          const userDocRef = doc(db, `users/${user.uid}`);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const favoriteMovieIds = userDoc.data().favoritesID || [];
            setFavorites(favoriteMovieIds);
            const movieDetailsPromises = favoriteMovieIds.map((movieId) =>
              getMovieByID(movieId)
            );
            const moviesData = await Promise.all(movieDetailsPromises);
            setMovies(moviesData);
          } else {
            console.log("Ingen användare hittades!");
          }
        } catch (error) {
          console.error("Fel vid hämtning av dokument:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  useEffect(() => {
    const getRecommendedMovies = async () => {
      setLoading(true);

      try {
        if (favorites.length > 0) {
          const allRecommended = [];

          for (const id of favorites) {
            const data = await fetchRecommended(id);
            if (data.results) {
              allRecommended.push(...data.results);
            }
          }

          const uniqueRecommendedMovies = Array.from(
            new Set(allRecommended.map((movie) => movie.id))
          ).map((id) => {
            return allRecommended.find((movie) => movie.id === id);
          });

          setRecommendedMovies(uniqueRecommendedMovies);
        } else {
          setRecommendedMovies([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRecommendedMovies();
  }, [favorites]);
  return (
    <div>
      <h1>Profil</h1>
      {user ? (
        <div>
          <p>Välkommen, {user.username}!</p>
          <h2>Dina Favoritmarkerade filmer:</h2>
          {loading ? (
            <p>Laddar favoritfilmer...</p>
          ) : (
            <div className={styles.favoritesList}>
              <ul className={styles.ul}>
                {movies.map((movie, index) => (
                  <div className={styles.favoriteMovie}>
                    <li key={index}>
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          className={styles.img}
                          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                          alt={movie.title}
                        />{" "}
                      </Link>
                      <div className={styles.favoritesTitle}>
                        <Link to={`/movie/${movie.id}`}>
                          <p className={styles.a}>{movie.title}</p>
                        </Link>
                      </div>
                      <p>Betyg: {movie.vote_average}</p>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}
          {error && <p>Ett fel uppstod: {error.message}</p>}
        </div>
      ) : (
        <p>Ingen användare är inloggad.</p>
      )}
      <h2>Rekommenderade filmer baserat på dina favoriter:</h2>

      {loading ? (
        <p>Laddar rekommenderade filmer...</p>
      ) : (
        <div className={styles.favoritesList}>
          <ul className={styles.ul}>
            {recommendedMovies.map((movie, index) => (
              <div className={styles.favoriteMovie}>
                <li key={index}>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      className={styles.img}
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                    />{" "}
                  </Link>
                  <div className={styles.favoritesTitle}>
                    <Link to={`/movie/${movie.id}`}>
                      <p className={styles.a}>{movie.title}</p>
                    </Link>
                  </div>
                  <p>Betyg: {movie.vote_average}</p>
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
      {error && (
        <p>Ett fel uppstod vid hämtning av rekommendationer: {error.message}</p>
      )}
    </div>
  );
};

export default Profile;
