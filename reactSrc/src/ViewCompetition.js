import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
} from "@material-ui/core";

import { apiUrl } from "./config";

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
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
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
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [competitions, setCompetitions] = useState([]);

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
    // Handle edit functionality, such as opening a modal with competition info

    console.log(`Edit competition with ID: ${competitionId}`);
  };

  const handleCreateEvent = (competitionId) => {
    // Handle edit functionality, such as opening a modal with competition info
    const history = useHistory();
    history.push("/creategolfevent", { competitionId });
    console.log(`Edit competition with ID: ${competitionId}`);
  };

  const handleDelete = async (competitionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/competition/remove/${competitionId}`
      );
      console.log(`Competition with ID ${competitionId} deleted.`);
      // Optionally, you can refresh the competition list or update state accordingly
    } catch (error) {
      console.error(
        `Error deleting competition with ID ${competitionId}:`,
        error
      );
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Search Competitions</h2>
      <div>
        <label>
          Search By:
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={`Search by ${searchType}`}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <h3>Search Results</h3>
      {competitions.length > 0 ? (
        <TableContainer component={Paper} className={classes.container}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Competition Type</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {competitions.map((competition) => (
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
                        Del
                      </Button>
                      <CreateEventButton
                        competitionId={competition.id}
                        competitionName={competition.name}
                      />
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No competitions found.</p>
      )}
    </div>
  );
};

export default Search;
