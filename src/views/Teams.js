import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export const Teams = (props) => {
  const liga = (props.location && props.location.state) || {};

  const [teams, setTeams] = useState([
    {
      "Nombre del Equipo": "Liga sin nombre",
      id: "xxxx-xxxx-xxxx",
    },
  ]);

  const teamsArr = async () => {
    const response = await api.get("/teams");
    setTeams(
      response.data.filter((team) => team["Liga"] === liga["Identificador"])
    );
  };

  useEffect(() => {
    teamsArr();
  }, [setTeams]);

  const handleDelete = async (id) => {
    await api
      .delete(`/teams/${id}`)
      .then(() => setTeams(teams.filter((player) => player.id !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>
        Teams of {liga["Nombre De La Liga"]} League ({teams.length})
        <img
          src={liga["Logo de la Liga"]}
          width="150"
          height="150"
          alt="imagen de la liga"
        ></img>
      </h2>
      <ul>
        {teams.map((team) => {
          return (
            <li key={team["id"]}>
              {team["Nombre del equipo"]}
              <img
                src={team["Logo del Equipo"]}
                width="50"
                height="50"
                alt="imagen de la liga"
              ></img>
              <Link
                className="link_button"
                to={{
                  pathname: "/players",
                  state: team,
                }}
              >
                Details
              </Link>
              <Link
                className="link_button"
                to={{ pathname: "/edit-team", state: team }}
              >
                Edit
              </Link>
              <button
                className="link_button"
                onClick={() => {
                  handleDelete(team["id"]);
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
