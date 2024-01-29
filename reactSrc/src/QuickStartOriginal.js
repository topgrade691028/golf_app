import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import CreateCompetition from "./CreateCompetition";
import CreateGolfEvent from "./CreateGolfEvent";
import PlayerCreate from "./PlayerCreate";
import AddGolfCourse from "./AddGolfCourse";
import GroupPairingsModal from "./GroupPairingsModal";
import ViewScoreCards from "./ViewScoreCards";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    overflow: "hidden",
  },
  tabContainer: {
    width: "80%",
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    overflow: "hidden",
    marginTop: theme.spacing(2),
    position: "relative",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    width: "100%",
  },
  buttonWrapper: {
    marginLeft: theme.spacing(1),
  },
}));

const QuickStart = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [competitionId, setCompetitionId] = useState("");

  const [competitionData, setCompetitionData] = useState({});

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCompetitionSave = (data) => {
    setCompetitionData(data);
    console.log(JSON.stringify(data));
  };

  const handleNextTab = () => {
    const { competitionName, competitionType } = competitionData;
    console.log("here in nextTab " + competitionName);
    setActiveTab((prevTab) => prevTab + 1);
  };

  const handlePreviousTab = () => {
    setActiveTab((prevTab) => prevTab - 1);
  };

  return (
    <div className={classes.container}>
      <div className={classes.tabContainer}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Competition" />
          <Tab label="Event" disabled={!competitionId} />
          <Tab label="Players" disabled={activeTab < 2} />
          <Tab label="Course" disabled={activeTab < 3} />
          <Tab label="Generate Groups" disabled={activeTab < 4} />
          <Tab label="View ScoreCards" disabled={activeTab < 5} />
        </Tabs>
        {activeTab === 0 && (
          <React.Fragment>
            <CreateCompetition onSave={handleCompetitionSave} />
            <div className={classes.buttonContainer}>
              {activeTab > 0 && (
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handlePreviousTab}
                  >
                    Back
                  </Button>
                </div>
              )}
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextTab}
                >
                  Next
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
        {activeTab === 1 && (
          <React.Fragment>
            <CreateGolfEvent competitionId={competitionId} />
            <div className={classes.buttonContainer}>
              {activeTab > 0 && (
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePreviousTab}
                  >
                    Back
                  </Button>
                </div>
              )}
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextTab}
                >
                  Next
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
        {activeTab === 2 && (
          <React.Fragment>
            <PlayerCreate />
            <div className={classes.buttonContainer}>
              {activeTab > 0 && (
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePreviousTab}
                  >
                    Back
                  </Button>
                </div>
              )}
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextTab}
                >
                  Next
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
        {activeTab === 3 && (
          <React.Fragment>
            <AddGolfCourse />
            <div className={classes.buttonContainer}>
              {activeTab > 0 && (
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePreviousTab}
                  >
                    Back
                  </Button>
                </div>
              )}
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextTab}
                >
                  Save and Next
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
        {activeTab === 4 && (
          <React.Fragment>
            <GroupPairingsModal />
            <div className={classes.buttonContainer}>
              {activeTab > 0 && (
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePreviousTab}
                  >
                    Back
                  </Button>
                </div>
              )}
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextTab}
                >
                  Save and Next
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
        {activeTab === 5 && <ViewScoreCards />}
      </div>
    </div>
  );
};

export default QuickStart;
