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
  ButtonGroup,
  FormControl,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import { withRouter } from "react-router-dom";

import ScoreCardService from "../../service/ScoreCardService";
import "../../styles/ViewScoreCards.css"
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    marginTop: theme.spacing(2)
  },
  paddingVertical: {
    padding: '20px 0'
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "100%",
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
}));

const ViewScoreCards = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [scoreCards, setScoreCards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("eventId"); // Default search criteria is eventId

  const handleView = (scoreCard) => {
    // Handle edit functionality
    console.log(JSON.stringify(" score card is " + scoreCard));
    console.log("scorecard eventId is " + scoreCard.eventId);
    console.log("scorecard groupNumber is " + scoreCard.groupNumber);
    navigate(
      `/golf/scorecardview/${scoreCard.eventId}/${scoreCard.groupNumber}`
    );
  };

  useEffect(() => {
    // Fetch score cards data from the backend API
    fetchScoreCards();
  }, []);

  const fetchScoreCards = async () => {
    try {
      const params = {
        eventId: null,
        eventName: null,
        scoreCardId: null,
        scoreCardTitle: null,
      };

      // Map search criteria to the corresponding query parameter
      if (searchCriteria === "eventId") {
        params.eventId = searchText;
      } else if (searchCriteria === "eventName") {
        params.eventName = searchText;
      } else if (searchCriteria === "scoreCardId") {
        params.scoreCardId = searchText;
      } else if (searchCriteria === "scoreCardTitle") {
        params.scoreCardTitle = searchText;
      }

      const response = await ScoreCardService.getScoreCards(params);

      const scoreCardsData = response;
      console.log("Scorecards are " + JSON.stringify(scoreCardsData));
      setScoreCards(scoreCardsData);
    } catch (error) {
      console.error("Error fetching score cards:", error);
    }
  };

  const handleDelete = () => {
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
        <Typography variant="h4" gutterBottom>
          View Score Cards
        </Typography>

        <Grid container spacing={2} className={classes.paddingVertical}>
          <Grid item xs={12} sm={4}>
            <TextField
              id="outlined-controlled"
              type="text"
              value={searchText}
              placeholder="Search..."
              onChange={handleSearchTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchCriteria}
                onChange={handleSearchCriteriaChange}
              >
                <MenuItem value="eventId">Event ID</MenuItem>
                <MenuItem value="eventName">Event Name</MenuItem>
                <MenuItem value="scoreCardId">Score Card ID</MenuItem>
                <MenuItem value="scoreCardTitle">Score Card Group Number</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} >
            <Button variant="contained" onClick={handleSearch} size="large">
              Search
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="left">Group Number</TableCell>
                <TableCell align="center">Players</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreCards.length > 0 ? (
                scoreCards.map((scoreCard) => (
                  <TableRow key={scoreCard.id}>
                    <TableCell align="right">{scoreCard.id}</TableCell>
                    <TableCell align="left">{scoreCard.groupNumber}</TableCell>
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
                        <Button onClick={() => handleView(scoreCard)}>
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
                  <TableCell colSpan={4} align="center">
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
