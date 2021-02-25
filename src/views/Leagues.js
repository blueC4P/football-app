import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";

import api from "../api";
import cat from "../assets/cat.png";

export const Leagues = () => {
  const [leagues, setLeagues] = useState([
    {
      "Nombre De La Liga": "Liga sin nombre",
      Identificador: "xxxx-xxxx-xxxx",
      "Logo de la Liga": cat,
    },
  ]);

  const leaguesArr = async () => {
    const response = await api.get("/leagues");
    setLeagues(response.data);
    console.log(leagues);
  };

  useEffect(() => {
    leaguesArr();
  }, [setLeagues]);

  return (
    <div>
      <h2>Leagues</h2>
      <hr />
      <ul>
        {leagues.map((liga) => {
          return (
            <li>
              {liga["Nombre De La Liga"]}
              <img
                src={liga["Logo de la Liga"]}
                width="50"
                height="50"
                alt="imagen de la liga"
              ></img>
              <Link className="link_button" to="/teams">
                Details
              </Link>
              <Link className="link_button" to="#">
                Edit
              </Link>
              <button className="link_button">Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};