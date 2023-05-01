import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import "./style1.css";
import "./style2.css";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ScoreCard() {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      console.log("Input ID:", inputRef.current.id);
    }
  }, []);

  const classes = useStyles();
  const [holes, setHoles] = useState([]);
  const [scores, setScores] = useState([]);
  const [golfEvent, setGolfEvent] = useState({
    id: null,
    name: "",
    competitionId: null,
    competitionName: "",
  });

  const [playerScoresFront9, setPlayerScoresFront9] = useState([[], [], []]); // scores for player A, B, and C for holes 1-9
  const [playerScoresBack9, setPlayerScoresBack9] = useState([[], [], []]); // scores for player A, B, and C for holes 10-18

  const [playerPointsFront9Totals, setPlayerPointsFront9Totals] = useState([
    0, 0, 0,
  ]);
  const [playerPointsBack9Totals, setPlayerPointsBack9Totals] = useState([
    0, 0, 0,
  ]);

  const [inputValues, setInputValues] = useState({});
  const [renderKey, setRenderKey] = useState(0);

  const [players, setPlayers] = useState([]);
  const [item, setItems] = useState([]);

  const [formValues, setFormValues] = useState([
    {
      label: "competition",
      type: "text",
      value: "Test",
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:8080/scorecard/1").then((response) => {
      setCompetition(response.data.competition);
      setPlayers(response.data.players);
      setPlayerA(response.data.players[0].name);
      setPlayerB(response.data.players[1].name);
      setHandiCapPlayerA(response.data.players[0].handicap);
      setHandiCapPlayerB(response.data.players[1].handicap);
      //etHandiCapPlayerC(res.data.players[3].handicap);
      setHoles(response.data.holes);
      setScores(response.data.scoreDTOs);
      const newPlayerScoresFront9 = [[], [], []];
      const newPlayerScoresBack9 = [[], [], []];

      // initialize all sub-arrays in newPlayerScoresFront9
      for (let i = 0; i < newPlayerScoresFront9.length; i++) {
        for (let j = 0; j < 9; j++) {
          newPlayerScoresFront9[i][j] = 0;
        }
      }
      console.log("players is " + JSON.stringify(response.data.players));
      response.data.scoreDTOs.forEach((score) => {
        const playerIndex = getPlayerIndex(
          score.playerId,
          response.data.players
        );
        const holeIndex = getHoleIndex(score.holeNumber);
        const scoreValue = score.score || 0; // set score to 0 if it is undefined
        if (holeIndex <= 8) {
          if (!newPlayerScoresFront9[playerIndex]) {
            newPlayerScoresFront9[playerIndex] = [];
          }

          if (!newPlayerScoresFront9[playerIndex][holeIndex]) {
            newPlayerScoresFront9[playerIndex][holeIndex] = 0;
          }

          newPlayerScoresFront9[playerIndex][holeIndex] = scoreValue;
        } else {
          newPlayerScoresBack9[playerIndex][holeIndex - 9] = scoreValue;
        }
      });

      console.log("newPlayerScoresFront9", newPlayerScoresFront9);
      setPlayerScoresFront9(newPlayerScoresFront9);
      setPlayerScoresBack9(newPlayerScoresBack9);

      //setPlayerScoresFront9Totals(calculateFront9Totals(newPlayerScoresFront9));
      //setPlayerScoresBack9Totals(calculateBack9Totals(newPlayerScoresBack9));
      let newPlayerPointsFront9 = [[], [], []];
      let newPlayerPointsBack9 = [[], [], []];

      // initialize all sub-arrays in newPlayerPointsFront9
      for (let i = 0; i < newPlayerPointsFront9.length; i++) {
        for (let j = 0; j < 9; j++) {
          newPlayerPointsFront9[i][j] = 0;
        }
      }

      setPlayerPointsFront9Totals(newPlayerPointsFront9);
      setPlayerPointsBack9Totals(newPlayerPointsBack9);

      newPlayerPointsFront9 = calculatePlayerPointsFront9Totals(
        newPlayerScoresFront9
      );
      newPlayerPointsBack9 =
        calculatePlayerPointsBack9Totals(newPlayerScoresBack9);

      setPlayerPointsFront9Totals(newPlayerPointsFront9);
      setPlayerPointsBack9Totals(newPlayerPointsBack9);

      setPlayerScoresFront9(newPlayerScoresFront9);

      calculatePlayerPointsFront9(newPlayerScoresFront9);

      setGolfEvent({
        ...event,
        id: response.data.golfEvent.id,
      });
      console.log("Golf EVent " + JSON.stringify(golfEvent));
      console.log(scores);
      response.data.body;
    });
    console.log("Log this");
  }, []);

  const calculatePlayerPointsFront9 = (playerScoresFront9) => {
    const newPlayerPointsFront9 = [[], [], []];
    alert("got here  ");

    // initialize all sub-arrays in newPlayerPointsFront9
    for (let i = 0; i < newPlayerPointsFront9.length; i++) {
      for (let j = 0; j < 9; j++) {
        newPlayerPointsFront9[i][j] = 0;
      }
    }

    // loop through each player's scores for front 9 holes
    for (let i = 0; i < playerScoresFront9.length; i++) {
      for (let j = 0; j < 9; j++) {
        // get the score for the current hole
        const scoreValue = playerScoresFront9[i][j];

        // find the player's ID based on their name
        const playerId = players.find((player) => player.name === playerA)?.id; // change playerA to the current player name

        // find the score object for the current player and hole
        const score = scores.find(
          (score) => score.playerId === playerId && score.holeNumber === j + 1
        );

        // get the points for the score, or 0 if points are undefined
        const pointsValue = score?.points || 0;
        console.log("pointsValue " + pointsValue);
        // add the points to the player's front 9 total
        newPlayerPointsFront9[i][j] = pointsValue;
      }
    }

    setPlayerPointsFront9Totals(newPlayerPointsFront9);
  };

  const handleChange = (
    event,
    index,
    par,
    stroke,
    handicap,
    holeNumber,
    holeId,
    playerId
  ) => {
    const { value } = event.target;
    let inputValue = value.value;

    const playerIndex = getPlayerIndex(playerId, players);
    const holeIndex = getHoleIndex(holeNumber, players);

    console.log("playerIndex is " + playerIndex);
    console.log("holeIndex is " + holeIndex);

    const newPlayerScoresFront9 = [...playerScoresFront9];
    const newPlayerScoresBack9 = [...playerScoresBack9];

    if (holeIndex >= 9) {
      // if the hole is on the back 9, update the back 9 array instead
      newPlayerScoresBack9[playerIndex][holeIndex - 9] =
        parseInt(event.target.value) || 0;
    } else {
      newPlayerScoresFront9[playerIndex][holeIndex] =
        parseInt(event.target.value) || 0;
    }

    // update the state with the new score arrays
    setPlayerScoresFront9(newPlayerScoresFront9);
    setPlayerScoresBack9(newPlayerScoresBack9);

    const updatedScores = scores.map((score) => {
      if (score.playerId === playerId && score.holeId === holeId) {
        console.log("setting score players value");
        if (inputValue) {
          return { ...score, score: inputValue };
        } else {
          return score;
        }
      } else {
        return score;
      }
    });
    setScores(updatedScores);

    const inputElementId = event.target.id;

    const newPlayerPointsFront9 = [[], [], []];
    const newPlayerPointsBack9 = [[], [], []];

    const points = calculatePoints(par, inputValue, handicap, stroke);
    // initialize all sub-arrays in newPlayerPointsFront9
    for (let i = 0; i < newPlayerPointsFront9.length; i++) {
      for (let j = 0; j < 9; j++) {
        newPlayerPointsFront9[i][j] = 0;
      }
    }

    setPlayerPointsBack9Totals(newPlayerPointsFront9);
    setPlayerPointsBack9Totals(newPlayerPointsBack9);
    return points;
  };

  function getHoleIndex(holeNumber) {
    // Subtract 1 from the hole number to get the zero-based index
    return holeNumber - 1;
  }

  function getPlayerIndex(playerId, players) {
    // Find the index of the player with the given ID in the players array
    console.log("playerId:", playerId);
    console.log("players:", players);
    return players.findIndex((player) => player.id === playerId);
  }

  // Calculate the sum of the first 9 holes' pars
  const sumParsFront9 = holes
    .slice(0, 9)
    .reduce((acc, cur) => acc + cur.par, 0);
  const sumParsBack9 = holes
    .slice(9, 18)
    .reduce((acc, cur) => acc + cur.par, 0);

  const sumWhiteFront9 = holes
    .slice(0, 9)
    .reduce((acc, cur) => acc + cur.white, 0);
  const sumWhiteBack9 = holes
    .slice(9, 18)
    .reduce((acc, cur) => acc + cur.white, 0);

  const sumYellowFront9 = holes
    .slice(0, 9)
    .reduce((acc, cur) => acc + cur.yellow, 0);
  const sumYellowBack9 = holes
    .slice(9, 18)
    .reduce((acc, cur) => acc + cur.yellow, 0);

  const playerScoresFront9Totals = playerScoresFront9.map((scores) =>
    scores.reduce((acc, cur) => acc + cur, 0)
  );

  const playerScoresBack9Totals = playerScoresBack9.map((scores) =>
    scores.reduce((acc, cur) => acc + cur, 0)
  );

  const calculateFront9Totals = () => {
    const totals = [0, 0, 0]; // initialize totals to 0 for each player
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 9; j++) {
        totals[i] += playerScoresFront9[i][j]; // add score for player i on hole j to their total
      }
    }
    return totals;
  };

  const setPlayerScoreForHole = (playerId, holeNumber, score) => {
    setPlayers((prevState) => {
      const updatedPlayers = prevState.map((player) => {
        if (player.id === playerId) {
          return {
            ...player,
            scores: {
              ...player.scores,
              [holeNumber]: score,
            },
          };
        } else {
          return player;
        }
      });

      return updatedPlayers;
    });
  };

  const [competition, setCompetition] = useState("");
  const [playerA, setPlayerA] = useState("");
  const [playerB, setPlayerB] = useState("");
  const [playerC, setPlayerC] = useState("");
  const [handicapPlayerA, setHandiCapPlayerA] = useState("");
  const [handicapPlayerB, setHandiCapPlayerB] = useState("");
  const [handicapPlayerC, setHandiCapPlayerC] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("got here");

    // replace these comments ChatGPT with the Post call to http://localhost:8080/scores
    // with the array of Score objects.
    // Score Object is as follows:
    // id={players[0]?.id
    // id={`${players[0].id || ""}-${item.holeNumber}`}
    // id={item.par}
    // id={item.stroke}
    //
    //
    //
  }

  /**
   * The handleSubmit3 function is an event handler that is called when the user submits a form. It first prevents the default form submission behavior using event.preventDefault(). Then, it declares an empty array playerValues to store the score data for all players.

The function then loops through all the players using a for loop, and for each player, it maps over the data array to extract the score data for each hole. The inputId and inputValue variables are used to get the input value for each hole from the HTML DOM using document.getElementById(). The inputIdForHandicap variable is used to get the player's handicap value.

The playerData object is created using the extracted data and is pushed into the playerValues array. Finally, the function calls the API to submit the score object to the server by making a POST request to the http://localhost:8080/scores endpoint with the playerValues array as the request body.

If the API call is successful, the function logs a success message to the console. If there is an error, it logs an error message to the console.
   * 
   * @param {*} event 
   */

  const handleSubmit3 = (event) => {
    event.preventDefault();
    console.log("got here in submit3");
    // Extract all the values for player A
    const playerValues = [];
    console.log("event is " + JSON.stringify(event.target.id));
    for (let i = 0; i < players.length; i++) {
      const playerAValues = holes.map((item) => {
        const inputId = `${players[i]?.id}-${item.holeNumber}`;
        const inputValue = document.getElementById(inputId)?.value ?? "";

        const holeScore = scores.find(
          (score) =>
            score.holeId === item.id && score.playerId === players[i]?.id
        );
        const scoreId = holeScore ? holeScore.id : null;

        console.log("Score Id " + scoreId);

        const holeNumber = event.target.getAttribute("data-hole-number");
        const id = event.target.getAttribute("data-id");

        const inputIdForHandicap = `${players[i].handicap}`;
        const playerData = {
          playerId: players[i]?.id ?? "",
          holeNumber: item.holeNumber,
          par: item.par,
          stroke: item.stroke,
          value: inputValue,
          score: inputValue,
          holeId: item.id,
          id: scoreId,
          eventId: golfEvent.id,
          points: calculatePoints(
            item.par,
            inputValue,
            inputIdForHandicap,
            item.stroke
          ),
        };

        if (scoreId || inputValue) {
          playerValues.push(playerData);
        }
        return playerData;
      });
    }

    // Call the API to submit the score object
    fetch("http://localhost:8080/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerValues),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Score submitted successfully:", data);
      })
      .catch((error) => {
        console.error("Error submitting score:", error);
      });
  };

  const getPlayerScoreForHole = (playerId, holeId) => {
    const playerScore = scores.find(
      (score) => score.playerId === playerId && score.holeId === holeId
    );
    setInputValues[`${playerId}-hole-${holeId}-score`] || "";
    return playerScore ? playerScore.score : "";
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
    return points;
  }

  // Function to calculate total points for each player for front 9
  const calculatePlayerPointsFront9Totals = (playerIndex) => {
    let total = 0;
    for (let i = 0; i < 9; i++) {
      //total += playerScoresFront9[playerIndex][i] - scores[i].points;
      total += 1;
    }
    return total;
  };

  // Function to calculate total points for each player for back 9
  const calculatePlayerPointsBack9Totals = (playerIndex) => {
    let total = 0;
    for (let i = 9; i < 18; i++) {
      //total += playerScoresBack9[playerIndex][i - 9] - scores[i].points;
      total += 1;
    }
    return total;
  };

  // Function to calculate total points for each player for all 18 holes
  const calculatePlayerPointsTotals = () => {
    const totals = [];
    for (let i = 0; i < players.length; i++) {
      let total = 0;
      for (let j = 0; j < 18; j++) {
        if (j < 9) {
          total += playerScoresFront9[i][j] - scores[j].points + 2;
        } else {
          total += playerScoresBack9[i][j - 9] - scores[j].points + 2;
        }
      }
      totals.push(total);
    }
    return totals;
  };

  // Call these functions to get the totals for each player
  //const playerPointsFront9Totals = calculatePlayerPointsFront9Totals();
  //const playerPointsBack9Totals = calculatePlayerPointsBack9Totals();
  //const playerPointsTotals = calculatePlayerPointsTotals();

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit3}>
        <div className="container">
          <div className="grid">
            <div className="griditem col-8">
              <div className="competition">
                <div>Competition:</div>
                <div className=" name">
                  <input
                    type="text"
                    className="input"
                    label="comeptition"
                    name="competition"
                    value={competition.name}
                  />
                </div>
              </div>
            </div>
            <div className="griditem col-1"> Hcap </div>
            <div className="griditem col-2">Strokes recived</div>
            <div className="griditem col-3"></div>
            <div className="griditem col-6">
              <div className="playersname">
                <div>Player A:</div>
                <div className="name">
                  <input
                    type="text"
                    className="input"
                    value={players[0]?.name || ""}
                    id={players[0]?.id || ""}
                  />
                </div>
              </div>
            </div>
            <div className="griditem col-4 row-1">
              Date <input type="text" className="input" />
            </div>
            <div className="griditem">
              <input
                type="text"
                className="input"
                value={players[0]?.handicap || ""}
              />
            </div>
            <div className="griditem col-2">
              <input type="text" className="input" />
            </div>
            <div className="griditem col-3">Please Indicate tee</div>
            <div className="griditem col-6">
              <div className="playersname">
                <div>Player B:</div>
                <div className=" name">
                  <input
                    type="text"
                    className="input"
                    value={players[1]?.name || ""}
                    id={players[1]?.id || ""}
                  />
                </div>
              </div>
            </div>
            <div className="griditem col-4 row-2"></div>
            <div className="griditem">
              <input
                type="text"
                className="input"
                value={players[1]?.handicap || ""}
              />
            </div>
            <div className="griditem col-2">
              <input type="text" className="input" />
            </div>
            <div className="griditem col-3">Whites Par71</div>
            <div className="griditem col-6">
              <div className="playersname">
                <div>Player C:</div>
                <div className=" name">
                  <input
                    type="text"
                    className="input"
                    value={players[2]?.name || ""}
                    id={players[2]?.id || ""}
                  />
                </div>
              </div>
            </div>
            <div className="griditem col-4">
              <div className="playersname">
                <div>Time out:</div>
                <div className=" name2">
                  <input type="text" className="input" />
                </div>
              </div>
            </div>
            <div className="griditem">
              <input type="text" className="input" />
            </div>
            <div className="griditem col-2">
              <input type="text" className="input" />
            </div>
            <div className="griditem yellow col-3">Yellows Par 71</div>
            <div className="griditem col-6">
              {" "}
              <div className="playersname">
                <div>Marker:</div>
                <div className=" name">
                  <input type="text" className="input" />
                </div>
              </div>
            </div>
            <div className="griditem col-4">
              <div className="playersname">
                <div>Time in:</div>
                <div className="name2">
                  <input type="text" className="input" />
                </div>
              </div>
            </div>
            <div className="griditem">
              <input type="text" className="input" value="20" />
            </div>
            <div className="griditem col-2">
              <input type="text" className="input" />
            </div>
            <div className="griditem red col-3">Reds Par</div>
            <div className="griditem">Marker:</div>
            <div className="griditem">Hole</div>
            <div className="griditem">Par</div>
            <div className="griditem">White yards</div>
            <div className="griditem yellow">Yellow yards</div>
            <div className="griditem">Stroke Index</div>
            <div className="griditem">A</div>
            <div className="griditem">B</div>
            <div className="griditem">C</div>
            <div className="griditem">W/L/H</div>
            <div className="griditem red">Red yards</div>
            <div className="griditem red">Par</div>
            <div className="griditem fred">Index</div>
            {/*  Start COMMENt  */}
            {holes.map((item, index) => (
              <React.Fragment>
                <div className="griditem"></div>
                <div
                  className="griditem"
                  id={item.holeNumber}
                  name={item.holeNumber}
                >
                  {item.holeNumber}
                </div>
                <div className="griditem" id={item.par} name={item.par}>
                  {item.par}
                </div>
                <div className="griditem" name={item.white}>
                  {item.white}
                </div>
                <div className="griditem yellow" name={item.yellow}>
                  {item.yellow}
                </div>
                <div className="griditem" id={item.stroke} name={item.stroke}>
                  {item.stroke}
                </div>
                <div className="griditem">
                  <input
                    type="text"
                    className="input"
                    label="playerAScore"
                    data-hole-number={item.holeNumber}
                    data-id={item.id}
                    defaultValue={getPlayerScoreForHole(players[0].id, item.id)}
                    id={players[0]?.id && `${players[0].id}-${item.holeNumber}`}
                    onChange={(event) =>
                      handleChange(
                        event,
                        index,
                        item.par,
                        item.stroke,
                        handicapPlayerA,
                        item.holeNumber,
                        item.id,
                        players[0].id
                      )
                    }
                    ref={inputRef}
                  />
                </div>
                <div className="griditem">
                  <input
                    type="text"
                    className="input"
                    label="playerBScore"
                    defaultValue={getPlayerScoreForHole(players[1].id, item.id)}
                    id={players[1]?.id && `${players[1].id}-${item.holeNumber}`}
                    onChange={(event) =>
                      handleChange(
                        event,
                        index,
                        item.par,
                        item.stroke,
                        handicapPlayerB,
                        item.holeNumber,
                        item.id,
                        players[1].id
                      )
                    }
                  />
                </div>
                <div className="griditem">
                  <input
                    type="text"
                    className="input"
                    label="playerCScore"
                    //defaultValue={getPlayerScoreForHole(players[2].id, item.id)}
                    id={players[2]?.id && `${players[2].id}-${item.holeNumber}`}
                    onChange={(event) =>
                      handleChange(
                        event,
                        index,
                        item.par,
                        item.stroke,
                        handicapPlayerC,
                        item.holeNumber,
                        item.id,
                        players[2].id
                      )
                    }
                  />
                </div>
                <div className="griditem">
                  <input type="text" className="input" />
                </div>
                <div className="griditem red">
                  <input type="text" className="input" />
                </div>
                <div className="griditem red">
                  <input type="text" className="input" />
                </div>
                <div className="griditem fred">
                  <input type="text" className="input fred" /> test
                </div>
                {(item.holeNumber === 9 || item.holeNumber === 18) && (
                  <React.Fragment>
                    <div className="griditem">
                      {index === 8 ? "Out" : index === 17 ? "In" : ""}
                    </div>
                    <div className="griditem"></div>
                    <div className="griditem">
                      {index === 8
                        ? sumParsFront9
                        : index === 17
                        ? sumParsBack9
                        : ""}
                    </div>
                    <div className="griditem">
                      {" "}
                      {index === 8
                        ? sumWhiteFront9
                        : index === 17
                        ? sumWhiteBack9
                        : ""}
                    </div>
                    <div className="griditem yellow">
                      {" "}
                      {index === 8
                        ? sumYellowFront9
                        : index === 17
                        ? sumYellowBack9
                        : ""}
                    </div>
                    <div className="griditem"></div>
                    <div className="griditem">
                      {index === 8
                        ? playerScoresFront9Totals[0]
                        : index === 17
                        ? playerScoresBack9Totals[0]
                        : ""}
                    </div>
                    <div className="griditem">
                      {index === 8
                        ? playerScoresFront9Totals[1]
                        : index === 17
                        ? playerScoresBack9Totals[1]
                        : ""}
                    </div>
                    <div className="griditem">
                      {index === 8
                        ? playerScoresFront9Totals[2]
                        : index === 17
                        ? playerScoresBack9Totals[2]
                        : ""}
                    </div>
                    <div className="griditem"></div>
                    <div className="griditem red"></div>
                    <div className="griditem red"></div>
                    <div className="griditem fred"></div>
                  </React.Fragment>
                )}
                {competition.competitionType === "STABLEFORD" &&
                  (index === 8 || index === 17) && (
                    <React.Fragment>
                      <div className="griditem">
                        {index === 8
                          ? "Out Points"
                          : index === 17
                          ? "In Points"
                          : ""}
                      </div>
                      <div className="griditem"></div>
                      <div className="griditem"></div>
                      <div className="griditem"></div>
                      <div className="griditem yellow"></div>
                      <div className="griditem"></div>
                      <div className="griditem">
                        {index === 8
                          ? playerPointsFront9Totals[0]
                          : index === 17
                          ? playerPointsBack9Totals[0]
                          : ""}
                      </div>
                      <div className="griditem">
                        {index === 8
                          ? playerPointsFront9Totals[1]
                          : index === 17
                          ? playerPointsBack9Totals[1]
                          : ""}
                      </div>
                      <div className="griditem">
                        {index === 8
                          ? playerPointsFront9Totals[2]
                          : index === 17
                          ? playerPointsBack9Totals[2]
                          : ""}
                      </div>
                      <div className="griditem"></div>
                      <div className="griditem red"></div>
                      <div className="griditem red"></div>
                      <div className="griditem fred"></div>
                    </React.Fragment>
                  )}
              </React.Fragment>
            ))}
            {/*  Start COMMENt  */}
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Container>
  );
}
