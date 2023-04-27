import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export function Dashboard() {
  const navigate = useNavigate();
  const { actions, store } = useContext(Context);
  const token = localStorage.getItem("token");
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    fetch(
      "https://3001-irenecervill-ladybikers-ztsotawghti.ws-eu96.gitpod.io/api/usuario/favoritos",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (
          data.msg == "Missing Authorization Header" ||
          data.msg == "Token has expired"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("dataUser");
          navigate("/login");
        }
        setFavorite(data.favoritos);
      });
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <form className="container col-3 mt-5">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Usuario
            </label>
            <input
              defaultValue={dataUser.user}
              type="text"
              className="form-control"
              name="user"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              defaultValue={dataUser.name}
              className="form-control"
              name="user"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              defaultValue={dataUser.lastName}
              className="form-control"
              name="user"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="text"
              defaultValue={dataUser.email}
              className="form-control"
              name="user"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Telefono
            </label>
            <input
              type="text"
              defaultValue={dataUser.phone}
              className="form-control"
              name="user"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div style={{  display: "flex", flexDirection: "column", gap: "15px", width: "45%", padding: "10px" }}>
          <h1>Tus Favoritos</h1>
          {favorite?.map((item) => {
            return (
              <div className="card flex-row">
                <div className="card-body">
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <p>Salida: {item.ruta.punto_partida}</p>
                      <p>Llegada: {item.ruta.punto_llegada}</p>
                    </div>
                    <div style={{ width: "50%" }}>
                      <p>Dificultad: {item.ruta.categoria}</p>
                      <p>Temporalidad: {item.ruta.temporalidad}</p>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
