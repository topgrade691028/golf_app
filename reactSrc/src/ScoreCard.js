import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Grid,
  Paper,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "120%", // Adjust the maxWidth to a smaller value
    margin: "auto",
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2), // Adjust the padding to create more space
  },
  table: {
    tableLayout: "fixed",
    width: "100%", // Add width: "100%"
  },
  tableCell: {
    padding: theme.spacing(1),
    minWidth: "80px", // Add a minWidth property
  },
  inputField: {
    width: "60px",
    [theme.breakpoints.down("xs")]: {
      width: "40px",
    },
  },
  scrollableTable: {
    maxHeight: "400px",
    overflow: "auto",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1), // Add padding
    [theme.breakpoints.down("xs")]: {
      position: "sticky",
      left: 0,
      backgroundColor: theme.palette.background.default,
      zIndex: 2,
      display: "inline-flex", // Add this line
      flexDirection: "column", // Add this line
      justifyContent: "center", // Add this line
    },
  },
}));

const GolfScoreCard = (props) => {
  const { eventId, groupNumber } = props.match.params;
  const apiUrl = props.apiUrl;
  const [scoreCard, setScoreCard] = useState(null);
  const [scores, setScores] = useState([]);

  const classes = useStyles();
  const tableRef = useRef();

  // Function to handle score input change
  const handleScoreChange = (playerId, holeNumber, value) => {
    const updatedScores = [...scores];
    const scoreIndex = updatedScores.findIndex(
      (score) => score.playerId === playerId && score.holeNumber === holeNumber
    );

    if (scoreIndex > -1) {
      // If score exists, update it
      updatedScores[scoreIndex].value = value;
    } else {
      // Otherwise, add new score
      updatedScores.push({ playerId, holeNumber, value });
    }

    setScores(updatedScores);
  };

  useEffect(() => {
    const fetchScoreCardData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/scorecard/${eventId}/${groupNumber}`
        );
        setScoreCard(response.data);
      } catch (error) {
        console.error("Error fetching scorecard data:", error);
      }
    };

    fetchScoreCardData();
  }, [eventId, groupNumber]);

  // Function to calculate front 9 or back 9 hole totals
  const calculateTotal = (playerId, holes, start, end) => {
    const playerScores = scores.filter(
      (score) =>
        score.playerId === playerId &&
        score.holeNumber >= start &&
        score.holeNumber <= end
    );

    return playerScores.reduce(
      (total, score) => total + parseInt(score.value || 0),
      0
    );
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Send scores to the backend
    // ...

    // Reset scores after submission
    setScores([]);
  };

  if (!scoreCard) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8}>
        <Paper className={classes.paper}>
          {" "}
          {/* Add the paper class */}
          <Container maxWidth="md" className={classes.container}>
            {" "}
            {/* Add the container class */}
            <Typography variant="h1" component="h1">
              {scoreCard.golfEventDTO.name}
            </Typography>
            <Typography variant="h2" component="h2">
              {scoreCard.competition.name}
            </Typography>
            <form onSubmit={handleSubmit}>
              <div ref={tableRef}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: "120px" }}>Marker</TableCell>
                      <TableCell
                        className={`${classes.stickyHeader} ${classes.tableCell}`}
                        style={{ width: "60px" }}
                      >
                        Hole
                      </TableCell>
                      <TableCell style={{ width: "60px" }}>Par</TableCell>
                      <TableCell style={{ width: "100px" }}>
                        White Yards
                      </TableCell>
                      <TableCell style={{ width: "100px" }}>
                        Yellow Yards
                      </TableCell>
                      <TableCell style={{ width: "100px" }}>
                        Stroke Index
                      </TableCell>
                      <TableCell
                        className={`${classes.stickyHeader} ${classes.tableCell}`}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {scoreCard.players.map((player) => (
                            <div key={player.id}>{player.name}</div>
                          ))}
                        </div>
                      </TableCell>

                      <TableCell style={{ width: "60px" }}>W/L/H</TableCell>
                      <TableCell style={{ width: "100px" }}>
                        Red yards
                      </TableCell>
                      <TableCell style={{ width: "60px" }}>Par</TableCell>
                      <TableCell style={{ width: "60px" }}>Index</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {scoreCard.holes.map((hole) => (
                      <TableRow key={hole.id}>
                        <TableCell>{/* Marker */}</TableCell>
                        <TableCell className={classes.stickyHeader}>
                          {hole.holeNumber}
                        </TableCell>
                        <TableCell>{hole.par}</TableCell>
                        <TableCell>{hole.white}</TableCell>
                        <TableCell>{hole.yellow}</TableCell>
                        <TableCell>{hole.stroke}</TableCell>
                        {scoreCard.players.map((player) => (
                          <TableCell key={player.id}>
                            <TextField
                              type="text"
                              value={
                                scores.find(
                                  (score) =>
                                    score.playerId === player.id &&
                                    score.holeNumber === hole.holeNumber
                                )?.value || ""
                              }
                              onChange={(e) =>
                                handleScoreChange(
                                  player.id,
                                  hole.holeNumber,
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                        ))}
                        <TableCell>{/* W/L/H */}</TableCell>
                        <TableCell>{hole.red}</TableCell>
                        <TableCell>{hole.par}</TableCell>
                        <TableCell>{/* Index */}</TableCell>
                      </TableRow>
                    ))}

                    {/* Front 9 and back 9 hole totals */}
                    <TableRow>
                      <TableCell colSpan={6} />
                      {scoreCard.players.map((player) => (
                        <React.Fragment key={player.id}>
                          <TableCell>
                            {calculateTotal(player.id, scoreCard.holes, 1, 9)}
                          </TableCell>
                          <TableCell>
                            {calculateTotal(player.id, scoreCard.holes, 10, 18)}
                          </TableCell>
                        </React.Fragment>
                      ))}
                      <TableCell colSpan={3} />
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
            {/* Bonus point rules */}
            <Typography variant="h3" component="h3">
              Bonus Points
            </Typography>
            {scoreCard.bonusPointRules.map((rule) => (
              <div key={rule.id}>
                <Typography variant="h4" component="h4">
                  {rule.name}
                </Typography>
                <Typography>{rule.description}</Typography>
                <Typography>
                  Hole {rule.holeNumber} - Points: {rule.points}
                </Typography>
              </div>
            ))}
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GolfScoreCard;
