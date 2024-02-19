import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Container } from '@mui/material';
import axios from "axios";
import "../../styles/style2.css"

export default function ScoreCard() {
  const { eventId, groupNumber } = useParams();
  const [holes, setHoles] = useState([]);
  const [scores, setScores] = useState([]);
  const [bonusPointRules, setBonusPointRules] = useState([]);
  const [golfEvent, setGolfEvent] = useState({
    id: null,
    name: '',
    competitionId: null,
    competitionName: '',
  });

  const [playerScoresFront9, setPlayerScoresFront9] = useState([[], [], []]); // scores for player A, B, and C for holes 1-9
  const [playerScoresBack9, setPlayerScoresBack9] = useState([[], [], []]); // scores for player A, B, and C for holes 10-18
  const [playerPointsFront9, setPlayerPointsFront9] = useState([[], [], []]); // scores for player A, B, and C for holes 1-9
  const [playerPointsBack9, setPlayerPointsBack9] = useState([[], [], []]); // scores for player A, B, and C for holes 10-18
  const [bonusRuleHoleIndices, setBonusRuleHoleIndices] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [players, setPlayers] = useState([]);

  console.log('inputValues', inputValues);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/scorecard/${eventId}/${groupNumber}`)
      .then((response) => {
        setCompetition(response.data.competition);
        setPlayers(response?.data?.players);
        setPlayerA(response?.data?.players?.[0]?.name);
        setPlayerB(response?.data?.players?.[1]?.name);

        setHandiCapPlayerA(response?.data?.players?.[0]?.handicap);
        setHandiCapPlayerB(response?.data?.players?.[1]?.handicap);
        setHandiCapPlayerC(response?.data?.players?.[2]?.handicap);
        setHandiCapPlayerD(response?.data?.players?.[3]?.handicap);
        // setHandiCapPlayerC(res?.data?.players?.[3]?.handicap);
        setHoles(response?.data?.holes);
        setScores(response?.data?.scoreDTOs);
        setBonusPointRules(response?.data?.bonusPointRules);

        const newPlayerScoresFront9 = [[], [], []];
        const newPlayerScoresBack9 = [[], [], []];
        const newPlayerPointsFront9 = [[], [], []];
        const newPlayerPointsBack9 = [[], [], []];

        console.log("scoreDTOs:", JSON.stringify(response.data.scoreDTOs));

        const indices = response.data.bonusPointRules
          .map((rule) => {
            const index = holes.findIndex(
              (hole) => hole.holeNumber === rule.holeNumber
            );
            return index >= 0 ? index : null;
          })
          .filter((index) => index !== null); // Filter out any null values

        setBonusPointRules(response.data.bonusPointRules);
        setBonusRuleHoleIndices(indices);

        console.log("bonusPointRules", response.data.bonusPointRules);
        console.log("bonusPointRulesIndices", indices); // Add this line

        // initialize all sub-arrays in newPlayerScoresFront9
        for (let i = 0; i < newPlayerScoresFront9.length; i++) {
          for (let j = 0; j < 9; j++) {
            newPlayerScoresFront9[i][j] = 0;
            newPlayerPointsFront9[i][j] = 0;
          }
        }
        console.log("players is " + JSON.stringify(response.data.players));

        response.data.scoreDTOs.forEach((score) => {
          console.log(score.points);
        });

        response.data.scoreDTOs.forEach((score) => {
          const playerIndex = getPlayerIndex(
            score.playerId,
            response.data.players
          );
          const holeIndex = getHoleIndex(score.holeNumber);
          const scoreValue = score.score || 0; // set score to 0 if it is undefined
          const pointsValue = score.points || 0; // set score to 0 if it is undefined

          if (holeIndex <= 8) {
            if (!newPlayerScoresFront9[playerIndex]) {
              newPlayerScoresFront9[playerIndex] = [];
            }

            if (!newPlayerScoresFront9[playerIndex][holeIndex]) {
              newPlayerScoresFront9[playerIndex][holeIndex] = 0;
            }

            newPlayerScoresFront9[playerIndex][holeIndex] = scoreValue;
            newPlayerPointsFront9[playerIndex][holeIndex] = pointsValue;
          } else {
            newPlayerScoresBack9[playerIndex][holeIndex - 9] = scoreValue;
            newPlayerPointsBack9[playerIndex][holeIndex] = pointsValue;
          }
        });

        console.log("newPlayerScoresFront9", newPlayerScoresFront9);
        setPlayerScoresFront9(newPlayerScoresFront9);
        setPlayerScoresBack9(newPlayerScoresBack9);

        console.log("playersPointsFront9", newPlayerPointsFront9);
        console.log("playersPointsBack9", newPlayerPointsBack9);

        setPlayerPointsFront9(newPlayerPointsFront9);
        setPlayerPointsBack9(newPlayerPointsBack9);

        //setPlayerScoresFront9(newPlayerScoresFront9);

        // calculatePlayerPointsFront9(newPlayerScoresFront9);

        setGolfEvent({
          ...event,
          id: response.data.golfEventDTO?.id,
        });
        console.log("Golf EVent " + JSON.stringify(golfEvent));
        console.log(scores);
        response.data.body;
      });
    console.log("Log this");
  }, []);

  useEffect(() => {
    console.log("bonusPointRules in updated useEffect", bonusPointRules);
  }, [bonusPointRules]);

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
    let inputScore = value.value;

    inputScore = event.target.value;
    const playerIndex = getPlayerIndex(playerId, players);
    const holeIndex = getHoleIndex(holeNumber, players);

    console.log("playerIndex is " + playerIndex);
    console.log("holeIndex is " + holeIndex);

    const newPlayerScoresFront9 = [...playerScoresFront9];
    const newPlayerScoresBack9 = [...playerScoresBack9];

    const newPlayerPointsFront9 = [...playerPointsFront9];
    const newPlayerPointsBack9 = [...playerPointsBack9];

    const points = calculatePoints(par, inputScore, handicap, stroke);

    if (holeIndex >= 9) {
      // if the hole is on the back 9, update the back 9 array instead
      newPlayerScoresBack9[playerIndex][holeIndex - 9] =
        parseInt(event.target.value) || 0;
      newPlayerPointsBack9[playerIndex][holeIndex - 9] = points || 0;
    } else {
      newPlayerScoresFront9[playerIndex][holeIndex] =
        parseInt(event.target.value) || 0;
      newPlayerPointsFront9[playerIndex][holeIndex] = points || 0;
      console.log(
        "updating newPlayerPointsFront9[playerIndex][holeIndex] = points " +
        +newPlayerPointsFront9[playerIndex][holeIndex] +
        " = " +
        points
      );
    }

    // update the state with the new score arrays
    setPlayerScoresFront9(newPlayerScoresFront9);
    setPlayerScoresBack9(newPlayerScoresBack9);

    setPlayerPointsFront9(newPlayerPointsFront9);
    setPlayerPointsBack9(newPlayerPointsBack9);

    const updatedScores = scores.map((score) => {
      if (score.playerId === playerId && score.holeId === holeId) {
        console.log("setting score players value");
        if (inputScore) {
          return { ...score, score: inputScore, points: points };
        } else {
          return score;
        }
      } else {
        return score;
      }
    });
    setScores(updatedScores);

    // let front9Total = newPlayerPointsFront9[playerIndex].reduce(
    //   (acc, cur) => acc + cur,
    //   0
    // );
    // let back9Total = newPlayerPointsBack9[playerIndex].reduce(
    //   (acc, cur) => acc + cur,
    //   0
    // );

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

  const playerPointsFront9Totals = playerPointsFront9.map((scores) =>
    scores.reduce((acc, cur) => acc + cur, 0)
  );

  const playerPointsBack9Totals = playerPointsBack9.map((scores) =>
    scores.reduce((acc, cur) => acc + cur, 0)
  );

  const [competition, setCompetition] = useState("");
  const [playerA, setPlayerA] = useState("");
  const [playerB, setPlayerB] = useState("");
  // const [playerC, setPlayerC] = useState("");
  const [handicapPlayerA, setHandiCapPlayerA] = useState("");
  const [handicapPlayerB, setHandiCapPlayerB] = useState("");
  const [handicapPlayerC, setHandiCapPlayerC] = useState("");
  const [handicapPlayerD, setHandiCapPlayerD] = useState("");
  console.log(playerA, playerB);
  /**
   * The handleSubmit3 function is an event handler that is called when the user submits a form. It first prevents the default form submission behavior using event.preventDefault(). Then, it declares an empty array playerValues to store the score data for all players.

The function then loops through all the players using a for loop, and for each player, it maps over the data array to extract the score data for each hole. The inputId and inputValue variables are used to get the input value for each hole from the HTML DOM using document.getElementById(). The inputIdForHandicap variable is used to get the player's handicap value.

The playerData object is created using the extracted data and is pushed into the playerValues array. Finally, the function calls the API to submit the score object to the server by making a POST request to the ${process.env.REACT_APP_API}/scores endpoint with the playerValues array as the request body.

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

        // const holeNumber = event.target.getAttribute("data-hole-number");
        // const id = event.target.getAttribute("data-id");

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
      console.log(playerAValues, holeNumber);
    }

    // Call the API to submit the score object
    fetch("${process.env.REACT_APP_API}/scores", {
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
    console.log(
      "  par, score, handicap, stroke and points " + " " + par,
      score,
      handicap,
      stroke,
      points
    );
    return points;
  }

  const firstLetters = players.map((player) => {
    const [firstName, lastName] = player.name.split(" ");
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  });

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
                defaultValue={players[0]?.handicap || ""}
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
                defaultValue={players[1]?.handicap || ""}
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
            <div className="griditem sticky-item">{firstLetters[0]}</div>
            <div className="griditem sticky-item">{firstLetters[1]}</div>
            <div className="griditem sticky-item">{firstLetters[2]}</div>
            <div className="griditem">W/L/H</div>
            <div className="griditem red">Red yards</div>
            <div className="griditem red">Par</div>
            <div className="griditem fred">Index</div>
            {/*  Start COMMENt  */}
            {holes.map((item, index) => (
              <React.Fragment key={index}>
                <div className="griditem"></div>
                <div
                  className={`griditem ${bonusRuleHoleIndices.includes(index)
                      ? "bonus-rule-hole"
                      : ""
                    }`}
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
                    defaultValue={
                      players[0] && players[0]?.id && item?.id
                        ? getPlayerScoreForHole(players[0].id, item.id)
                        : ""
                    }
                    id={
                      players[0] &&
                      players[0]?.id &&
                      `${players[0].id}-${item.holeNumber}`
                    }
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
                  />
                </div>
                <div className="griditem">
                  <input
                    type="text"
                    className="input"
                    label="playerBScore"
                    defaultValue={
                      players[0]?.id && item?.id
                        ? getPlayerScoreForHole(players[1].id, item.id)
                        : ""
                    }
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
                    defaultValue={
                      players[2]?.id && item?.id
                        ? getPlayerScoreForHole(players[2].id, item.id)
                        : ""
                    }
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
                  <input
                    type="text"
                    className="input"
                    label="playerDScore"
                    data-hole-number={item.holeNumber}
                    data-id={item.id}
                    defaultValue={
                      players[3]?.id && item?.id
                        ? getPlayerScoreForHole(players[3].id, item.id)
                        : ""
                    }
                    id={players[3]?.id && `${players[3].id}-${item.holeNumber}`}
                    onChange={(event) =>
                      handleChange(
                        event,
                        index,
                        item.par,
                        item.stroke,
                        handicapPlayerD,
                        item.holeNumber,
                        item.id,
                        players[3].id
                      )
                    }
                  />
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

      <div>
        {/* Other content */}
        {bonusPointRules.map((rule, index) => (
          <div
            key={rule.id}
            className={
              bonusRuleHoleIndices[index] !== null ? "bonus-rule-hole" : ""
            }
          >
            {bonusRuleHoleIndices[index] !== null && (
              <span className="asterisk">*</span>
            )}
            <p>
              Hole {rule.holeNumber}: {rule.name} ({rule.points} points)
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
