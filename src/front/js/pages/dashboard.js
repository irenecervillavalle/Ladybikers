import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export function Dashboard() {
  const { actions, store } = useContext(Context);
  const token = localStorage.getItem("token");
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Esta es mi pagina de usuario registrado</h1>
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
    </div>
  );
}
