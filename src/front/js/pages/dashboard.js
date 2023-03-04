import React, { useContext } from "react";
import { Navigate }  from "react-router-dom"
import { Context } from "../store/appContext.js"

export function Dashboard () {
  const {actions, store} = useContext(Context);
  return (
    <div>
    <h1>Esta es mi pagina de usuario registrado</h1>
    {store.loggedIn ? <span>Bienvenida</span> : <Navigate to="/login" />}
    <button onClick={() => actions.logout()}>Log Out</button>
    </div>
  );
}