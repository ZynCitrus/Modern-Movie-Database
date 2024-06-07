import React from "react";
import { useAuth } from "../context/context/AuthContext"; // Se till att denna sökväg stämmer överens med din filstruktur

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profil</h1>
      {user ? (
        <div>
          <p>Välkommen, {user.email}!</p>{" "}
          {/* Du kan visa andra användarattribut också */}
        </div>
      ) : (
        <p>Ingen användare är inloggad.</p>
      )}
    </div>
  );
};

export default Profile;
