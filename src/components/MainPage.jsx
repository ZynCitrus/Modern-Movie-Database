import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/context/AuthContext";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import "../design/MainPage.scss";
import TopMovies from "./TopMovies";

function MainPage() {
  const { user } = useAuth();

  return (
    <>
      <div>
        {user ? (
          <div>
            <h1>Välkommen till din moderna filmdatabas, {user.username}!</h1>
          </div>
        ) : (
          <div>
            <h1>Välkommen till din moderna filmdatabas</h1>
            <h2>Skapa gärna ett konto eller gör en sökning</h2>
          </div>
        )}
        <SearchResult />
        <TopMovies />
      </div>
    </>
  );
}

export default MainPage;
