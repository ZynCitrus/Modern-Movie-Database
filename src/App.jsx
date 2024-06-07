import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";
import Navlinks from "./components/Navlinks";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
