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
import Dashboard from "./Dashboard";
import PlayerCreate from "./PlayerCreate";
import GolfPlayerEventDashboard from "./PlayerDashboard";
import EventScoreCard from "./EventScoreCard";
import EventScoreCardNew from "./EventScoreCardNew";
import SignIn from "./SignIn";
import Register from "./Register";
import Logout from "./logout";
import QuickStart from "./QuickStart";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <Dashboard {...props} />}
          />
          <Route
            exact
            path="/addPlayer"
            component={(props) => <PlayerCreate {...props} apiUrl={apiUrl} />}
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
            component={(props) => <ViewGolfEvent {...props} apiUrl={apiUrl} />}
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
            path="/scorecardview/:eventId/:groupNumber"
            render={(props) => <ScoreCard {...props} apiUrl={apiUrl} />}
          />
          <Route
            exact
            path="/eventscorecard/:eventId/:groupNumber"
            render={(props) => <EventScoreCard {...props} apiUrl={apiUrl} />}
          />
          <Route
            exact
            path="/eventscorecardNew/:eventId/:groupNumber"
            render={(props) => <EventScoreCardNew {...props} apiUrl={apiUrl} />}
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
            path="/event/leaderboard/:eventId"
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
            path="/quickstart"
            component={(props) => <QuickStart {...props} apiUrl={apiUrl} />}
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
          <Route
            exact
            path="/player/dashboard/:eventId"
            component={(props) => (
              <GolfPlayerEventDashboard {...props} apiUrl={apiUrl} />
            )}
          />
          <Route
            exact
            path="/signin"
            component={(props) => <SignIn {...props} apiUrl={apiUrl} />}
          />
          <Route
            exact
            path="/register"
            component={(props) => <Register {...props} apiUrl={apiUrl} />}
          />
          <Route
            exact
            path="/logout"
            component={(props) => <Logout {...props} apiUrl={apiUrl} />}
          />
        </Switch>
      </div>
    </Router>
  );
}
