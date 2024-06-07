import React from "react";
import { useAuth } from "../context/context/AuthContext";
const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profil</h1>
      {user ? (
        <div>
          <p>Välkommen, {user.username}!</p>
        </div>
      ) : (
        <p>Ingen användare är inloggad.</p>
      )}
    </div>
  );
};

export default Profile;
