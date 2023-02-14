import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
      <div className="container">
        <Link to="/">
          <h3 id="nav1" className="navbar-brand mb-0 h1 ms-5">
            LadyBikers
          </h3>
        </Link>
		</div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <Link to="/about" className="nav-link">
            <li id="nav2" className="nav-item">
              About us
            </li>
          </Link>
          <Link to="/" className="nav-link">
            <li id="nav3" className="nav-item">
              Rutas
            </li>
          </Link>
          <Link to="/" className="nav-link">
            <li id="nav4" className="nav-item">
              Contacto
            </li>
          </Link>
          <Link to="/" className="nav-link">
            <li id="nav5" className="nav-item">
              Account
            </li>
          </Link>
		  </ul>

          </div>
		
    </nav>
  );
};
