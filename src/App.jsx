import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";
import Navlinks from "./components/Navlinks";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import SearchBar from "./components/SearchBar";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} exact={true} />
        <Route path="/login" element={<LoginPage />} exact={true} />
        <Route path="/profile" element={<Profile />} exact={true} />
        <Route path="/register" element={<Register />} exact={true} />
        <Route path="/movie/:id" element={<MovieDetails exact={true} />} />
      </Routes>
    </div>
  );
};

export default App;
