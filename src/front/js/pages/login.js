import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Login = () => {

 const [isError, setIsError] = useState(false)

 const onSubmit = (e) => {
  e.preventDefault();

  const data = {
    email: e.target.email.value,
    password: e.target.password.value,
  };


    const resApi= checkData (data)
    if (resApi.status === 404) {
      setIsError(true)

    }
    console.log(resApi)

  };

   const checkData = (data) => {
    if (data.email === "test@gmail.com" && data.password === "test1234"){
      return {msg :"ok"}
      }else {
        return {msg: "credenciales invalidas", status: 404}
   }

 }

	return (
		<form className="container col-3 mt-5" onSubmit ={onSubmit}>
      {isError && <p>Credenciales Invalidas</p> }
      
  <div className="mb-3">
    <label forHTML="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label forHTML="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" forHTML="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
	);
}
