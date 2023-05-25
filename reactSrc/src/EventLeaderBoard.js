import React, { useState, useEffect } from "react";

function Leaderboard() {
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

  // sort the eventLeaderboard array by totalPoints and then by lowest totalScore value
  eventLeaderboard.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints; // sort by totalPoints in descending order
    }
    return a.totalScore - b.totalScore; // if totalPoints are equal, sort by lowest totalScore value
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Event ID</th>
          <th>Player ID</th>
          <th>Hole</th>
          <th>Total Score</th>
          <th>Total Points</th>
          <th>Holes Played</th>
          <th>Handicap</th>
        </tr>
      </thead>
      <tbody>
        {eventLeaderboard.map((row, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: `rgba(135, 206, 235, ${
                index % 2 === 1 ? "0.2" : "0.4"
              })`,
            }}
          >
            <td>{row.eventId}</td>
            <td>{row.playerId}</td>
            <td>{row.hole}</td>
            <td>{row.totalScore}</td>
            <td>{row.totalPoints}</td>
            <td>{row.holesPlayed}</td>
            <td>{row.handicap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Leaderboard;
