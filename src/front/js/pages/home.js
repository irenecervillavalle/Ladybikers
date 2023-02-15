import React, { useContext } from "react";
import { Context } from "../store/appContext";
import motohome from "../../img/motohome.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Bienvenidas a nuestro Club!!</h1>
			<div>
			<img src={motohome} />
			</div>
		</div>
	);
};
