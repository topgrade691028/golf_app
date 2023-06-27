import React, { useContext } from "react";
import {
  Typography,
  Container,
  Grid,
  useMediaQuery,
  Paper,
  Link,
  Box,
  Avatar,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import SportsGolfIcon from "@material-ui/icons/SportsGolf";
import EventIcon from "@material-ui/icons/Event";
import ViewListIcon from "@material-ui/icons/ViewList";
import ScoreIcon from "@material-ui/icons/Score";
import { AuthContext } from "./AuthStateProvider";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: theme.spacing(4),
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  golfImage: {
    width: "20%",
    height: "auto",
  },
  paperContainer: {
    marginTop: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginBottom: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { isAuthenticated, user, userRoles, logout } = useContext(AuthContext);

  return (
    <div>
      <Container className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <div className={classes.imageContainer}>
            <img
              src="https://images.pexels.com/photos/54123/pexels-photo-54123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Beautiful Golf Course"
              className={classes.golfImage}
            />
          </div>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to the Golf Society App!
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Here you can create competitions, events, scorecards, and view
            leaderboards.
          </Typography>
          {!isAuthenticated && (
            <div className={classes.authLinks}>
              <Link
                to="/signin"
                component={RouterLink}
                className={classes.link}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                component={RouterLink}
                className={classes.link}
              >
                Register
              </Link>
            </div>
          )}
        </Paper>

        <Grid container spacing={2} className={classes.paperContainer}>
          <Grid item xs={6} sm={3}>
            <Link
              component={RouterLink}
              to="/createcompetition"
              underline="none"
              color="inherit"
            >
              <Paper className={classes.paper} elevation={3}>
                <SportsGolfIcon className={classes.icon} fontSize="large" />
                <Typography variant="h6" gutterBottom>
                  Create Competition
                </Typography>
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Link
              component={RouterLink}
              to="/creategolfevent"
              underline="none"
              color="inherit"
            >
              <Paper className={classes.paper} elevation={3}>
                <EventIcon className={classes.icon} fontSize="large" />
                <Typography variant="h6" gutterBottom>
                  Create Golf Event
                </Typography>
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Link
              component={RouterLink}
              to="/viewGolfEvent"
              underline="none"
              color="inherit"
            >
              <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.icon}>
                  <img src="/path/to/your/icon" alt="Icon" />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  View Golf Event
                </Typography>
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Link
              component={RouterLink}
              to="/ViewScoreCards"
              underline="none"
              color="inherit"
            >
              <Paper className={classes.paper} elevation={3}>
                <ViewListIcon className={classes.icon} fontSize="large" />
                <Typography variant="h6" gutterBottom>
                  View Score Cards
                </Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
