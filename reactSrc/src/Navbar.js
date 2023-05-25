import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withTheme,
  Collapse,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import VisibilityIcon from "@material-ui/icons/Visibility";

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
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: theme.spacing(1),
    color: "white",
  },
  listItemTextLight: {
    color: theme.palette.text.primary,
  },
  listItemTextDark: {
    color: "#fff",
  },
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openCompetition, setOpenCompetition] = React.useState(false);
  const [openGolfEvent, setOpenGolfEvent] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCompetitionClick = () => {
    setOpenCompetition(!openCompetition);
  };

  const handleGolfEventClick = () => {
    setOpenGolfEvent(!openGolfEvent);
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
        <IconButton
          className={classes.closeButton}
          color="inherit"
          aria-label="close"
          onClick={handleDrawerClose}
        >
          <CloseIcon />
        </IconButton>
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
          <ListItem button onClick={handleGolfEventClick}>
            <ListItemIcon>
              <GolfCourseIcon
                style={{ color: openGolfEvent ? "#000" : "#fff" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Golf Event"
              className={
                openGolfEvent
                  ? classes.listItemTextLight
                  : classes.listItemTextDark
              }
            />
            {openGolfEvent ? (
              <ExpandLess style={{ color: "#000" }} />
            ) : (
              <ExpandMore style={{ color: "#fff" }} />
            )}
          </ListItem>

          <Collapse in={openGolfEvent} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                className={classes.navlink}
                to="/creategolfevent"
                onClick={() => setOpen(false)}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <PersonAddIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Create Golf Event" />
                </ListItem>
              </Link>
              <Link
                className={classes.navlink}
                to="/viewGolfevent"
                onClick={() => setOpen(false)}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <PersonAddIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="View Golf Event" />
                </ListItem>
              </Link>
              <Link
                className={classes.navlink}
                to="/viewScoreCards"
                onClick={() => setOpen(false)}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <PersonAddIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="View Score Cards" />
                </ListItem>
              </Link>
              <Link
                className={classes.navlink}
                to="/eventleaderboard"
                onClick={() => setOpen(false)}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AssessmentIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Event Leaderboard" />
                </ListItem>
              </Link>
            </List>
          </Collapse>

          <ListItem button onClick={handleCompetitionClick}>
            <ListItemIcon>
              <AssessmentIcon
                style={{ color: openCompetition ? "#000" : "#fff" }}
              />
            </ListItemIcon>

            <ListItemText
              primary="Competition"
              className={
                openCompetition
                  ? classes.listItemTextLight
                  : classes.listItemTextDark
              }
            />
            {openCompetition ? (
              <ExpandLess style={{ color: "#000" }} />
            ) : (
              <ExpandMore style={{ color: "#fff" }} />
            )}
          </ListItem>

          <Collapse in={openCompetition} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                className={classes.navlink}
                to="/createcompetition"
                onClick={() => setOpen(false)}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <PersonAddIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Create Competition" />
                </ListItem>
              </Link>
              <Link
                className={classes.navlink}
                to="/viewcompetition"
                onClick={() => setOpen(false)}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <VisibilityIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="View Competition" />
                </ListItem>
              </Link>
              <Link
                className={classes.navlink}
                to="/registerplayers"
                onClick={() => setOpen(false)}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <VisibilityIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Register Players" />
                </ListItem>
              </Link>
              <Link
                className={classes.navlink}
                to="/viewcompetitionevents"
                onClick={() => setOpen(false)}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <VisibilityIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="View Competition Events" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </div>
  );
}
