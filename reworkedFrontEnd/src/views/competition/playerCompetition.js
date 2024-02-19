import React, { useEffect, useState } from "react";
import {
  Grid,
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
import PlayerService from "../../service/PlayerService";
import "../../styles/ViewScoreCards.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    marginTop: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
}));

const PlayerCompetition = () => {
  const classes = useStyles();
  const [players, setPlayers] = useState([]);
  const [registeredPlayers, setRegisteredPlayers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("competitionId"); // Default search criteria is competitionId
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  useEffect(() => {
    // Fetch players data from the backend API
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      // Call your backend API to fetch players data
      const response = await PlayerService.getAllPlayers();
      const players = response;
      console.log("Players:", players);
      setPlayers(players);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const fetchRegisteredPlayers = async (competitionId) => {
    try {
      // Call your backend API to fetch registered players for the selected competition
      const response = await PlayerService.getAllRegisteredPlayers(
        competitionId
      );
      const registeredPlayers = response || []; // Assign an empty array if response is falsy
      console.log("Registered Players:", registeredPlayers);
      setRegisteredPlayers(registeredPlayers);
    } catch (error) {
      console.error("Error fetching registered players:", error);
    }
  };

  const handleDelete = async (player) => {
    try {
      // Delete the player from the registered players list
      await PlayerService.deleteRegisteredPlayer(player.id);
      // Update the registered players state by filtering out the deleted player
      setRegisteredPlayers((prevState) =>
        prevState.filter((p) => p.id !== player.id)
      );
      // Add the deleted player back to the players list
      setPlayers((prevState) => [...prevState, player]);
    } catch (error) {
      console.error("Error deleting registered player:", error);
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const handleSearch = async () => {
    try {
      // Call your backend API to fetch competitions
      const response = await PlayerService.searchCompetitions(
        searchCriteria,
        searchText
      );
      const competitions = response;
      console.log("Competitions:", competitions);
      setCompetitions(competitions);
    } catch (error) {
      console.error("Error fetching competitions:", error);
    }
  };

  const handleCompetitionSelected = async (competitionId, competitionName) => {
    setSelectedCompetition({ id: competitionId, name: competitionName });
    console.log("in hte handleCompetitionSelected");
    await fetchRegisteredPlayers(competitionId);
  };

  const handleAdd = async (player, selectedCompetition) => {
    try {
      // Add the player to the registered players list
      await PlayerService.registerPlayer(player, selectedCompetition);

      // Fetch the updated list of registered players
      const updatedRegisteredPlayers =
        await PlayerService.getAllRegisteredPlayers(selectedCompetition.id);

      // Update the state with the new list of registered players
      setRegisteredPlayers(updatedRegisteredPlayers);

      // Remove the player from the players list
      setPlayers((prevState) => prevState.filter((p) => p.id !== player.id));
    } catch (error) {
      console.error("Error adding player to registered players:", error);
    }
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Search Competition
        </Typography>

        <Grid display="flex" alignItems="center" marginBottom={2} spacing={2}>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="Search..."
          />
          <select value={searchCriteria} onChange={handleSearchCriteriaChange}>
            <option value="competitionId">Competition ID</option>
            <option value="competitionName">Competition Name</option>
          </select>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Grid>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Competition ID</TableCell>
                <TableCell align="left">Competition Name</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {competitions.length > 0 ? (
                competitions.map((competition) => (
                  <TableRow
                    key={competition.id}
                    onClick={() =>
                      handleCompetitionSelected(
                        competition.id,
                        competition.name
                      )
                    }
                    className={
                      selectedCompetition?.id === competition.id
                        ? "selected"
                        : ""
                    }
                  >
                    <TableCell align="right">{competition.id}</TableCell>
                    <TableCell align="left">{competition.name}</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No competitions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedCompetition && (
          <>
            <Typography variant="h6" gutterBottom>
              Registered Players for {selectedCompetition.name}
            </Typography>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Player Id</TableCell>
                    <TableCell align="left">Player Name</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(registeredPlayers) &&
                    registeredPlayers.length > 0 ? (
                    registeredPlayers.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell align="right">{player.id}</TableCell>
                        <TableCell align="left">{player.name}</TableCell>
                        <TableCell align="center">
                          <ButtonGroup
                            color="primary"
                            aria-label="outlined primary button group"
                          >
                            <Button onClick={() => handleDelete(player)}>
                              Del
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        {Array.isArray(registeredPlayers) &&
                          registeredPlayers.length === 0
                          ? "No registered players"
                          : "Loading..."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        <Typography variant="h6" gutterBottom>
          All Players
        </Typography>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Player Id</TableCell>
                <TableCell align="left">Player Name</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.length > 0 ? (
                players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell align="right">{player.id}</TableCell>
                    <TableCell align="left">{player.name}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        <Button
                          onClick={() => handleAdd(player, selectedCompetition)}
                        >
                          Add
                        </Button>
                        <Button onClick={() => handleDelete(player)}>
                          Del
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No players found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default PlayerCompetition;
