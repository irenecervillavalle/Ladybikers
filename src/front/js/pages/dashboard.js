import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export function Dashboard() {
  const { actions, store } = useContext(Context);

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div>
      <h1>Esta es mi pagina de usuario registrado</h1>

      <button onClick={() => actions.logout()}>Log Out</button>
    </div>
  );
}
