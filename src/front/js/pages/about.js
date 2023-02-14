import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import moto from "../../img/moto.jpg";

export const About = () => {
  return (
    <div>
<h1>esta es la pagina de nosotras</h1>
<center><img src={moto} />
</center>
</div>
  )
}