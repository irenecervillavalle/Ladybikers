import React, { useContext } from "react";
import { Context } from "../store/appContext";
import motohome from "../../img/motohome.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="hero">
			<img src={motohome} alt="Motohome" className="hero_image" />
			<h1 className="title">Bienvenidas a nuestro Club</h1>
				
		</div>
	);
};
