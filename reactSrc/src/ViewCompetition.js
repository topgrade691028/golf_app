import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useHistory } from "react-router-dom";
import axios from "axios";

import EditCompetitionModal from "./EditCompetitionModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { apiUrl } from "./config";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "100%",
    maxWidth: 600,
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const CreateEventButton = ({ competitionId, competitionName }) => {
  const history = useHistory();
  const handleCreateEvent = () => {
    history.push("/viewcompetitionevents", {
      competitionId: competitionId,
      competitionName: competitionName,
    });

    console.log(`Create Event competition with ID: ${competitionId}`);
    console.log(`Create Event competition with name: ${competitionName}`);
  };

  return <Button onClick={handleCreateEvent}>View Events</Button>;
};

const Search = () => {
  const classes = useStyles();
  const history = useHistory();
  // Rest of the component code...
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [competitions, setCompetitions] = useState([]);

  const [deleteConfirmationCompetitionId, setDeleteConfirmationCompetitionId] =
    useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [editedCompetition, setEditedCompetition] = useState({
    id: null,
    name: "",
    competitionType: "",
  });

  const handleSearch = async () => {
    try {
      alert("searchText is " + searchText);
      alert("searchType is " + searchType);
      const response = await axios.get(`${apiUrl}/competition/search`, {
        params: {
          searchText,
          searchType,
        },
      });
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = response.data;
        setCompetitions(data);
      } else {
        throw new Error("Response is not in JSON format");
      }
    } catch (error) {
      console.error("Error searching competitions:", error);
    }
  };

  const handleEdit = (competitionId) => {
    // Find the competition to edit using the competitionId
    const competitionToEdit = competitions.find(
      (competition) => competition.id === competitionId
    );

    // Set the edited competition data
    setEditedCompetition({
      id: competitionToEdit.id,
      name: competitionToEdit.name,
      competitionType: competitionToEdit.competitionType,
    });

    // Open the modal
    setIsModalOpen(true);

    console.log(`Edit competition with ID: ${competitionId}`);
    console.log("Edited competition : " + JSON.stringify(editedCompetition));
  };

  const handleDelete = (competitionId) => {
    console.log(`handleDelete called with competition ID: ${competitionId}`);

    setDeleteConfirmationCompetitionId(competitionId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleSave = async (updatedCompetition) => {
    console.log("in the in save of ViewCompetition");
    console.log("editedCompetition" + JSON.stringify(updatedCompetition));

    try {
      const response = await axios.put(
        `${apiUrl}/competition/update/${updatedCompetition.id}`,
        updatedCompetition
      );
      console.log(`Competition with ID ${updatedCompetition.id} updated.`);

      // Update the competition in the list or state with the updated competition
      const updatedCompetitionIndex = competitions.findIndex(
        (competition) => competition.id === updatedCompetition.id
      );
      if (updatedCompetitionIndex !== -1) {
        const updatedCompetitions = [...competitions];
        updatedCompetitions[updatedCompetitionIndex] = updatedCompetition;
        setCompetitions(updatedCompetitions); // Update the state with the updated competition list
      }
    } catch (error) {
      console.error(
        `Error updating competition with ID ${updatedCompetition.id}:`,
        error
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //  const handleDelete = (competitionId) => {
  //    setDeleteConfirmationCompetitionId(competitionId);
  //    setIsDeleteConfirmationOpen(true);
  //  };

  const handleDeleteConfirmation = async () => {
    console.log("handleDeleteConfirmation called");
    try {
      await axios.delete(
        `${apiUrl}/competition/delete/${deleteConfirmationCompetitionId}`
      );
      console.log(
        `Competition with ID ${deleteConfirmationCompetitionId} deleted.`
      );
      // Remove the deleted competition from the list
      setCompetitions((prevCompetitions) =>
        prevCompetitions.filter(
          (competition) => competition.id !== deleteConfirmationCompetitionId
        )
      );
    } catch (error) {
      console.error(
        `Error deleting competition with ID ${deleteConfirmationCompetitionId}:`,
        error
      );
    } finally {
      setIsDeleteConfirmationOpen(false);
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Search Competitions
        </Typography>

        <Box display="flex" alignItems="center" marginBottom={2}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Competition Type</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {competitions.length > 0 ? (
                competitions.map((competition) => (
                  <TableRow key={competition.id}>
                    <TableCell align="right">{competition.id}</TableCell>
                    <TableCell align="left">{competition.name}</TableCell>
                    <TableCell align="left">
                      {competition.competitionType}
                    </TableCell>
                    <TableCell align="left">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        <Button onClick={() => handleEdit(competition.id)}>
                          Edit
                        </Button>
                        <Button onClick={() => handleDelete(competition.id)}>
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No competitions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <EditCompetitionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        competition={editedCompetition}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
        onConfirm={handleDeleteConfirmation}
        competition={editedCompetition}
        message="All Associated Events and Scores will also be deleted. Are you Sure?"
      />
    </Container>
  );
};

export default Search;
