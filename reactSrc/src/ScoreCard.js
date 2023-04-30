import React, { useState, useEffect } from "react";
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
  const classes = useStyles();
  const [data, setData] = useState([]);

  const [players, setPlayers] = useState([]);

  const [formValues, setFormValues] = useState([
    {
      label: "competition",
      type: "text",
      value: "Test",
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:8080/scorecard/1").then((response) => {
      //setGrid1(res.rlista);
      //const parsedResponse = JSON.parse(res.data.body);
      console.log(response.data.competition.name);
      // alert(res.data.competition.id);
      setCompetition(response.data.competition.name);

      setPlayers(response.data.players);
      setPlayerA(response.data.players[0].name);
      setPlayerB(response.data.players[1].name);

      // setPlayerC(res.data.players[2].name);
      //alert(res.data.players[0].handicap);
      //alert(res.data.players[1].handicap);
      setHandiCapPlayerA(response.data.players[0].handicap);
      setHandiCapPlayerB(response.data.players[1].handicap);
      //etHandiCapPlayerC(res.data.players[3].handicap);
      alert("hole number is " + response.data.holes[0].holeNumber);
      alert("hole id" + response.data.holes[0].id);
      setData(response.data.holes);
      response.data.body;
    });
    console.log("Log this");
  }, []);

  const handleChange = (event, index, par, stroke, handicap) => {
    const newData = [...data];
    newData[index] = event.target.value;
    setData(newData);

    const { id, value } = event.target;
    const holeNumber = id.split("-")[1];
    //const updatedPlayerAScores = [...playerAScores];
    //updatedPlayerAScores[holeNumber - 1] = value;
    //setPlayerAScores(updatedPlayerAScores);
    /**
     * L = Gross Score
     * O = Par - Gross Score
     * M = Handicap - Stroke Index
     * N = IF(M12<0,0,IF(M12<18,1,IF(M12<36,2,3)))
     * points = =IF(L12<1,"",IF((2+O12+N12)>-1,(2+O12+N12),0))
     *
     */
    //0

    const updatedData = [...data];
    updatedData[index].playerAScore = event.target.value;
    console.log(name); // will log the value of item.par
    setData(updatedData);

    alert(newData[index].par);

    alert(
      "index is " +
        index +
        "par is " +
        par +
        "score is " +
        event.target.value +
        "stroke is " +
        stroke +
        "handicap is " +
        handicap
    );
    var score = event.target.value;
    var points = calculatePoints(par, score, handicap, stroke);
    alert(points);
    return points;
  };
  const [competition, setCompetition] = useState("");
  const [playerA, setPlayerA] = useState("");
  const [playerB, setPlayerB] = useState("");
  const [playerC, setPlayerC] = useState("");
  const [handicapPlayerA, setHandiCapPlayerA] = useState("");
  const [handicapPlayerB, setHandiCapPlayerB] = useState("");
  const [handicapPlayerC, setHandiCapPlayerC] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("got here");
    console.log("Player A Scores:", competition);
    console.log();
  };
  function handleFormSubmit(event) {
    event.preventDefault();
    alert("got here");

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
    alert("got here in submit3");
    // Extract all the values for player A
    const playerValues = [];

    for (let i = 0; i < players.length; i++) {
      const playerAValues = data.map((item) => {
        const inputId = `${players[i]?.id}-${item.holeNumber}`;
        const inputValue = document.getElementById(inputId)?.value ?? "";

        const holeNumber = event.target.getAttribute("data-hole-number");
        const id = event.target.getAttribute("data-id");
        alert("holenumber is " + item.holeNumber);
        alert("id is " + item.holeId);
        const inputIdForHandicap = `${players[i].handicap}`;
        const playerData = {
          playerId: players[i]?.id ?? "",
          holeNumber: item.holeNumber,
          par: item.par,
          stroke: item.stroke,
          value: inputValue,
          score: inputValue,
          holeId: item.id,
          points: calculatePoints(
            item.par,
            inputValue,
            inputIdForHandicap,
            item.stroke
          ),
        };

        playerValues.push(playerData);
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

  function calculatePoints(par, score, handicap, stroke) {
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
                    value={competition}
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
            {data.map((item, index) => (
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
                <div className="griditem" name={item.distanceFromWhite}>
                  {item.distanceFromWhite}
                </div>
                <div className="griditem yellow" name={item.distanceFromYellow}>
                  {item.distanceFromYellow}
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
                    id={players[0]?.id && `${players[0].id}-${item.holeNumber}`}
                    onChange={(event) =>
                      handleChange(
                        event,
                        index,
                        item.par,
                        item.stroke,
                        handicapPlayerA
                      )
                    }
                  />
                </div>
                <div className="griditem">
                  <input
                    type="text"
                    className="input"
                    label="playerBScore"
                    id={players[1]?.id && `${players[1].id}-${item.holeNumber}`}
                    onChange={(event) =>
                      handleChange(
                        event,
                        index,
                        item.par,
                        item.stroke,
                        handicapPlayerB
                      )
                    }
                  />
                </div>
                <div className="griditem">
                  <input
                    type="text"
                    className="input"
                    label="playerCScore"
                    id={players[2]?.id && `${players[2].id}-${item.holeNumber}`}
                    onChange={(event) =>
                      handleChange(
                        event,
                        index,
                        item.par,
                        item.stroke,
                        handicapPlayerC
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
