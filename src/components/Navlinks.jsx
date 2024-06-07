import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/context/AuthContext.jsx";

const Navlinks = () => {
  const { user, setUser } = useAuth();

  function logout() {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Log out error:", error);
      });
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            Startsida
          </NavLink>
        </li>
        {user ? (
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
