// import { useEffect, useState } from 'react';

import { Typography, Container, Grid, Paper, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import EventIcon from '@mui/icons-material/Event';
import ViewListIcon from '@mui/icons-material/ViewList';
import useStyle from './styles';

import { gridSpacing } from 'store/constant';

const Dashboard = () => {
  const classes = useStyle();
  // const [isLoading, setLoading] = useState(true);
  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  return (
    <Grid container spacing={gridSpacing}>
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
            Here you can create competitions, events, scorecards, and view leaderboards.
          </Typography>
        </Paper>

        <Grid container spacing={2} className={classes.paperContainer}>
          <Grid item xs={6} sm={3}>
            <Link component={RouterLink} to="/competition" underline="none" color="inherit">
              <Paper className={classes.paper} elevation={3}>
                <SportsGolfIcon className={classes.icon} fontSize="large" />
                <Typography variant="h6" gutterBottom>
                  Create Competition
                </Typography>
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Link component={RouterLink} to="/creategolfevent" underline="none" color="inherit">
              <Paper className={classes.paper} elevation={3}>
                <EventIcon className={classes.icon} fontSize="large" />
                <Typography variant="h6" gutterBottom>
                  Create Golf Event
                </Typography>
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Link component={RouterLink} to="/viewGolfEvent" underline="none" color="inherit">
              <Paper className={classes.paper} elevation={3}>
                <EventIcon className={classes.icon} fontSize="large" />
                <Typography variant="h6" gutterBottom>
                  View Golf Event
                </Typography>
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Link component={RouterLink} to="/ViewScoreCards" underline="none" color="inherit">
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
    </Grid>
  );
};

export default Dashboard;
