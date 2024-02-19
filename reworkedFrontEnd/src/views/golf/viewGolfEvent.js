import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  ButtonGroup
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";

import GolfEventService from "../../service/GolfEventService";
import "../../styles/ViewGolfEvent.css";
import GolfEventModalComponent from "../../ui-component/components/GolfEventModal";
import GroupPairingsModal from "../../ui-component/components/GroupPairingsModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const ViewGolfEvent = () => {
  const classes = useStyles();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pairingsModalIsOpen, setPairingsModalIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("competitionId");
  const [golfEvents, setGolfEvents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewPairingsModal, setViewPairingsModal] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await GolfEventService.searchGolfEvents(
      searchText,
      searchType
    );
    console.log("Response is:", response);
    setGolfEvents(response);
  };

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
    console.log("Event id in delete is " + JSON.stringify(event));
    try {
      await GolfEventService.deleteGolfEvent(event.id);
      // Remove the deleted event from the state
      setGolfEvents((prevEvents) =>
        prevEvents.filter((e) => {
          console.log("Setting golf event check " + e.id !== event.id);
          console.log("e.id is  " + e.id);
          e.id !== event.id;
        })
      );
    } catch (error) {
      // Handle the error if needed
      console.log("Error deleting golf event:", error);
    }
  };

  // const handleSave = async (event) => {
  //   // Update the server with the edited data and update the state with the new data
  // };

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
      <form onSubmit={handleSearch}>
        <label htmlFor="search-text">Search Text:</label>
        <input
          type="text"
          id="search-text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <label htmlFor="search-type">Search Type:</label>
        <select
          id="search-type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">Select a Type</option>
          <option value="name">Name</option>
          <option value="location">Location</option>
        </select>
        <Button type="submit">Search</Button>
      </form>
      <div className={classes.root}>
        <Container className={classes.container} maxWidth="lg">
          <Paper className={classes.paper}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Events
                </Typography>
              </Box>
              <Box>
                <Link to="/golf/createevent">
                  <Button variant="contained" color="primary">
                    Create
                  </Button>
                </Link>
              </Box>
            </Box>
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
                  {golfEvents.map((event) => (
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
          </Paper>
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

export default ViewGolfEvent;
