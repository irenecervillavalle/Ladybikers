import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/index.css";

export function Dashboard() {
  const navigate = useNavigate();
  const { actions, store } = useContext(Context);
  const token = localStorage.getItem("token");
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const [favorite, setFavorite] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_API}/usuario/favoritos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
  }, [isDelete]);

  const deleteFavorite = (id) => {
    fetch(`${process.env.REACT_APP_URL_API}/ruta/${id}/borrar_favorito`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setIsDelete(!isDelete));
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          gap: "20px",
        }}
      >
        <form className="container col-3 mt-5">
          <h1>Tus Datos</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Usuario
            </label>
            <input
              defaultValue={dataUser.user}
              type="text"
              className="form-control 1"
              name="user"
              id="exampleInputEmail1"
              aria-describedby="emailHelp" style={{backgroundColor: "black"}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              defaultValue={dataUser.name}
              className="form-control 1"
              name="user"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{backgroundColor: "black"}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              defaultValue={dataUser.lastName}
              className="form-control 1"
              name="user"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{backgroundColor: "black"}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="text"
              defaultValue={dataUser.email}
              className="form-control 1"
              name="user"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{backgroundColor: "black"}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label 1">
              Telefono
            </label>
            <input
              type="text"
              defaultValue={dataUser.phone}
              className="form-control 1"
              name="user"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{backgroundColor: "black"}}
            />
          </div>
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "45%",
            padding: "10px",
          }}
        >
          <h1>Tus Rutas</h1>
          <div className="cont-card-favorite">
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
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p></p>

                      <i
                        style={{ cursor: "pointer" }}
                        className="fa-solid fa-trash"
                        onClick={() => deleteFavorite(item.id)}
                      ></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
