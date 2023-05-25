import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Users from "./Players";
import UserCreate from "./PlayerCreate";
import UserUpdate from "./UserUpdate";
import ScoreCard from "./ScoreCard";
import EventLeaderBoard from "./EventLeaderBoard";
import CreateCompetition from "./CreateCompetition";
import CreateGolfEvent from "./CreateGolfEvent";
import ViewGolfEvent from "./ViewGolfEvent";
import ViewCompetition from "./ViewCompetition";
import ViewCompetitionEvents from "./ViewCompetitionEvents";
import ViewScoreCards from "./ViewScoreCards";
import RegisterPlayers from "./RegisterPlayers";
import { apiUrl } from "./config";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => <Users {...props} apiUrl={apiUrl} />}
            />
            <Route
              exact
              path="/create"
              component={(props) => <UserCreate {...props} apiUrl={apiUrl} />}
            />
            <Route
              exact
              path="/creategolfevent/:competitionId?"
              component={(props) => (
                <CreateGolfEvent
                  {...props}
                  apiUrl={apiUrl}
                  competitionId={props.match.params.competitionId}
                />
              )}
            />
            <Route
              exact
              path="/viewGolfEvent"
              component={(props) => (
                <ViewGolfEvent {...props} apiUrl={apiUrl} />
              )}
            />
            <Route
              exact
              path="/registerplayers"
              component={(props) => (
                <RegisterPlayers {...props} apiUrl={apiUrl} />
              )}
            />
            <Route
              exact
              path="/scorecardview/:id"
              render={(props) => <ScoreCard {...props} apiUrl={apiUrl} />}
            />
            <Route
              exact
              path="/ViewScoreCards"
              render={(props) => <ViewScoreCards {...props} apiUrl={apiUrl} />}
            />
            <Route
              exact
              path="/update/:id"
              component={(props) => <UserUpdate {...props} apiUrl={apiUrl} />}
            />
            <Route
              exact
              path="/eventleaderboard"
              component={(props) => (
                <EventLeaderBoard {...props} apiUrl={apiUrl} />
              )}
            />
            <Route
              exact
              path="/createcompetition"
              component={(props) => (
                <CreateCompetition {...props} apiUrl={apiUrl} />
              )}
            />
            <Route
              exact
              path="/viewcompetition"
              component={(props) => (
                <ViewCompetition {...props} apiUrl={apiUrl} />
              )}
            />
            <Route
              exact
              path="/viewcompetitionevents"
              component={(props) => (
                <ViewCompetitionEvents {...props} apiUrl={apiUrl} />
              )}
            />
          </Switch>
        </Switch>
      </div>
    </Router>
  );
}
