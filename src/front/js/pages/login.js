import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { urlApi } from "../config";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";




export const Login = () => {
  const [isError, setIsError] = useState(false);
  const { actions, store } = useContext(Context);
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
     // const resApi = await checkData(data);
    const resApi = checkData(data);
    if (resApi.status === 404) {
      setIsError(true);
    }
    else if (resApi.status === 400) {
      setIsError(true);
  }
    console.log(resApi);
  };

  const checkData = async (data) => {
    /* return fetch (urlApi + "/login",{method: "POST", headers:{"content-type":"application/json"},body:JSON.stringify(data)})
    .then (response => response.json())
    .then (response => {
      return response
    })*/
    if (data.email === "test@gmail.com" && data.password === "test1234") {
      return { msg: "ok" };
    } else {
      return { msg: "credenciales invalidas", status: 404 };
    }
  };

  return (
  <div>
     <h1>Login</h1>
      
        {store.loggedIn ? <Navigate to="/dashboard" /> : <p>Not logged In</p>}
      
    <form className="container col-3 mt-5" onSubmit={onSubmit}>
      {isError && <p>Credenciales Invalidas</p>}

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          name="name"
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
    <p className="text-center">Don??t have an account, please <Link to="/register" relative ="path">register</Link></p>
    </div>
  );
};
