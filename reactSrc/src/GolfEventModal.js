import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { apiUrl } from "./config";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%", // Adjust the maximum width of the modal
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "auto", // Enable scrolling when content exceeds the modal height
    maxHeight: "90vh", // Limit the modal height to 90% of the viewport height
  },

  tableContainer: {
    maxHeight: 400,
  },
  playerAvatar: {
    marginRight: theme.spacing(1),
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const GolfEventModal = ({ open, onClose, golfEvent, onEdit }) => {
  console.log("Modal is called here inside" + open);
  console.log("Modal is called here  with golfEvent" + golfEvent);
  const today = new Date(); // Get today's date
  const classes = useStyles();
  // Define a state variable to store the initial registeredPlayers state
  const [initialRegisteredPlayers, setInitialRegisteredPlayers] = useState([]);

  const [editedGolfEvent, setEditedGolfEvent] = useState(golfEvent);
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    editedGolfEvent.date ? new Date(editedGolfEvent.date) : today
  );
  const [displayCount, setDisplayCount] = useState(10);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [registeredPlayers, setRegisteredPlayers] = useState([]);

  useEffect(() => {
    if (open) {
      openModal();
    }
  }, [open]);

  useEffect(() => {
    if (onClose) {
      closeModal();
    }
  }, [onClose]);

  useEffect(() => {
    setSelectedPlayers(golfEvent.players || []);

    async function getPlayersForEvent(eventId) {
      const response = await fetch(
        `${apiUrl}/events/getPlayersForEvent/${eventId}`
      );
      const data = await response.json();
      setSelectedPlayers(data.slice(0, 100));
      //setPlayers(data);
    }

    async function getEventTypes() {
      const response = await fetch(`${apiUrl}/events/types`);
      const data = await response.json();
      setEventTypes(data);
    }

    if (
      golfEvent.id &&
      (golfEvent.players === null || golfEvent.players.length === 0)
    ) {
      getPlayersForEvent(golfEvent.id);
    }

    getEventTypes();

    // Fetch registered players whenever the golfEvent or selectedPlayers change
    if (golfEvent.competition && golfEvent.competition.id) {
      fetchRegisteredPlayers(golfEvent.competition.id);
    }
  }, [golfEvent.id, golfEvent.players]);

  const handleSave = async () => {
    const updatedEvent = {
      ...editedGolfEvent,
      players: selectedPlayers,
      competition: editedGolfEvent.competition,
    };

    try {
      const response = await fetch(
        `${apiUrl}/events/updateEvent/${editedGolfEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (response.ok) {
        // The changes were successfully saved
        onEdit(updatedEvent);
        onClose();
      } else {
        // Handle the error case if the save request was not successful
        // Display an error message or perform any necessary actions
        console.error("Failed to save changes.");
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("Failed to save changes:", error);
    }
    updatePlayers();
  };

  // Function to open the modal
  const openModal = () => {
    setInitialRegisteredPlayers([...registeredPlayers]);
    // Other logic to open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    // Reset the registeredPlayers to the initial state when the modal was opened
    setRegisteredPlayers([...initialRegisteredPlayers]);
    // Other logic to close the modal
  };

  const updatePlayers = () => {
    const selectedPlayerIds = new Set(
      selectedPlayers.map((player) => player.id)
    );

    // Update registeredPlayers to contain only players not in selectedPlayers
    const updatedRegisteredPlayers = initialRegisteredPlayers.filter(
      (player) => !selectedPlayerIds.has(player.id)
    );
    setRegisteredPlayers(updatedRegisteredPlayers);

    console.log(
      "Updated registered players: " + JSON.stringify(updatedRegisteredPlayers)
    );
  };

  const handleDisplayCountChange = (event) => {
    setDisplayCount(event.target.value);
  };

  const handleCancel = () => {
    // Close the modal without saving any changes
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGolfEvent((prevGolfEvent) => ({
      ...prevGolfEvent,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setEditedGolfEvent((prevGolfEvent) => ({
      ...prevGolfEvent,
      date: date, // No need for toISOString() or split("T")[0]
    }));
  };

  const fetchRegisteredPlayers = async (competitionId) => {
    try {
      const response = await fetch(
        `${apiUrl}/competition/retrieveregisteredplayersforcompetition/${competitionId}`
      );
      const data = await response.json();
      console.log(JSON.stringify(data));
      // Exclude the selectedPlayers from registeredPlayers
      const filteredRegisteredPlayers = data.filter(
        (player) =>
          !selectedPlayers.some(
            (selectedPlayer) => selectedPlayer.id === player.id
          )
      );
      console.log("filteredRegistered players is ", filteredRegisteredPlayers);
      setRegisteredPlayers(filteredRegisteredPlayers);
    } catch (error) {
      console.error("Error fetching registered players:", error);
    }
  };

  const removePlayerFromEvent = async (eventId, playerId) => {
    try {
      const response = await fetch(
        `${apiUrl}/events/deletePlayerFromEvent/${eventId}/${playerId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const playerToAddToRegisteredPlayers = selectedPlayers.find(
          (player) => player.id === playerId
        );
        console.log(
          "playerToAddToRegisteredPlayers " + playerToAddToRegisteredPlayers
        );

        // Player successfully removed from the event
        setSelectedPlayers((prevSelectedPlayers) =>
          prevSelectedPlayers.filter((player) => player.id !== playerId)
        );

        if (playerToAddToRegisteredPlayers) {
          setRegisteredPlayers((prevRegisteredPlayers) => [
            ...prevRegisteredPlayers,
            playerToAddToRegisteredPlayers,
          ]);
        }
      } else {
        // Handle the error case if the deletion request was not successful
        // Display an error message or perform any necessary actions
        console.error("Failed to remove player from event.");
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("Failed to remove player from event:", error);
    }
  };

  // Use useEffect to log the updated state values
  useEffect(() => {
    console.log("selectedPlayers is", selectedPlayers);
    console.log("registeredPlayers is", registeredPlayers);
  }, [selectedPlayers, registeredPlayers]);

  const addPlayerToEvent = (playerId) => {
    console.log("player id is " + playerId);
    const playerToAdd = registeredPlayers.find(
      (player) => player.id === playerId
    );
    console.log("player to add is " + playerToAdd);

    setSelectedPlayers((prevSelectedPlayers) => [
      ...prevSelectedPlayers,
      playerToAdd,
    ]);

    setRegisteredPlayers((prevRegisteredPlayers) => {
      const filteredPlayers = prevRegisteredPlayers.filter(
        (player) => player.id !== playerId
      );
      return filteredPlayers;
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="golf-event-modal-title"
      aria-describedby="golf-event-modal-description"
    >
      <div className={classes.paper}>
        <Typography variant="h4" id="golf-event-modal-title" gutterBottom>
          {golfEvent.name}
        </Typography>
        <Box mb={2}>
          <TextField
            name="venue"
            label="Venue"
            value={editedGolfEvent.venue}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="type"
            label="Type"
            select
            value={editedGolfEvent.type}
            onChange={handleInputChange}
            fullWidth
          >
            {eventTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="date"
            label="Date"
            type="date"
            value={new Date(selectedDate).toISOString().split("T")[0]}
            onChange={handleDateChange}
            fullWidth
          />
        </Box>
        <Typography variant="h5" gutterBottom>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <FormControl>
                <InputLabel id="display-count-label"></InputLabel>
                <Select
                  labelId="display-count-label"
                  value={displayCount}
                  onChange={handleDisplayCountChange}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Typography>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Handicap</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedPlayers.slice(0, displayCount).map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.handicap}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        removePlayerFromEvent(editedGolfEvent.id, player.id)
                      }
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Handicap</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registeredPlayers.slice(0, displayCount).map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.handicap}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => addPlayerToEvent(player.id)}
                      color="primary"
                      disabled={selectedPlayers.some(
                        (selectedPlayer) => selectedPlayer.id === player.id
                      )}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className={classes.buttonGroup}>
          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GolfEventModal;
