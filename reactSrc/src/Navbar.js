import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import AssessmentIcon from "@material-ui/icons/Assessment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navlink: {
    color: "white",
    textDecoration: "none",
  },
  drawer: {
    width: "250px",
  },
  drawerPaper: {
    backgroundColor: "#333",
  },
  dropdownLink: {
    color: "white",
    textDecoration: "none",
    backgroundColor: "blue",
  },
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Link className={classes.navlink} to="/">
            <Typography variant="h6" className={classes.title}>
              CRUD
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
        </div>
        <List>
          <Link
            className={classes.navlink}
            to="/"
            onClick={() => setOpen(false)}
          >
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link
            className={classes.navlink}
            to="/create"
            onClick={() => setOpen(false)}
          >
            <ListItem button>
              <ListItemIcon>
                <PersonAddIcon style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Create User" />
            </ListItem>
          </Link>
          <Link
            className={classes.navlink}
            to="/creategolfevent"
            onClick={() => setOpen(false)}
          >
            <ListItem button>
              <ListItemIcon>
                <GolfCourseIcon style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Create Golf Event" />
            </ListItem>
          </Link>
          <Link
            className={classes.navlink}
            to="/eventleaderboard"
            onClick={() => setOpen(false)}
          >
            <ListItem button>
              <ListItemIcon>
                <AssessmentIcon style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Event Leaderboard" />
            </ListItem>
          </Link>
          <Link
            className={classes.navlink}
            to="/createcompetition"
            onClick={() => setOpen(false)}
          >
            <ListItem button>
              <ListItemIcon>
                <AssessmentIcon style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Create Golf Competition" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}
