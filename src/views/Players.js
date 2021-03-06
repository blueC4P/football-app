import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export const Players = (props) => {
  const team = (props.location && props.location.state) || {};

  const [players, setPlayers] = useState([
    {
      "Nombre del Equipo": "Liga sin nombre",
      id: "xxxx-xxxx-xxxx",
    },
  ]);

  const playersArr = async () => {
    const response = await api.get("/players");
    setPlayers(
      response.data.filter((player) => team["id"] === player["teamId"])
    );
  };

  useEffect(() => {
    playersArr();
  }, [setPlayers]);

  const handleDelete = async (id) => {
    await api
      .delete(`/players/${id}`)
      .then(() =>
        setPlayers(players.filter((player) => player.id !== id))
      )
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>
        <img src={team["Logo del Equipo"]} width="100" height="100"></img>
        {team["Nombre del equipo"]}'s players ({players.length})
      </h2>
      <hr />
      <Link className="btn btn-primary" 
      to={{ pathname: "/add-player", state: team }}>
        New Player
      </Link>
      <ul>
        {players.map((player) => {
          return (
            <li key={player["id"]}>
              {player["Nombre del Jugador"]}
              <img
                src={player["Avatar"]}
                width="50"
                height="50"
                alt="imagen de la liga"
              ></img>
              <Link
                className="btn btn-primary"
                to={{
                  pathname: "/player",
                  state: player,
                }}
              >
                Details
              </Link>
              <Link
                className="link_button"
                to={{ pathname: "/edit-player", state: player }}
              >
                Edit
              </Link>
              <button
                className="link_button"
                onClick={() => {
                  handleDelete(player["id"]);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
