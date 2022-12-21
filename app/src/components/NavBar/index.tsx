import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import ngCash from "../../assets/imgs/ngLogo02.jpg";

function NavBar() {
  return (
    <nav id="nav">
      <div className="nav-logo">
        <Link to="/">
          <img src={ngCash} alt="" />
        </Link>
      </div>
      <ul className="nav-options">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/users">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
