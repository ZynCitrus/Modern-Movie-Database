import React from "react";
import { useAuth } from "../context/context/AuthContext";
import SearchBar from "./SearchBar";

function MainPage() {
  const { user } = useAuth();
  console.log("====================================");
  console.log(user);
  console.log("====================================");

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
        <div className="topMovies">TOP MOVIES</div>
      </div>
    </>
  );
}

export default MainPage;
