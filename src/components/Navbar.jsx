import React from "react";
import "../design/Navbar.scss";
import Navlinks from "./Navlinks";

function Navbar() {
  return (
    <>
      <div className="Navbar">
        <p className="navbarTitle">Modern Movie Database</p>
        <Navlinks />
      </div>
    </>
  );
}

export default Navbar;
