import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moteras1 from "../../img/moteras1.jpg";
import "../../styles/contacto.css";

export const Contacto = () => {
  
  return (
    <>
    
      <center>
        <img className="imagen mb-5" id="img1" src={moteras1} />
      </center>

    <ul className="nav justify-content-center mt-5" style={{color:"black"}}>
      <li className="nav-item">
      <a className="nav-link active" aria-current="page" href="#"><i className="fa-brands fa-twitter" style={{color:"black", fontSize:"40px"}}></i></a>
     </li>
      <li className="nav-item">
      <a className="nav-link" href="#"><i className="fa-brands fa-instagram" style={{color:"black", fontSize:"40px"}}></i></a>
      </li>
      <li className="nav-item">
      <a className="nav-link" href="#"><i class="fa-brands fa-facebook" style={{color:"black", fontSize:"40px"}}></i></a>
      </li>
    </ul>
    </>
  );
};
