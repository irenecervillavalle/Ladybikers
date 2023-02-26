import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moteras1 from "../../img/moteras1.jpg";
import "../../styles/contacto.css";

export const Contacto = () => {
  const URL = "https://rickandmortyapi.com/api/character";

  const [resData, setData] = useState("");

  useEffect(() => {
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
         data.results.map( character => console.log(character.name) )
        setData(data)});

    axios(URL).then((data) => console.log(data.data));
  }, []);



  return (
    <div className="grow">
      <center>
        <img id="img" src={moteras1} />
      </center>
     { resData.results?.map( character => {
        return (
          <div
          style={{
            backgroundColor: "white",
            width: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 0px",
            borderRadius : "10px"
          }}
        >
          <img src={character.image} width="100px" height="100px" />
          <h3>{character.name}</h3>
          <p>Status: {character.status}</p>
        </div>
        )
     } )  }
  
    </div>
  );
};
