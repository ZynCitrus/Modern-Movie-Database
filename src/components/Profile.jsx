import React, { useState, useEffect } from "react";
import { useAuth } from "../context/context/AuthContext";
import { db } from "../fbconfig/fbconfig";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

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
              setFavorites(favoritesDoc.data().movies || []);
            } else {
              console.log("Inga favoriter hittades!");
            }
          } else {
            console.log("Ingen användare hittades!");
          }
        } catch (error) {
          console.error("Fel vid hämtning av dokument:", error);
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
          <h2>Dina favoritmarkerade filmer:</h2>
          <ul>
            {favorites.length > 0 ? (
              favorites.map((favorite, index) => (
                <li key={index}>{favorite}</li>
              ))
            ) : (
              <p>Inga favoritfilmer hittades.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Ingen användare är inloggad.</p>
      )}
    </div>
  );
};

export default Profile;
