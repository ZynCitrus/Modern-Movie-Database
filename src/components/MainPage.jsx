import React from "react";
import { useAuth } from "../context/context/AuthContext";

function MainPage() {
  const { user } = useAuth();
  console.log("====================================");
  console.log(user);
  console.log("====================================");

  return (
    <>
      <div>
        {user ? (
          <div>
            <p>Välkommen, {user.username}!</p>
          </div>
        ) : (
          <p>Ingen användare är inloggad.</p>
        )}
        <div className="topMovies">TOP MOVIES</div>
      </div>
    </>
  );
}

export default MainPage;
