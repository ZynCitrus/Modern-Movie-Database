import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/context/AuthContext.jsx";
import { auth } from "../fbconfig/fbconfig.js";
import { useNavigate } from "react-router-dom";

const Navlinks = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  function logout() {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Log out error:", error);
      });
  }

  return (
    <nav className="loggedInLinks">
      <ul>
        <li>
          <NavLink exact={true.toString()} to="/">
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
