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

  useEffect(() => {
    const fetchScoreCardData = async () => {
      try {
        const scoreCardResponse = await axios.get(
          `${apiUrl}/scorecard/${eventId}/${groupNumber}`
        );
        const scoreResponse = await axios.get(
          `${apiUrl}/event/playergroup?eventId=${eventId}&playerGroupId=${groupNumber}`
        );

        const scoreCardData = scoreCardResponse.data;
        const scoresData = scoreResponse.data;

        // Combine scorecard data with scores data
        const updatedScoreCardData = { ...scoreCardData };
        updatedScoreCardData.scoreDTOs.forEach((player) => {
          const playerScores = scoresData.filter(
            (score) => score.playerId === player.playerId
          );

          player.scores = playerScores.length > 0 ? playerScores : null;
        });

        setScoreCardData(updatedScoreCardData);
      } catch (error) {
        console.error("Error fetching scorecard data:", error);
      }
    };

    fetchScoreCardData();
  }, [eventId, groupNumber]);

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prevPlayerIndex) => prevPlayerIndex + 1);
    setCurrentHoleIndex(0);
  };

  const handlePreviousPlayer = () => {
    setCurrentPlayerIndex((prevPlayerIndex) => prevPlayerIndex - 1);
    setCurrentHoleIndex(0);
  };

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

  const handleScoreChange = (event) => {
    const { value } = event.target;

    if (scoreCardData) {
      const updatedScoreCardData = { ...scoreCardData };
      const currentPlayerData =
        updatedScoreCardData.scoreDTOs[currentPlayerIndex];

      if (currentPlayerData && currentPlayerData.scores) {
        const currentPlayerScores = currentPlayerData.scores;

        currentPlayerScores[currentHoleIndex].score = parseInt(value);
        setScoreCardData(updatedScoreCardData);
      }
    }
  };

  const handleIncrementScore = () => {
    if (scoreCardData) {
      const updatedScoreCardData = { ...scoreCardData };
      const currentPlayerData =
        updatedScoreCardData.scoreDTOs[currentPlayerIndex];

      if (currentPlayerData && currentPlayerData.scores) {
        const currentPlayerScores = currentPlayerData.scores;

        if (
          currentPlayerScores[currentHoleIndex].score <
          currentPlayerScores[currentHoleIndex].par
        ) {
          currentPlayerScores[currentHoleIndex].score += 1;
          setScoreCardData(updatedScoreCardData);
        }
      }
    }
  };

  const handleDecrementScore = () => {
    if (scoreCardData) {
      const updatedScoreCardData = { ...scoreCardData };
      const currentPlayerData =
        updatedScoreCardData.scoreDTOs[currentPlayerIndex];

      if (currentPlayerData && currentPlayerData.scores) {
        const currentPlayerScores = currentPlayerData.scores;

        if (currentPlayerScores[currentHoleIndex].score > 1) {
          currentPlayerScores[currentHoleIndex].score -= 1;
          setScoreCardData(updatedScoreCardData);
        }
      }
    }
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

  const currentPlayer = scoreCardData.players[currentPlayerIndex];
  const currentHole = scoreCardData.holes[currentHoleIndex];
  const currentPlayerScores =
    scoreCardData &&
    scoreCardData.scoreDTOs &&
    scoreCardData.scoreDTOs[currentPlayerIndex] &&
    scoreCardData.scoreDTOs[currentPlayerIndex].scores
      ? scoreCardData.scoreDTOs[currentPlayerIndex].scores[currentHoleIndex]
      : null;

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
        <TextField
          label="Score"
          type="number"
          value={currentPlayerScores ? currentPlayerScores.score : ""}
          onChange={handleScoreChange}
        />
        <Typography variant="body1">
          Net: {/* Calculate net score based on handicap */}
        </Typography>
        {/* Render additional fields based on competition type */}
        {scoreCardData.competition.competitionType === "STABLEFORD" && (
          <Typography variant="body1">
            Points: {/* Calculate points */}
          </Typography>
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

        {/* Render score increment and decrement buttons */}
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDecrementScore}
            disabled={!currentPlayerScores}
          >
            Decrease Score
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleIncrementScore}
            disabled={!currentPlayerScores}
          >
            Increase Score
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
