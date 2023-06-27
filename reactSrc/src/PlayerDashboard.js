import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Avatar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ScorecardIcon from "@material-ui/icons/Score";
import GolfPinIcon from "@material-ui/icons/Room";
import GolfBallIcon from "@material-ui/icons/SportsGolf";
import PodiumIcon from "@material-ui/icons/EmojiEvents";
import HoleInOneIcon from "@material-ui/icons/GolfCourse";
import { apiUrl } from "./config";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  dashboardPaper: {
    padding: theme.spacing(2),
    border: "1px solid #ccc",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  tileContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: theme.spacing(2),
  },
  tile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(1),
  },
}));

const GolfPlayerEventDashboard = (props) => {
  const { eventId } = props.match.params;
  const classes = useStyles();
  const [golfEvent, setGolfEvent] = useState(null);

  useEffect(() => {
    const fetchGolfEvent = async () => {
      try {
        const response = await fetch(`${apiUrl}/events/${eventId}`);
        const data = await response.json();
        setGolfEvent(data);
      } catch (error) {
        console.error("Error fetching golf event:", error);
      }
    };

    fetchGolfEvent();
  }, []);

  if (!golfEvent) {
    // Render loading state or fallback UI while waiting for data
    //return <div>Loading...</div>;
  }

  const competitionName = golfEvent?.competition
    ? golfEvent.competition.name
    : "";
  const eventName = golfEvent?.name || "";

  return (
    <div className={classes.dashboardContainer}>
      <Paper className={classes.dashboardPaper}>
        <div className={classes.titleContainer}>
          {golfEvent?.competition?.avatar && (
            <Avatar
              className={classes.avatar}
              src={golfEvent.competition.avatar}
            />
          )}
          <div>
            <Typography variant="h6">{competitionName}</Typography>
            <Typography variant="subtitle1">{eventName}</Typography>
          </div>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div
              className={classes.tile}
              onClick={() => {
                window.location.href = "/player/search";
              }}
            >
              <SearchIcon className={classes.icon} />
              <Typography>Search</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div
              className={classes.tile}
              onClick={() => {
                window.location.href = "/player/event/scorecard";
              }}
            >
              <ScorecardIcon className={classes.icon} />
              <Typography>Scorecard</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div
              className={classes.tile}
              onClick={() => {
                window.location.href = "/player/event/closesttopin";
              }}
            >
              <GolfPinIcon className={classes.icon} />
              <Typography>Closest</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div
              className={classes.tile}
              onClick={() => {
                window.location.href = "/player/event/longestdrive";
              }}
            >
              <GolfBallIcon className={classes.icon} />
              <Typography>Longest Drive</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div
              className={classes.tile}
              onClick={() => {
                window.location.href = `/event/leaderboard/${eventId}`;
              }}
            >
              <PodiumIcon className={classes.icon} />
              <Typography>Leaderboard</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div
              className={classes.tile}
              onClick={() => {
                window.location.href = "/player/event/holeinone";
              }}
            >
              <HoleInOneIcon className={classes.icon} />
              <Typography>Hole in One Watch</Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default GolfPlayerEventDashboard;
