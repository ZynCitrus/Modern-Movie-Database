import React, { useState, useEffect } from "react";
import { useAuth } from "../context/context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profil</h1>
      {user ? (
        <div>
          <p>Välkommen, {user.username}!</p>
          <h2>Dina Favoritmarkerade filmer:</h2>
        </div>
      ) : (
        <p>Ingen användare är inloggad.</p>
      )}
    </div>
  );
};

export default Profile;
