import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";


export function Login2 () {
  const { actions, store } = useContext(Context);
  console.log(store.loggedIn)

function tryTo() {
fetch ('/auth', {

  method: "POST",
  body: {

  }
})

}
  
  return (
    <div>
      <h1>Login</h1>
      <p>
      {store.loggedIn ? <Navigate to="/dashboard" /> : <p>Not logged In</p>}
      </p>
    <form>
    <ul>

      <li><label>Username</label><input name="username" required></input></li>
      <li><label>Password</label><input name="password" required></input></li>
    </ul>
    <button type="submit" onClick={tryTo}>Log In Now</button>
   </form>
   </div>
    );
}