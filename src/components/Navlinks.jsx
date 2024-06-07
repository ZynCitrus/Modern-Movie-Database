import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navlinks = () => {
  let [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  function logout() {
    setisAuthenticated = false;
    console.log(isAuthenticated);
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            Startsida
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/profile">Profil</NavLink>
            </li>
            <li>
              <button onClick={logout}>Logga ut</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Logga in</NavLink>
            </li>
            <li>
              <NavLink to="/register">Registrera</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navlinks;
