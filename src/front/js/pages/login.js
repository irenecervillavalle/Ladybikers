import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import { urlApi } from "../config";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import SimpleModal from "../components/Modals/SimpleModal";

export const Login = () => {
  const [isError, setIsError] = useState(false);
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);

    const data = {
      user: e.target.user.value,
      password: e.target.password.value,
    };

    const URL =
      "https://3001-irenecervill-ladybikers-ztsotawghti.ws-eu95.gitpod.io/api";

    fetch(`${URL}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Credenciales Invalidas");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", data.user.name);
        localStorage.setItem("dataUser", JSON.stringify(data.user));
        navigate("/rutas");
      })
      .catch((err) => setIsError(true));
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div>
      <h1>Login</h1>

      <SimpleModal open={open} setOpen={setOpen} />

      {store.loggedIn ? <Navigate to="/dashboard" /> : <p>Not logged In</p>}

      <form className="container col-3 mt-5" onSubmit={onSubmit}>
        {isError && <p>Credenciales Invalidas</p>}

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            className="form-control"
            name="user"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
          />
          <p className="rec-password" onClick={openModal}>
            Olvido la contraseña?
          </p>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p className="text-center">
        Don´t have an account, please{" "}
        <Link to="/register" relative="path">
          register
        </Link>
      </p>
    </div>
  );
};
