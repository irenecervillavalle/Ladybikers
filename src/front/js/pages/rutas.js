import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

const img1="/moteras1.jpg"
const img2="/motohome.jpg"

export const Rutas = () => {
  return (
    <div className="d-grid m-4 gap-4 rejilla-ruta">
      <div className="card flex-row">
        <div className="w-25 miniatura-img" style={{background:`url(${img1}) center`,backgroundSize:"cover"}}/>
        <div className="card-body">
          <h5 className="card-title">Bilbao-Madrid</h5>
          <h6 className="card-subtitle mb-2 text-mute">Dificil</h6>
          <p>lorem ipsum</p>
          <a className="card-link" href="/rutas/1">Ver Ruta</a>
        </div>
        </div>
      <div className="card flex-row">
        <div className="w-25 miniatura-img" style={{background:`url(${img1}) center`,backgroundSize:"cover"}}/>
        <div className="card-body">
          <h5 className="card-title">Bilbao-Madrid</h5>
          <h6 className="card-subtitle mb-2 text-mute">Dificil</h6>
          <p>lorem ipsum</p>
          <a className="card-link" href="/rutas/1">Ver Ruta</a>
        </div>
        </div>
        <div className="card flex-row">
        <div className="w-25 miniatura-img" style={{background:`url(${img1}) center`,backgroundSize:"cover"}}/>
        <div className="card-body">
          <h5 className="card-title">Bilbao-Madrid</h5>
          <h6 className="card-subtitle mb-2 text-mute">Dificil</h6>
          <p>lorem ipsum</p>
          <a className="card-link" href="/rutas/1">Ver Ruta</a>
        </div>
        </div>
        <div className="card flex-row">
        <div className="w-25 miniatura-img" style={{background:`url(${img1}) center`,backgroundSize:"cover"}}/>
        <div className="card-body">
          <h5 className="card-title">Bilbao-Madrid</h5>
          <h6 className="card-subtitle mb-2 text-mute">Dificil</h6>
          <p>lorem ipsum</p>
          <a className="card-link" href="/rutas/1">Ver Ruta</a>
        </div>
        </div>
        <div className="card flex-row">
        <div className="w-25 miniatura-img" style={{background:`url(${img1}) center`,backgroundSize:"cover"}}/>
        <div className="card-body">
          <h5 className="card-title">Bilbao-Madrid</h5>
          <h6 className="card-subtitle mb-2 text-mute">Dificil</h6>
          <p>lorem ipsum</p>
          <a className="card-link" href="/rutas/1">Ver Ruta</a>
        </div>
        </div>
        <div className="card flex-row">
        <div className="w-25 miniatura-img" style={{background:`url(${img1}) center`,backgroundSize:"cover"}}/>
        <div className="card-body">
          <h5 className="card-title">Bilbao-Madrid</h5>
          <h6 className="card-subtitle mb-2 text-mute">Dificil</h6>
          <p>lorem ipsum</p>
          <a className="card-link" href="/rutas/1">Ver Ruta</a>
        </div>
        </div>
       
   </div>
  )

}