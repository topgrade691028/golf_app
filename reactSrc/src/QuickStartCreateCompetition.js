import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { apiUrl } from "./config";

const QuickStartCreateCompetition = ({ onNext }) => {
  const [competitionName, setCompetitionName] = useState("");
  const [competitionType, setCompetitionType] = useState("");
  const [competitionId, setCompetitionId] = useState("");
  const [competitionTypes, setCompetitionTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/competition/competition-type`)
      .then((response) => {
        setCompetitionTypes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching competition types:", error);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    const updatedCompetitionId = 12345;
    setCompetitionId(updatedCompetitionId);
    onNext({ competitionName, competitionId: updatedCompetitionId });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <form onSubmit={handleNext}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Competition Name"
            value={competitionName}
            onChange={(event) => setCompetitionName(event.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Save and Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default QuickStartCreateCompetition;
