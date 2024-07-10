import React, { useState, useEffect } from "react";
import { useAuth } from "../context/context/AuthContext";
import { db } from "../fbconfig/fbconfig";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { getMovieByID } from "../context/provider/MovieProvider";

const Profile = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user && user.uid) {
        try {
          const userDocRef = doc(db, `users/${user.uid}`);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const favoritesDocRef = userDoc.data().favoritesID;
            const favoritesDoc = await getDoc(favoritesDocRef);

            if (favoritesDoc.exists()) {
              const favoriteMovies = favoritesDoc.data().movies || [];
              setFavorites(favoriteMovies);
              const movieDetailsPromises = favoriteMovies.map((movieId) =>
                getMovieByID(movieId)
              );
              const moviesData = await Promise.all(movieDetailsPromises);
              setMovies(moviesData);
            } else {
              console.log("Inga favoriter hittades!");
            }
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
            <ul>
              {movies.map((movie, index) => (
                <li key={index}>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                  <p>{movie.title}</p>
                  <p>Betyg: {movie.vote_average}</p>
                </li>
              ))}
            </ul>
          )}
          {error && <p>Ett fel uppstod: {error.message}</p>}
        </div>
      ) : (
        <p>Ingen användare är inloggad.</p>
      )}
    </div>
  );
};

export default Profile;
