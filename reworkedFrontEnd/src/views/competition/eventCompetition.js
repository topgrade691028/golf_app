import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Paper,
  ButtonGroup
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Link } from "react-router-dom";
import { gridSpacing } from 'store/constant';
import GolfEventService from "../../service/GolfEventService";
import GolfEventModalComponent from "../../ui-component/components/GolfEventModal";
import GroupPairingsModal from "../../ui-component/components/GroupPairingsModal";
import "../../styles/ViewGolfEvent.css";
import { useSelector } from "react-redux";

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

const EventCompetition = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const classes = useStyles();
  const { competitionId } = useSelector((state) => state.competition);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pairingsModalIsOpen, setPairingsModalIsOpen] = useState(false);
  const [golfEvents, setGolfEvents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewPairingsModal, setViewPairingsModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await GolfEventService.getAllEventsForCompetition(
        competitionId
      );
      console.log("Setting Golf Events " + JSON.stringify(response));
      setGolfEvents(response); // ...
    }
    fetchData();
  }, [competitionId]);
  console.log('competitionId===>', competitionId);
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

  // const closeModal = () => {
  //   setSelectedEvent(null);
  //   setModalIsOpen(false);
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
    <Grid container spacing={gridSpacing}>
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
    </Grid>
  );
};

export default EventCompetition;
