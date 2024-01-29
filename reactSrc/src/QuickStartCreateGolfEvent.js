import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem, Button } from "@material-ui/core";
import axios from "axios";
import { apiUrl } from "./config";

const QuickStartCreateGolfEvent = ({
  onBack,
  onNext,
  competitionName,
  competitionId,
}) => {
  const [eventName, setEventName] = useState("");
  // Other state variables

  useEffect(() => {
    alert(
      "competitionName is " +
        competitionName +
        "competitionId is " +
        competitionId
    );
    // Fetch additional data or perform other operations
  }, []);

  const handleNext = () => {
    onNext({
      eventName,
      // Other data
    });
  };

  return (
    <form onSubmit={handleNext}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Event Name"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            variant="outlined"
          />
        </Grid>
        {/* Other fields */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Competition Name"
            value={competitionName}
            disabled
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={onBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save and Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default QuickStartCreateGolfEvent;
