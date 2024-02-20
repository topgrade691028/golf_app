import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from "react-router";
import useStyles from './styles';

const EventScoreCard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { eventId, groupNumber } = useParams();
  const [scoreCardData, setScoreCardData] = useState(null);
  // const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentHoleIndex, setCurrentHoleIndex] = useState(0);

  const [scoreInputValue, setScoreInputValue] = useState("");
  // const [currentHoleT, setCurrentHoleT] = useState(null);

  // const [calculatedPoints, setCalculatedPoints] = useState(0);

  const [holePoints, setHolePoints] = useState([]);

  const [playerPointsMap, setPlayerPointsMap] = useState(new Map());
  console.log(scoreInputValue, holePoints);
  useEffect(() => {
    const fetchScoreCardData = async () => {
      try {
        const scoreCardResponse = await fetch(
          `${process.env.REACT_APP_API}/scorecard/${eventId}/${groupNumber}`
        );

        const scoreResponse = await fetch(
          `${process.env.REACT_APP_API}/event/playergroup?eventId=${eventId}&playerGroupId=${groupNumber}`
        );

        const scoreCardData = await scoreCardResponse.json();
        const scoresData = await scoreResponse.json(); // Extract the JSON data from the response

        // Check if scoreDTOs is null or empty
        if (!scoreCardData.scoreDTOs || scoreCardData.scoreDTOs.length === 0) {
          let currentPlayerId;
          if (scoresData) {
            currentPlayerId = scoreCardData.players[0].id;
          } else {
            currentPlayerId = scoresData[0].playerId;
          }
          console.log(currentPlayerId);
          const holesCount = scoreCardData.holes.length;

          // Create a new scoreDTOs array and populate it
          const newScoreDTOs = [];

          scoreCardData.players.forEach((player) => {
            for (let i = 0; i < holesCount; i++) {
              newScoreDTOs.push({
                playerId: player.id, // Use "id" instead of "playerId"
                holeId: scoreCardData.holes[i].id, // Use "id" instead of "holeId"
                holeNumber: scoreCardData.holes[i].holeNumber,
                score: 0, // You can set an initial score value here if needed
              });
            }
          });
          const initialPlayerPointsMap = new Map();
          scoreCardData.players.forEach((player) => {
            const holePointsArray = scoreCardData.holes.map((hole) => ({
              holeNumber: hole.holeNumber,
              points: null,
            }));
            initialPlayerPointsMap.set(player.id, holePointsArray);
          });
          setPlayerPointsMap(initialPlayerPointsMap);

          // Update the scoreCardData with the new scoreDTOs array
          scoreCardData.scoreDTOs = newScoreDTOs;
        }
        // console.log(scoreCardData.scoreDTOs);
        setScoreCardData(scoreCardData);
      } catch (error) {
        console.error("Error fetching scorecard data:", error);
      }
    };

    fetchScoreCardData();
  }, [eventId, groupNumber]);

  useEffect(() => {
    if (scoreCardData && scoreCardData.scoreDTOs) {
      const updatedPlayerScores = scoreCardData.players.map((player) => ({
        playerId: player.id,
        totalPoints: 0,
      }));

      scoreCardData.scoreDTOs.forEach((scoreDTO) => {
        const currentPlayerIndex = updatedPlayerScores.findIndex(
          (playerScore) => playerScore.playerId === scoreDTO.playerId
        );
        // console.log("scoreDTO.Points " + scoreDTO.points);
        updatedPlayerScores[currentPlayerIndex].totalPoints += scoreDTO.points;
      });

      setScoreCardData((prevData) => ({
        ...prevData,
        playerScores: updatedPlayerScores,
      }));
    }
  }, [scoreCardData && scoreCardData.scoreDTOs]);

  const handleNextHole = () => {
    setCurrentHoleIndex((prevHoleIndex) =>
      prevHoleIndex === scoreCardData.holes.length - 1 ? 0 : prevHoleIndex + 1
    );
  };

  const handlePreviousHole = () => {
    setCurrentHoleIndex((prevHoleIndex) =>
      prevHoleIndex === 0 ? scoreCardData.holes.length - 1 : prevHoleIndex - 1
    );
  };

  const handleScoreChange = (event, player) => {
    const { value } = event.target;
    setScoreInputValue(value);

    // Find the index of currentPlayerScores in scoreCardData.scoreDTOs
    const currentPlayerIndex1 = scoreCardData.scoreDTOs.findIndex(
      (scoreDTO) =>
        scoreDTO.playerId === player.id &&
        scoreDTO.holeNumber === currentHole.holeNumber
    );

    // Create a copy of scoreCardData.scoreDTOs to update the specific score
    const updatedScoreDTOs = [...scoreCardData.scoreDTOs];

    // Update the score in the copy
    updatedScoreDTOs[currentPlayerIndex1].score = value;

    // Calculate and update the points for the current scoreDTO
    const holePoints = calculatePoints(
      currentHole.par,
      value,
      player.handicap,
      currentHole.stroke
    );
    updatedScoreDTOs[currentPlayerIndex1].points = holePoints;

    // Update the scoreCardData with the updated scoreDTOs
    setScoreCardData((prevData) => ({
      ...prevData,
      scoreDTOs: updatedScoreDTOs,
    }));

    setHolePoints((prevHolePoints) => {
      const updatedHolePoints = [...prevHolePoints];
      updatedHolePoints[currentHoleIndex] = holePoints;
      return updatedHolePoints;
    });

    setPlayerPointsMap((prevPlayerPointsMap) => {
      const updatedPlayerPointsMap = new Map(prevPlayerPointsMap);
      const playerPoints = updatedPlayerPointsMap.get(player.id);
      const holeIndex = playerPoints.findIndex(
        (point) => point.holeNumber === currentHole.holeNumber
      );
      playerPoints[holeIndex].points = holePoints;
      return updatedPlayerPointsMap;
    });
  };

  const handleSubmitScores = async () => {
    try {
      const scoresToSubmit = [];

      // Loop through the score card data to gather the scores for submission
      scoreCardData.scoreDTOs.forEach((playerData) => {
        playerData.scores.forEach((holeData) => {
          scoresToSubmit.push({
            playerId: playerData.playerId,
            holeNumber: holeData.holeNumber,
            par: holeData.par,
            stroke: holeData.stroke,
            value: holeData.value,
            score: holeData.score.toString(),
            holeId: holeData.holeId,
            id: null,
            eventId: scoreCardData.eventId,
            points: holeData.points,
          });
        });
      });

      // Send the scores to the API for submission
      await axios.post(process.env.REACT_APP_API, scoresToSubmit);

      // Reset the score card data after successful submission
      setScoreCardData(null);
    } catch (error) {
      console.error("Error submitting scores:", error);
    }
  };

  if (!scoreCardData) {
    return <div>Loading...</div>;
  }

  const getCurrentPlayerScore = (holeNumber, playerIndex) => {
    const scoreDTO = scoreCardData.scoreDTOs.find(
      (score) =>
        score.playerId === playerIndex &&
        score.holeNumber === holeNumber
    );
    return scoreDTO ? scoreDTO.score : "";
  };

  // const currentPlayer = scoreCardData.players[currentPlayerIndex];
  const currentHole = scoreCardData.holes[currentHoleIndex];
  // const currentPlayerScores =
  //   scoreCardData &&
  //     scoreCardData.scoreDTOs &&
  //     scoreCardData.scoreDTOs[currentPlayerIndex] &&
  //     scoreCardData.scoreDTOs[currentPlayerIndex].scores
  //     ? scoreCardData.scoreDTOs[currentPlayerIndex].scores[currentHoleIndex]
  //     : null;

  // const calculateNetScore = () => {
  //   if (currentPlayerScores) {
  //     return currentPlayerScores.score - currentPlayer.handicap;
  //   }
  //   return null;
  // };

  function calculatePoints(par, score, handicap, stroke) {
    /**
     * L = Gross Score
     * O = Par - Gross Score
     * M = Handicap - Stroke Index
     * N = IF(M12<0,0,IF(M12<18,1,IF(M12<36,2,3)))
     * points = =IF(L12<1,"",IF((2+O12+N12)>-1,(2+O12+N12),0))
     *
     */
    //0
    var o = par - score;
    var m = handicap - stroke;
    var n;
    var points;
    if (m < 0) {
      n = 0;
    } else if (m < 18) {
      n = 1;
    } else if (m < 36) {
      n = 2;
    } else {
      n = 3;
    }

    if (score < 1) {
      points = 0;
    } else if (2 + 0 + n > -1) {
      points = 2 + o + n;
    } else {
      points = 0;
    }
    // console.log("par, score, handicap, stroke, points", par, score, handicap, stroke, points);
    return points;
  }
  //const totalPoints = holePoints.reduce((total, points) => total + points, 0);
  const totalPoints = Array.from(playerPointsMap.values()).reduce(
    (total, playerPoints) => {
      const playerTotalPoints = playerPoints.reduce(
        (sum, { points }) => sum + points,
        0
      );
      return total + playerTotalPoints;
    },
    0
  );
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h3" style={{ marginBottom: '2rem'}}>Event Score Card</Typography>

        <Typography variant="h5">Hole {scoreCardData.holes[currentHoleIndex].holeNumber}</Typography>
        <Typography variant="subtitle1">Par: {scoreCardData.holes[currentHoleIndex].par}</Typography>
        <Typography variant="subtitle1">Stroke: {scoreCardData.holes[currentHoleIndex].stroke}</Typography>
        <Typography variant="subtitle1">Length: {scoreCardData.holes[currentHoleIndex].yellow} yards</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Player Name (Handicap)</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scoreCardData.players.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.name} ({player.handicap})</TableCell>
                <TableCell>
                  <input
                    className={classes.scoreInput}
                    name="score"
                    type="number"
                    value={getCurrentPlayerScore(
                      scoreCardData.holes[currentHoleIndex].holeNumber, player.id
                    )}
                    onChange={(e) => handleScoreChange(e, player)}
                  />
                </TableCell>
                <TableCell>
                  {/* Calculate total for this player */}
                  {getCurrentPlayerScore(
                    scoreCardData.holes[currentHoleIndex].holeNumber, player.id
                  )}
                </TableCell>
                <TableCell>
                  {totalPoints}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', gap: '8px' }}>
          <Button variant="contained" color="primary" onClick={handlePreviousHole}>Previous Hole</Button>
          <Button variant="contained" color="primary" onClick={handleNextHole}>Next Hole</Button>
          <Button variant="contained" color="secondary" onClick={handleSubmitScores}>Submit Scores</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '100px 0 10px 0' }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/golf/leaderboard')}>LeaderBoard</Button>
          <Button variant="contained" color="primary" onClick={() => navigate(`/golf/fullscorecardview/${eventId}/${groupNumber}`)}>Full Scorecard</Button>
        </div>
      </Paper>
    </Container>
  );
};

export default EventScoreCard;
