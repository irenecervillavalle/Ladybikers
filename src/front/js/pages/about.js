import React from "react";
import { Link } from "react-router-dom";
import "../../styles/about.css";
import moto from "../../img/moto.jpg";

export const About = () => {
  return (
<>
<h1 className="text-center mt-5">Nuestra historia</h1>
<center><img className="imagen" id="img1" src={moto} /></center>
<div className="m-auto card col-4 mt-5">
  <div className="card-body">
    Lady Bikers nace del proyecto de un grupo de amigas, que emprendieron la aventura de querer sentirse libres y escapar de los estereotipos.
    Quisieron dejar de ser las que van de "paquete" para sentir la adrenalina de la conducción.
    Hemos creado este club con el propósito de sobrepasar los límites, pero no el de velocidad.
    Tu seguridad va ante todo.

  </div>
</div>

</>
  )
}