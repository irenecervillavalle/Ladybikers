import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  const user = localStorage.getItem("user");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
      <div className="container">
        <Link to="/">
          <h3 id="nav1" className="navbar-brand h1 ms-5">
            <i className="fa-solid fa-motorcycle"></i>
            LadyBikers
          </h3>
        </Link>
      </div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <Link to="/about" className="nav-link">
            <li id="nav2" className="nav-item">
              Conocenos
            </li>
          </Link>
          <Link to="/rutas" className="nav-link">
            <li id="nav3" className="nav-item">
              Rutas
            </li>
          </Link>
          <Link to="/contacto" className="nav-link">
            <li id="nav4" className="nav-item">
              Contacto
            </li>
          </Link>
          <Link to="/dashboard" className="nav-link profile">
            <li id="nav5" className="nav-item item-perfil">
              Mi perfil
            </li>
          </Link>
          {user && (
            <div className="icon-user">
              <p>{user[0].toUpperCase()}</p>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};
