import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";

import axios from "axios";

import { apiUrl } from "./config";

const EditCompetitionModal = ({ isOpen, onClose, onSave, competition }) => {
  const [editedCompetition, setEditedCompetition] = useState(competition);
  const [competitionTypes, setCompetitionTypes] = useState([]);
  console.log(
    "Edited competition in modal: " + JSON.stringify(editedCompetition)
  );

  useEffect(() => {
    setEditedCompetition(competition); // Update the local state when the prop changes
  }, [competition]);

  useEffect(() => {
    fetchCompetitionTypes();
  }, []);

  const fetchCompetitionTypes = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/competition/competition-type`
      );
      setCompetitionTypes(response.data);
      console.log("responsedata is " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching competition types:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave(editedCompetition);

    onClose();
  };

  const handleNameChange = (value) => {
    // Update the name in the edited competition data
    const updatedCompetition = { ...editedCompetition, name: value };
    setEditedCompetition(updatedCompetition);
  };

  const handleCompetitionTypeChange = (e) => {
    // Update the competition type in the edited competition data
    const updatedCompetition = {
      ...editedCompetition,
      competitionType: e.target.value,
    };
    setEditedCompetition(updatedCompetition);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Edit Competition</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <TextField
            name="name"
            label="Name"
            value={editedCompetition.name}
            onChange={(e) => handleNameChange(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel id="competition-type-label">Type</InputLabel>
            <Select
              labelId="competition-type-label"
              id="competition-type-select"
              value={editedCompetition.competitionType} // Updated value
              onChange={handleCompetitionTypeChange} // Removed e.target.value
              required
            >
              {competitionTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCompetitionModal;
