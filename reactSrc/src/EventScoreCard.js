import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import axios from "axios";

import { apiUrl } from "./config";

const EventScoreCard = (props) => {
  const { eventId, groupNumber } = props.match.params;
  const [scoreCardData, setScoreCardData] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentHoleIndex, setCurrentHoleIndex] = useState(0);

  const [scoreInputValue, setScoreInputValue] = useState("");
  const [currentHoleT, setCurrentHoleT] = useState(null);

  const [calculatedPoints, setCalculatedPoints] = useState(0);

  const [holePoints, setHolePoints] = useState([]);

  const [playerPointsMap, setPlayerPointsMap] = useState(new Map());

  useEffect(() => {
    const fetchScoreCardData = async () => {
      try {
        const scoreCardResponse = await fetch(
          `${apiUrl}/scorecard/${eventId}/${groupNumber}`
        );

        const scoreResponse = await fetch(
          `${apiUrl}/event/playergroup?eventId=${eventId}&playerGroupId=${groupNumber}`
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
        console.log(scoreCardData.scoreDTOs);
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
        console.log("scoreDTO.Points " + scoreDTO.points);
        updatedPlayerScores[currentPlayerIndex].totalPoints += scoreDTO.points;
      });

      setScoreCardData((prevData) => ({
        ...prevData,
        playerScores: updatedPlayerScores,
      }));
    }
  }, [scoreCardData && scoreCardData.scoreDTOs]);

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prevPlayerIndex) => prevPlayerIndex + 1);
    setCurrentHoleIndex(0);
  };

  const handlePreviousPlayer = () => {
    setCurrentPlayerIndex((prevPlayerIndex) => prevPlayerIndex - 1);
    setCurrentHoleIndex(0);
  };

  /*
  const handleNextHole = () => {
    const currentHoleIndex = scoreCardData.holes.findIndex(
      (hole) => hole === currentHole
    );
    const nextHoleIndex = currentHoleIndex + 1;

    if (nextHoleIndex < scoreCardData.holes.length) {
      setCurrentHole(scoreCardData.holes[nextHoleIndex]);
      updateCurrentPlayerScore(
        scoreCardData.holes[nextHoleIndex],
        currentPlayer
      );
    }
  };

  const handlePreviousHole = () => {
    const currentHoleIndex = scoreCardData.holes.findIndex(
      (hole) => hole === currentHole
    );
    const previousHoleIndex = currentHoleIndex - 1;

    if (previousHoleIndex >= 0) {
      setCurrentHole(scoreCardData.holes[previousHoleIndex]);
      updateCurrentPlayerScore(
        scoreCardData.holes[previousHoleIndex],
        currentPlayer
      );
    }
  };
*/
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

  const updateCurrentPlayerScore = (hole, player) => {
    // Find the scoreDTO for the current hole and player combination
    const currentPlayerScoreDTO = scoreCardData.scoreDTOs.find(
      (scoreDTO) =>
        scoreDTO.playerId === player.id &&
        scoreDTO.holeNumber === hole.holeNumber
    );

    if (currentPlayerScoreDTO) {
      setScoreInputValue(currentPlayerScoreDTO.score);
    } else {
      setScoreInputValue(""); // Set the input value to empty if no score is found
    }
  };

  const handleScoreChange = (event) => {
    const { value } = event.target;
    setScoreInputValue(value);

    // Find the index of currentPlayerScores in scoreCardData.scoreDTOs
    const currentPlayerIndex = scoreCardData.scoreDTOs.findIndex(
      (scoreDTO) =>
        scoreDTO.playerId === currentPlayer.id &&
        scoreDTO.holeNumber === currentHole.holeNumber
    );

    // Create a copy of scoreCardData.scoreDTOs to update the specific score
    const updatedScoreDTOs = [...scoreCardData.scoreDTOs];

    // Update the score in the copy
    updatedScoreDTOs[currentPlayerIndex].score = value;

    // Calculate and update the points for the current scoreDTO
    const holePoints = calculatePoints(
      currentHole.par,
      value,
      currentPlayer.handicap,
      currentHole.stroke
    );
    updatedScoreDTOs[currentPlayerIndex].points = holePoints;

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
      const playerPoints = updatedPlayerPointsMap.get(currentPlayer.id);
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
      await axios.post(apiUrl, scoresToSubmit);

      // Reset the score card data after successful submission
      setScoreCardData(null);
    } catch (error) {
      console.error("Error submitting scores:", error);
    }
  };

  if (!scoreCardData) {
    return <div>Loading...</div>;
  }
  /*
  const getCurrentPlayerScore = (holeNumber) => {
    const currentPlayerId = 1; // Assuming the current player ID is 1
    const scoreDTO = scoreCardData.scoreDTOs.find(
      (score) =>
        score.playerId === currentPlayerId && score.holeNumber === holeNumber
    );
    return scoreDTO ? scoreDTO.score : ""; // Return an empty string if scoreDTO is not found
  };
  */
  const getCurrentPlayerScore = (holeNumber) => {
    const scoreDTO = scoreCardData.scoreDTOs.find(
      (score) =>
        score.playerId === scoreCardData.players[currentPlayerIndex].id &&
        score.holeNumber === holeNumber
    );
    return scoreDTO ? scoreDTO.score : "";
  };

  const currentPlayer = scoreCardData.players[currentPlayerIndex];
  const currentHole = scoreCardData.holes[currentHoleIndex];
  const currentPlayerScores =
    scoreCardData &&
    scoreCardData.scoreDTOs &&
    scoreCardData.scoreDTOs[currentPlayerIndex] &&
    scoreCardData.scoreDTOs[currentPlayerIndex].scores
      ? scoreCardData.scoreDTOs[currentPlayerIndex].scores[currentHoleIndex]
      : null;

  const calculateNetScore = () => {
    if (currentPlayerScores) {
      return currentPlayerScores.score - currentPlayer.handicap;
    }
    return null;
  };

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
    console.log(
      "  par, score, handicap, stroke and points " + " " + par,
      score,
      handicap,
      stroke,
      points
    );
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
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "1rem" }}>
        {/* Render player information for the current player */}
        <Typography variant="h6">{currentPlayer.name}</Typography>
        <Typography variant="subtitle1">
          Handicap: {currentPlayer.handicap}
        </Typography>
        <Typography variant="subtitle1">
          Group Tee Time: {scoreCardData.groupTeeTime}
        </Typography>
        {/* Render scorecard fields for the current hole */}
        <Typography variant="body1">Hole {currentHole.holeNumber}</Typography>
        <Typography variant="body1">Par: {currentHole.par}</Typography>
        <Typography variant="body1">Stroke: {currentHole.stroke}</Typography>
        <Typography variant="body1">
          Length: {currentHole.yellow} yards
        </Typography>
        <input
          name="score"
          type="text"
          value={getCurrentPlayerScore(
            scoreCardData.holes[currentHoleIndex].holeNumber
          )}
          onChange={handleScoreChange}
        />

        <Typography variant="body1">
          <Typography variant="body1">Net: {calculateNetScore()}</Typography>
        </Typography>
        {/* Render additional fields based on competition type 
          par, score, handicap, stroke
        */}
        {scoreCardData.competition.competitionType === "STABLEFORD" && (
          <div>
            <Typography variant="body1">
              Points:{" "}
              {getCurrentPlayerScore(
                scoreCardData.holes[currentHoleIndex].holeNumber
              )}
            </Typography>
            <Typography variant="body1">Total Points: {totalPoints}</Typography>
          </div>
        )}

        {/* Render navigation buttons */}
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousHole}
          >
            Previous Hole
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNextHole}
          >
            Next Hole
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousPlayer}
            disabled={currentPlayerIndex === 0}
          >
            Previous Player
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextPlayer}
            disabled={currentPlayerIndex === scoreCardData.players.length - 1}
          >
            Next Player
          </Button>
        </div>

        {/* Include submit button for submitting scores */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitScores}
        >
          Submit Scores
        </Button>
      </Paper>
    </Container>
  );
};

export default EventScoreCard;
