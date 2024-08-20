import React from "react";
import "../design/Navbar.scss";
import Navlinks from "./Navlinks";
import { useNavigate, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="Navbar">
        {" "}
        <NavLink exact={true.toString()} to="/">
          <p className="navbarTitle">Modern Movie Database</p>
        </NavLink>
        <Navlinks />
      </div>
    </>
  );
}

export default Navbar;
