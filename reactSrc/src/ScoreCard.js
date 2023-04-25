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
      setPlayerA(response.data.players[0].name);
      setPlayerB(response.data.players[1].name);
      // setPlayerC(res.data.players[2].name);
      //alert(res.data.players[0].handicap);
      //alert(res.data.players[1].handicap);
      setHandiCapPlayerA(response.data.players[0].handicap);
      setHandiCapPlayerB(response.data.players[1].handicap);
      //etHandiCapPlayerC(res.data.players[3].handicap);
      alert(response.data.holes[0].holeNumber);
      setData(response.data.holes);
      response.data.body;
    });
    console.log("Log this");
  }, []);

  const handleChange = (event, index, par, stroke, handicap) => {
    const newData = [...data];
    newData[index] = event.target.value;
    setData(newData);
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
    var o = par - score;
    alert(" o is " + o);
    //M
    var m = handicap - stroke;
    alert(" m is " + m);
    //=IF(M<0,0,IF(M<18,1,IF(M<36,2,3)))
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

    //=IF(L<1,"",IF((2+O+N)>-1,(2+O+N),0))
    if (score < 1) {
      points = 0;
    } else if (2 + 0 + n > -1) {
      points = 2 + o + n;
    } else {
      points = 0;
    }
    alert(points);
    return points;
  };

  const handleSubmit = (event) => {
    alert("hello ");
    event.preventDefault();
    var data = {
      name: fname,
      lname: lname,
      username: username,
      email: email,
      avatar: avatar,
    };

    fetch("http://localhost:8080/players", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        //alert(result["username"]);
        alert(result);
        if (result["status"] === "ok") {
          window.location.href = "/";
        }
      });
  };

  const [competition, setCompetition] = useState("");
  const [playerA, setPlayerA] = useState("");
  const [playerB, setPlayerB] = useState("");
  const [playerC, setPlayerC] = useState("");
  const [handicapPlayerA, setHandiCapPlayerA] = useState("");
  const [handicapPlayerB, setHandiCapPlayerB] = useState("");
  const [handicapPlayerC, setHandiCapPlayerC] = useState("");

  return (
    <Container maxWidth="xs">
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
                <input type="text" className="input" value={playerA} />
              </div>
            </div>
          </div>
          <div className="griditem col-4 row-1">
            Date <input type="text" className="input" />
          </div>
          <div className="griditem">
            <input type="text" className="input" value={handicapPlayerA} />
          </div>
          <div className="griditem col-2">
            <input type="text" className="input" />
          </div>
          <div className="griditem col-3">Please Indicate tee</div>
          <div className="griditem col-6">
            <div className="playersname">
              <div>Player B:</div>
              <div className=" name">
                <input type="text" className="input" value={playerB} />
              </div>
            </div>
          </div>
          <div className="griditem col-4 row-2"></div>
          <div className="griditem">
            <input type="text" className="input" value={handicapPlayerB} />
          </div>
          <div className="griditem col-2">
            <input type="text" className="input" />
          </div>
          <div className="griditem col-3">Whites Par71</div>
          <div className="griditem col-6">
            <div className="playersname">
              <div>Player C:</div>
              <div className=" name">
                <input type="text" className="input" value={playerC} />
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
          <div className="griditem"></div>
          {/*  Start COMMENt  */}
          {data.map((item, index) => (
            <React.Fragment>
              <div className="griditem" name={item.holeNumber}>
                {item.holeNumber}
              </div>
              <div className="griditem" name={item.par}>
                {item.par}
              </div>
              <div className="griditem" name={item.distanceFromWhite}>
                {item.distanceFromWhite}
              </div>
              <div className="griditem yellow" name={item.distanceFromYellow}>
                {item.distanceFromYellow}
              </div>
              <div className="griditem yellow" name={item.stroke}>
                {item.stroke}
              </div>
              <div className="griditem">
                <input
                  type="text"
                  className="input"
                  label="playerAScore"
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
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              <div className="griditem">
                <input
                  type="text"
                  className="input"
                  label="playerCScore"
                  onChange={(event) => handleChange(event, index)}
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
                <input type="text" className="input fred" />
              </div>
            </React.Fragment>
          ))}
          {/*  Start COMMENt  */}
        </div>
      </div>
    </Container>
  );
}
