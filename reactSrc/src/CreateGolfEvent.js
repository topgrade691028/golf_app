import React, { useEffect, useState } from "react";

import createGolfEventStyles from "./create_golf_event.css";

export default function CreateGolfEvent() {
  const [players, setPlayers] = useState([]);
  const [golfCourses, setGolfCourses] = useState([]);
  const [eventCourse, setEventCourse] = useState(""); // define eventCourse state here
  const [selectedGolfCourse, setSelectedGolfCourse] = useState(null);
  const [newGolfCourseName, setNewGolfCourseName] = useState("");
  const [newGolfCourseAddress, setNewGolfCourseAddress] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    fetch("/api/players")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error(error));

    fetch("/api/golfcourses")
      .then((response) => response.json())
      .then((data) => setGolfCourses(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCheckboxChange = (event) => {
    const playerId = Number(event.target.value);
    if (event.target.checked) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    } else {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
    }
  };

  const handleGolfCourseSelect = (event) => {
    const selectedCourseId = Number(event.target.value);
    setSelectedGolfCourse(
      golfCourses.find((course) => course.id === selectedCourseId)
    );
  };

  const handleNewGolfCourseNameChange = (event) => {
    setNewGolfCourseName(event.target.value);
  };

  const handleNewGolfCourseAddressChange = (event) => {
    setNewGolfCourseAddress(event.target.value);
  };

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleEventVenueChange = (event) => {
    setEventVenue(event.target.value);
  };

  const handleEventCourseChange = (event) => {
    setEventVenue(event.target.value);
  };

  const handleEventDateChange = (event) => {
    setEventDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch("/api/golfevents", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Golf event created successfully!");
          form.reset();
        } else {
          alert("Error creating golf event.");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="create-golf-event create-golf-event-container">
      <h1>Create Golf Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventName}
            onChange={handleEventNameChange}
          />
        </div>
        <div>
          <label htmlFor="eventVenue">Event Venue:</label>
          <input
            type="text"
            id="eventVenue"
            name="eventVenue"
            value={eventVenue}
            onChange={handleEventVenueChange}
          />
        </div>
        <div>
          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={eventDate}
            onChange={handleEventDateChange}
          />
        </div>
        <div>
          <label htmlFor="eventCourse">Event Course:</label>
          <select
            id="eventCourse"
            name="eventCourse"
            value={eventCourse}
            onChange={handleEventCourseChange}
          >
            <option value="">--Select Course--</option>
            {golfCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2>Select Players:</h2>
          {players.map((player) => (
            <div key={player.id}>
              <input
                type="checkbox"
                id={`player${player.id}`}
                name={`player${player.id}`}
                value={player.id}
                onChange={handlePlayerChange}
              />
              <label htmlFor={`player${player.id}`}>{player.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
