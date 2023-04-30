import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Users from "./Players";
import UserCreate from "./PlayerCreate";
import UserUpdate from "./UserUpdate";
import ScoreCard from "./ScoreCard";
import EventLeaderBoard from "./EventLeaderBoard";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/create" component={UserCreate} />
          <Route exact path="/update/:id" component={UserUpdate} />
          <Route exact path="/scorecard" component={ScoreCard} />
          <Route exact path="/eventleaderboard" component={EventLeaderBoard} />
        </Switch>
      </div>
    </Router>
  );
}
