import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import GolfEventService from "./services/GolfEventService";
import "./ViewGolfEvent.css";
import GolfEventModalComponent from "./GolfEventModal";
import GroupPairingsModal from "./GroupPairingsModal";

import { Container, Paper, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    marginRight: theme.spacing(2),
  },
  createButton: {
    alignSelf: "flex-end",
    marginBottom: theme.spacing(2),
  },
}));

const ViewCompetitionEvents = ({ apiUrl }) => {
  const location = useLocation();
  const competitionId = location?.state?.competitionId;
  const competitionName = location?.state?.competitionName;
  const [searchQuery, setSearchQuery] = useState("");
  const classes = useStyles();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pairingsModalIsOpen, setPairingsModalIsOpen] = useState(false);
  const [golfEvents, setGolfEvents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewPairingsModal, setViewPairingsModal] = useState(false);

  const handleEdit = (event) => {
    // Open the modal and set the current event being edited
    console.log("event is " + JSON.stringify(event));

    setSelectedEvent(event); // Set the current event being edited
    setModalIsOpen(true); // Open the modal
    setShowEditModal(true);
    console.log("Modal open:", modalIsOpen);
  };

  const handleViewPairings = (event) => {
    // Open the modal and set the current event being edited
    console.log("event is " + JSON.stringify(event));

    setSelectedEvent(event); // Set the current event being edited
    setPairingsModalIsOpen(true); // Open the modal
    setViewPairingsModal(true);
    console.log("Pairings Modal open:", pairingsModalIsOpen);
  };

  const handleDelete = async (event) => {
    const response = await GolfEventService.deleteGolfEvent(event.id);
    // Remove the deleted event from the state
  };

  const handleSave = async (event) => {
    // Update the server with the edited data and update the state with the new data
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalIsOpen(false);
  };

  const handleEditedGolfEvent = (editedEvent) => {
    // Do something with the edited golf event
    setGolfEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === editedEvent.id ? editedEvent : event
      )
    );

    console.log("Edited Golf Event:", editedEvent);
  };

  return (
    <div className="view-golf-event-container">
      <div className={classes.root}>
        <Container className={classes.container} maxWidth="lg">
          <Paper className={classes.paper}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography component="h2" variant="h6" color="primary">
                Retrieve Events For A Competition
              </Typography>
              <Link to={`/creategolfevent/${competitionId}`}>
                <Button
                  className={classes.createButton}
                  variant="contained"
                  color="primary"
                >
                  CREATE
                </Button>
              </Link>
            </Box>
            <div className={classes.searchContainer}>
              <TextField
                className={classes.searchInput}
                label="Search by event name"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="contained" color="primary">
                Search
              </Button>
            </div>
          </Paper>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Venue</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {golfEvents
                  .filter((event) =>
                    event.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((event) => (
                    <TableRow key={event.id}>
                      <TableCell align="right">{event.id}</TableCell>
                      <TableCell align="left">{event.name}</TableCell>
                      <TableCell align="left">{event.venue}</TableCell>
                      <TableCell align="left">{event.type || "-"}</TableCell>
                      <TableCell align="left">
                        {event.date
                          ? new Date(event.date).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell align="center">
                        <ButtonGroup
                          color="primary"
                          aria-label="outlined primary button group"
                        >
                          <Button onClick={() => handleEdit(event)}>
                            Edit
                          </Button>
                          <Button onClick={() => handleDelete(event)}>
                            Del
                          </Button>
                          <Button onClick={() => handleViewPairings(event)}>
                            View Pairings
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        {showEditModal && (
          <GolfEventModalComponent
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            golfEvent={selectedEvent}
            onEdit={handleEditedGolfEvent}
          />
        )}

        {showViewPairingsModal && (
          <GroupPairingsModal
            open={showViewPairingsModal}
            onClose={() => setViewPairingsModal(false)}
            golfEvent={selectedEvent}
          />
        )}
      </div>
    </div>
  );
};

export default ViewCompetitionEvents;
