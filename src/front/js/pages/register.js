import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { urlApi } from "../config";

export const Register = () => {
  const [isError, setIsError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      name: e.target.name.value,
      phonenumber: e.target.phonenumber.value
    };

    const resApi = checkData(data);



    // const resApi = await checkData(data);
    if (resApi.status === 404) {
      setIsError(true);
    }

    else if (resApi.status === 400) {
        setIsError(true);
    }
    console.log(resApi);
  };

  const checkData = async (data) => {
    /* return fetch (urlApi + "/signup",{method: "POST", headers:{"content-type":"application/json"},body:JSON.stringify(data)})
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
    <form className="container col-3 mt-5" onSubmit={onSubmit}>
      {isError && <p>Credenciales Invalidas</p>}

      <div className="mb-3">
        <label htmlFor="Name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="Name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
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
<div className="mb-3">
    <label htmlFor="phonenumber" className="form-label">Phone Number</label>
    <input type="text" name= "phonenumber" className="form-control" id="phonenumber" aria-describedby="emailHelp"/>
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
  );
};
