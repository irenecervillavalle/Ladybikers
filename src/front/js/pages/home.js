import React, { useContext } from "react";
import { Context } from "../store/appContext";
import motohome from "../../img/motohome.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="hero">
			<img src={motohome} alt="Motohome" className="hero_image" />
			<div>
				<h1 className="title"  style={{width:"100%"}}>Bienvenidas a nuestro Club <i className="fa-solid fa-motorcycle"></i></h1>
			</div>
				
		</div>
	);
};
