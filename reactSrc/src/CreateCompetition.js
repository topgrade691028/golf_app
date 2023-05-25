import React, { useState, useEffect } from "react";
import axios from "axios";
//import createCompetitionStyles from "./CreateCompetition.module.css";
import createCompetitionStyles from "./CreateCompetition.css";

export default function CreateCompetition(props) {
  const apiUrl = props.apiUrl;
  console.log("apiUrl is now", apiUrl);
  const [name, setName] = useState("");
  const [competitionType, setCompetitionType] = useState("");
  const [userId, setUserId] = useState("");
  const [competitions, setCompetitions] = useState([]);
  const [newCompetition, setNewCompetition] = useState({});
  const [competitionTypes, setCompetitionTypes] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      const response = await axios.get(
        //`http://localhost:8080/competition/competitions/${userId}`
        `${apiUrl}/competition/user/1`
      );
      setCompetitions(response.data);
    };
    fetchCompetitions();

    fetch("${apiUrl}/competition/competition-type")
      .then((res) => res.json())
      .then((data) => setCompetitionTypes(data));
  }, [userId, newCompetition]);

  const handleNameChange = (e, competitionId) => {
    const newName = e.target.value;
    const newCompetitions = competitions.map((competition) => {
      if (competition.id === competitionId) {
        return { ...competition, name: newName };
      } else {
        return competition;
      }
    });
    setCompetitions(newCompetitions);
  };

  const handleUpdate = (competitionId) => {
    const competition = competitions.find((c) => c.id === competitionId);
    fetch(`${apiUrl}/competition/update/${competition.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(competition),
    });
  };

  const handleDelete = (competitionId) => {
    const newCompetitions = competitions.filter(
      (competition) => competition.id !== competitionId
    );
    setCompetitions(newCompetitions);
    fetch(`${apiUrl}/competition/delete/${competitionId}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  const handleEdit = (competitionId) => {
    setCompetitions((prevCompetitions) => {
      // Find the competition being edited and set its isEditable property to true
      return prevCompetitions.map((competition) => {
        if (competition.id === competitionId) {
          return { ...competition, isEditable: true };
        }
        return competition;
      });
    });
  };

  const handleCompetitionTypeChange = (e) => {
    setCompetitionType(e.target.value);
  };

  const handleNewCompetitionNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const competition = {
      name,
      competitionType, // Move this line here
    };
    try {
      const response = await axios.post(
        `${apiUrl}/competition/createcompetition`,
        competition
      );
      setNewCompetition(response.data);
    } catch (error) {
      console.log("Error creating competition:", error);
    } finally {
    } // Reset events after submitting the form
  };

  return (
    <div className="formWrapper">
      <form onSubmit={handleSubmit} class="new-competition-form">
        <h2>Create a new competition</h2>
        <div className="form-group">
          <label htmlFor="name">Competition name:</label>
          <input
            className="new-competition-input"
            type="text"
            id="name"
            defaultValue={name}
            onChange={handleNewCompetitionNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="competitionType">Competition type:</label>
          <select
            className="new-competition-input"
            id="competitionType"
            value={competitionType}
            onChange={handleCompetitionTypeChange}
          >
            <option value="">Select a competition type</option>
            <option value="StrokePlay">Stroke Play</option>
            <option value="MatchPlay">Match Play</option>
            <option value="Stableford">Stableford</option>
            <option value="Scramble">Scramble</option>
          </select>
        </div>
        <button type="submit">Create Competition</button>
      </form>
      {competitions.length > 0 && (
        <table className="competition-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Events</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {competitions.map((competition) => (
              <tr key={competition.id}>
                <td>
                  <input
                    type="text"
                    value={competition.name}
                    onChange={(e) => handleNameChange(e, competition.id)}
                    disabled={!competition.isEditable}
                  />
                </td>
                <td>
                  <select
                    value={competition.competitionType}
                    onChange={(e) => handleTypeChange(e, competition.id)}
                    disabled={!competition.isEditable}
                  >
                    {competitionTypes &&
                      competitionTypes.map((type) => (
                        <option key={type.id} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                  </select>
                </td>
                <td>{competition.events.length}</td>
                <td>
                  {competition.isEditable ? (
                    <button onClick={() => handleUpdate(competition.id)}>
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(competition.id)}>
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(competition.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
