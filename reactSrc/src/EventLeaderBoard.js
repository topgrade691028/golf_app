import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  table: {
    margin: "auto",
    maxWidth: 600,
    marginTop: 20,
  },
}));

function Leaderboard(props) {
  const { eventId } = props.match.params;
  const classes = useStyles();
  const [eventLeaderboard, setEventLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/scores/event/1`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setEventLeaderboard(data);
        } else {
          console.error("Response data is not an array");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // sort the eventLeaderboard array by totalPoints and then by lowest totalScore value
    eventLeaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints; // sort by totalPoints in descending order
      }
      return a.totalScore - b.totalScore; // if totalPoints are equal, sort by lowest totalScore value
    });
  }, [eventLeaderboard]);

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Event ID</TableCell>
          <TableCell>Player ID</TableCell>
          <TableCell>Hole</TableCell>
          <TableCell>Total Score</TableCell>
          <TableCell>Total Points</TableCell>
          <TableCell>Holes Played</TableCell>
          <TableCell>Handicap</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {eventLeaderboard.map((row, index) => (
          <TableRow
            key={index}
            style={{
              backgroundColor: `rgba(135, 206, 235, ${
                index % 2 === 1 ? "0.2" : "0.4"
              })`,
            }}
          >
            <TableCell>{row.eventId}</TableCell>
            <TableCell>{row.playerId}</TableCell>
            <TableCell>{row.hole}</TableCell>
            <TableCell>{row.totalScore}</TableCell>
            <TableCell>{row.totalPoints}</TableCell>
            <TableCell>{row.holesPlayed}</TableCell>
            <TableCell>{row.handicap}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Leaderboard;
