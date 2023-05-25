import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { withRouter } from "react-router-dom";

import ScoreCardService from "./services/ScoreCardService";
import "./ViewScoreCards.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "100%",
    maxWidth: 600,
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },

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

const ViewScoreCards = ({ history }) => {
  const classes = useStyles();
  const [scoreCards, setScoreCards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("eventId"); // Default search criteria is eventId

  const handleEdit = (scoreCard) => {
    // Handle edit functionality
    history.push(`/scorecardview/${scoreCard.id}`);
    history.push(`/scorecardview/${scoreCard.groupNumber}`);
  };

  useEffect(() => {
    // Fetch score cards data from the backend API
    fetchScoreCards();
  }, []);

  const fetchScoreCards = async () => {
    try {
      const response = await ScoreCardService.getScoreCards(
        searchCriteria,
        searchText
        //groupingId,
        //groupingTitle
      );

      const scoreCardsData = response;
      console.log("Scorecards is " + JSON.stringify(scoreCardsData));
      setScoreCards(scoreCardsData);
    } catch (error) {
      console.error("Error fetching score cards:", error);
    }
  };

  const handleDelete = (scoreCard) => {
    // Handle delete functionality
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const handleSearch = () => {
    fetchScoreCards();
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          View Score Cards
        </Typography>

        <Box display="flex" alignItems="center" marginBottom={2}>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="Search..."
          />
          <select value={searchCriteria} onChange={handleSearchCriteriaChange}>
            <option value="eventId">Event ID</option>
            <option value="eventName">Event Name</option>
            <option value="scoreCardId">Score Card ID</option>
            <option value="scoreCardTitle">Score Card Title</option>
          </select>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="right">Group Number</TableCell>{" "}
                {/* Add this line */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreCards.length > 0 ? (
                scoreCards.map((scoreCard) => (
                  <TableRow key={scoreCard.id}>
                    <TableCell align="right">{scoreCard.id}</TableCell>
                    <TableCell align="left">{scoreCard.title}</TableCell>
                    <TableCell align="center">
                      {scoreCard.players.map((player) => (
                        <span key={player.id}>
                          {player.name.split(" ")[0][0]}.
                          {player.name.split(" ")[1]}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        <Button onClick={() => handleEdit(scoreCard)}>
                          View
                        </Button>
                        <Button onClick={() => handleDelete(scoreCard)}>
                          Del
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No score cards found.
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

export default ViewScoreCards;
