import React, { useState, useEffect } from "react";
import axios from "axios";
//import createCompetitionStyles from "./CreateCompetition.module.css";
import createCompetitionStyles from "./CreateCompetition.css";

export default function CreateCompetition() {
  const [name, setName] = useState("");
  const [competitionType, setCompetitionType] = useState("");
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    name: "",
    venue: "",
    type: "",
    date: "",
  });
  const [userId, setUserId] = useState("");
  const [competitions, setCompetitions] = useState([]);
  const [newCompetition, setNewCompetition] = useState({});
  const [competitionTypes, setCompetitionTypes] = useState([]);
  const [newCompetitionName, setNewCompetitionName] = useState("");
  const [newCompetitionType, setNewCompetitionType] = useState("");
  const [nameError, setNameError] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isTypeValid, setIsTypeValid] = useState(false);

  useEffect(() => {
    const fetchCompetitions = async () => {
      const response = await axios.get(
        //`http://localhost:8080/competition/competitions/${userId}`
        `http://localhost:8080/competition/user/1`
      );
      setCompetitions(response.data);
    };
    fetchCompetitions();

    fetch("http://localhost:8080/competition/competition-type")
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

  const handleTypeChange = (event, competitionId) => {
    const newType = event.target.value;
    const updatedCompetitions = competitions.map((c) => {
      if (c.id === competitionId) {
        return { ...c, competitionType: newType };
      }
      return c;
    });
    setCompetitions(updatedCompetitions);
  };

  const handleUpdate = (competitionId) => {
    const competition = competitions.find((c) => c.id === competitionId);
    fetch(`http://localhost:8080/competition/update/${competition.id}`, {
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
    fetch(`http://localhost:8080/competition/delete/${competitionId}`, {
      method: "DELETE",
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

  const handleEventNameChange = (e) => {
    setEvent({ ...event, name: e.target.value });
  };

  const handleEventVenueChange = (e) => {
    setEvent({ ...event, venue: e.target.value });
  };

  const handleEventTypeChange = (e) => {
    setEvent({ ...event, type: e.target.value });
  };

  const handleEventDateChange = (e) => {
    setEvent({ ...event, date: e.target.value });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, event]);
    setEvent({ name: "", venue: "", type: "", date: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const competition = {
      name,
      competitionType,
      events,
    };
    const response = await axios.post(
      "http://localhost:8080/competition/createcompetition",
      competition
    );
    setNewCompetition(response.data);
    setName("");
    setCompetitionType("");
    setEvents([]);
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
            value={name}
            onChange={handleNameChange}
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
        <div className="form-group">
          <label htmlFor="eventName">Event name:</label>
          <input
            className="new-competition-input"
            type="text"
            id="eventName"
            value={event.name}
            onChange={handleEventNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventVenue">Event venue:</label>
          <input
            className="new-competition-input"
            type="text"
            id="eventVenue"
            value={event.venue}
            onChange={handleEventVenueChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventType">Event type:</label>
          <select
            className="new-competition-input"
            id="eventType"
            value={event.type}
            onChange={handleEventTypeChange}
          >
            <option value="">Select an event type</option>
            <option value="Singles">Singles</option>
            <option value="Doubles">Doubles</option>
            <option value="Foursomes">Foursomes</option>
            <option value="Fourball">Fourball</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="eventDate">Event date:</label>
          <input
            className="new-competition-input"
            type="date"
            id="eventDate"
            value={event.date}
            onChange={handleEventDateChange}
          />
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
