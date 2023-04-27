import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import { startTransition } from "react";

const img1 = "/moteras1.jpg";
const img2 = "/motohome.jpg";

export const Rutas = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [rutas, setRutas] = useState([]);
  const [isLike, setIsLike] = useState({});

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    fetch(
      "https://3001-irenecervill-ladybikers-ztsotawghti.ws-eu96.gitpod.io/api/rutas",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => setRutas(data));
  }, []);

  const calificacion = (numero) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (numero >= i) {
        stars.push(<i className="fa-solid fa-star"></i>);
      } else {
        stars.push(
          <i className="fa-solid fa-star" style={{ color: "#5c5a5a" }}></i>
        );
      }
    }
    return stars.map((item, index) => {
      return item;
    });
  };

  const addFavorite = (idRuta) => {
    const token = localStorage.getItem("token");
    fetch(
      `https://3001-irenecervill-ladybikers-ztsotawghti.ws-eu96.gitpod.io/api/ruta/${idRuta}/favorito`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.msg == "Missing Authorization Header") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("dataUser");
          navigate("/login");
        }
      });
    console.log(token);
    console.log(idRuta);
  };

  return (
    <div className="d-grid m-4 gap-4 rejilla-ruta">
      {rutas?.rutas?.map((item) => {
        return (
          <div className="card flex-row">
            <div className="card-body">
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <p>Salida: {item.punto_partida}</p>
                  <p>Llegada: {item.punto_llegada}</p>
                </div>
                <div style={{ width: "50%" }}>
                  <p>Dificultad: {item.categoria}</p>
                  <p>Temporalidad: {item.temporalidad}</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Calificacion: {calificacion(item.valoracion_usuario)}</p>
                <p>
                  Me gusta
                  {isLike[`like${item.id}`] ? (
                    <i
                      class="fa-solid fa-heart like"
                      onMouseOut={() => {
                        setIsLike({ ...isLike, [`like${item.id}`]: false });
                      }}
                      onClick={() => addFavorite(item.id)}
                    ></i>
                  ) : (
                    <i
                      class="fa-regular fa-heart like"
                      onMouseOver={() => {
                        setIsLike({ ...isLike, [`like${item.id}`]: true });
                      }}
                    ></i>
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
