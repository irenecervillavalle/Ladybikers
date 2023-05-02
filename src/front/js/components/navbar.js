import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [isLogout, setIsLogout] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem('dataUser')
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
      <div className="container">
  
          <h3 id="nav1" className="navbar-brand h1 ms-5" style={{color:"pink",textDecoration:"none"}}>
            <i className="fa-solid fa-motorcycle"></i>
            LadyBikers
          </h3>
      
      </div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <Link to="/" className="nav-link">
            <li id="nav2" className="nav-item">
              Home
            </li>
          </Link>
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
         { user && <Link to="/dashboard" className="nav-link profile">
            <li id="nav5" className="nav-item item-perfil">
              Mi perfil
            </li>
          </Link>}
          {user && (
            <div className="icon-user" onClick={() => setIsLogout(!isLogout)}>
              <p>{user[0].toUpperCase()}</p>
              {isLogout && (
                <div className="cont-logout">
                  <p onClick={logout}>Logout</p>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};
