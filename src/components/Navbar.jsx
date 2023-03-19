import React from "react";
import style from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <div className={style.navbar}>
      <h3>Shopping Cart</h3>
      <nav>
        <ul className="nav_Link">
          <li>
            <NavLink to="/home">Home Page</NavLink>
          </li>
          <li>
            <NavLink to="/fav">Favorites</NavLink>
          </li>
          <li>
            <NavLink to="/box">Box</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
