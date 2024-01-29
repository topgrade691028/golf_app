import React, { useState } from "react";
import { Container, AppBar, Tabs, Tab, Button } from "@material-ui/core";
import QuickStartCreateCompetition from "./QuickStartCreateCompetition";
import QuickStartCreateGolfEvent from "./QuickStartCreateGolfEvent";
import QuickStartPlayerCreate from "./QuickStartPlayerCreate";
import QuickStartAddGolfCourse from "./QuickStartAddGolfCourse";
import QuickStartGroupPairings from "./QuickStartGroupPairingsModal";
import QuickStartViewScoreCards from "./QuickStartViewScoreCards";

const QuickStart = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [competitionName, setCompetitionName] = useState("");
  const [competitionId, setCompetitionId] = useState("");

  const handleNext = (data) => {
    alert(" data is " + JSON.stringify(data));
    setCompetitionName(data.competitionName);
    setCompetitionId(data.competitionId);
    setTabIndex((prevIndex) => prevIndex + 1);
  };

  const handleBack = () => {
    setTabIndex((prevIndex) => prevIndex - 1);
  };

  const handleSave = () => {
    // Handle save functionality
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static" color="default">
        <Tabs value={tabIndex} indicatorColor="primary" textColor="primary">
          <Tab label="Competition" />
          <Tab label="Event" />
          {/* Add other tabs */}
        </Tabs>
      </AppBar>
      {tabIndex === 0 && (
        <QuickStartCreateCompetition
          onNext={handleNext}
          competitionName={competitionName}
          competitionId={competitionId}
        />
      )}
      {tabIndex === 1 && (
        <QuickStartCreateGolfEvent
          onBack={handleBack}
          onNext={handleNext}
          competitionName={competitionName}
          competitionId={competitionId}
        />
      )}
      {/* Add other tab components */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {tabIndex > 0 && (
          <Button variant="contained" color="primary" onClick={handleBack}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={tabIndex === 5}
        >
          {tabIndex === 4 ? "Save" : "Save and Next"}
        </Button>
      </div>
    </Container>
  );
};

export default QuickStart;
