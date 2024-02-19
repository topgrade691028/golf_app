import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Container,
  Typography,
  Button,
  Grid,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import axios from "axios";
import EntityCreationConfirmationModal from "../../ui-component/components/EntityCreationConfirmationModal";
import { AuthContext } from "../../service/AuthStateProvider";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateGolfEvent({ competitionId }) {
  const classes = useStyles();
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventCourse, setEventCourse] = useState('');
  const [players, setPlayers] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [golfCourses, setGolfCourses] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;

    async function getEventTypes() {
      console.log("token is " + token);
      const response = await fetch(`${process.env.REACT_APP_API}/events/types`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched event types:", data); // Check the data received from the API
      setEventTypes(data);
    }

    async function getGolfCourses() {
      console.log("Getting golf courses");
      const response = await fetch(`${process.env.REACT_APP_API}/courses/getAll`);
      const data = await response.json();
      setGolfCourses(data);
    }

    if (competitionId == null) {
      // fetchWithAuth all competitions
      axios
        .get(`${process.env.REACT_APP_API}/competition/retrieveAll`)
        .then((response) => {
          if (isMounted) {
            console.log("response.data", response.data);
            setCompetitions(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching competitions:", error);
        });
    } else {
      // Fetch competition by ID
      axios
        .get(`${process.env.REACT_APP_API}/competition/${competitionId}`)
        .then((response) => {
          if (isMounted) {
            console.log("response.data", response.data);
            setCompetitions([response.data]); // Set the competition as an array
          }
        })
        .catch((error) => {
          console.error("Error fetching competition:", error);
        });
    }
    getEventTypes();
    getGolfCourses();
    return () => {
      isMounted = false;
    };
  }, [competitionId]);

  const handleSubmit = (event) => {
    // Handle form submission
    event.preventDefault();
    const data = {
      competition: { id: selectedCompetition },
      name: eventName,
      venue: eventVenue,
      date: eventDate,
      type: eventType,
      golfCourse: eventCourse ? { id: eventCourse } : null,
      players: players
        .filter((player) => player.checked)
        .map((player) => player.id),
    };

    axios
      .post(`${process.env.REACT_APP_API}/events/create`, data)
      .then((response) => {
        console.error("GolfEvent created successfully", response, data);
      })
      .catch((error) => {
        console.error("Error creating competition:", error);
      }); // Send the payload to the create event endpoint
    // ...
    setIsModalOpen(true);

    // Reset the form fields
    setSelectedCompetition("");
    setEventName("");
    setEventVenue("");
    setEventDate("");
    setEventType("");
    setEventCourse("");
    setPlayers([]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container style={{ paddingTop: "2rem" }} maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Golf Event
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                required
                label="Select Competition"
                value={selectedCompetition}
                onChange={(event) => setSelectedCompetition(event.target.value)}
                variant="outlined"
              >
                <MenuItem value="" disabled>
                  Select Competition
                </MenuItem>
                {Array.isArray(competitions) &&
                  competitions.map((competition) => (
                    <MenuItem key={competition.id} value={competition.id}>
                      {competition.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Event Name"
                value={eventName}
                onChange={(event) => setEventName(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Event Venue"
                value={eventVenue}
                onChange={(event) => setEventVenue(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="date"
                label="Event Date"
                value={eventDate}
                onChange={(event) => setEventDate(event.target.value)}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                required
                label="Event Type"
                value={eventType}
                onChange={(event) => setEventType(event.target.value)}
                variant="outlined"
              >
                <MenuItem value="">--Select Event Type--</MenuItem>
                {eventTypes && eventTypes.length > 0 && eventTypes?.map((eventType) => (
                  <MenuItem key={eventType} value={eventType}>
                    {eventType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Event Course"
                value={eventCourse}
                onChange={(event) => setEventCourse(event.target.value)}
                variant="outlined"
              >
                <MenuItem value="">--Select Course--</MenuItem>
                {golfCourses?.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <div>
                <h2>Select Players:</h2>
                {Array.isArray(players) &&
                  players.map((player) => (
                    <div key={player?.id}>
                      <input
                        type="checkbox"
                        id={`player${player?.id}`}
                        name={`player${player?.id}`}
                        value={player?.id}
                        checked={player?.checked || false}
                        onChange={handlePlayerChange}
                      />
                      <label htmlFor={`player${player?.id}`}>
                        {player?.name}
                      </label>
                    </div>
                  ))}
              </div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onChange={handleSubmit}
          >
            Create Event
          </Button>
        </form>
      </div>
      <EntityCreationConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        competitionId={competitionId}
        message={`Successfully created ${eventName} Event for competition id ${competitionId}`}
      />
    </Container>
  );
}
