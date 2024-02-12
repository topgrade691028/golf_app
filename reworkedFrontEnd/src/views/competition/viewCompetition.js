import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  ButtonGroup
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import useStyles from './styles';
import EditCompetitionModal from './components/editCompetitionModal';
import DeleteConfirmationModal from './components/deleteConfirmationModal';
import { selectedCompetition } from 'store/actions/competitionActions';

import { gridSpacing } from 'store/constant';

const ViewCompetition = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('id');
  const [competitions, setCompetitions] = useState([]);

  const [deleteConfirmationCompetitionId, setDeleteConfirmationCompetitionId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const [editedCompetition, setEditedCompetition] = useState({
    id: null,
    name: '',
    competitionType: ''
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/competition/search`, {
        params: {
          searchText,
          searchType
        }
      });
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = response.data;
        setCompetitions(data);
      } else {
        throw new Error('Response is not in JSON format');
      }
    } catch (error) {
      console.error('Error searching competitions:', error);
    }
  };

  const handleEdit = (competitionId) => {
    // Find the competition to edit using the competitionId
    const competitionToEdit = competitions.find((competition) => competition.id === competitionId);

    // Set the edited competition data
    setEditedCompetition({
      id: competitionToEdit.id,
      name: competitionToEdit.name,
      competitionType: competitionToEdit.competitionType
    });

    // Open the modal
    setIsModalOpen(true);

    // console.log(`Edit competition with ID: ${competitionId}`);
    // console.log('Edited competition : ' + JSON.stringify(editedCompetition));
  };

  const handleViewEvents = (competitionId) => {
    const selectedCompetitionObj = competitions.find((competition) => competition.id === competitionId);
    if (selectedCompetitionObj) {
      dispatch(selectedCompetition(competitionId))
      navigate('/competition/events', {
        competitionId: selectedCompetitionObj.id,
        competitionName: selectedCompetitionObj.name
      });
    }
  };

  const handleDelete = (competitionId) => {
    // console.log(`handleDelete called with competition ID: ${competitionId}`);
    setDeleteConfirmationCompetitionId(competitionId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleSave = async (updatedCompetition) => {
    // console.log('in the in save of ViewCompetition');
    // console.log('editedCompetition' + JSON.stringify(updatedCompetition));

    try {
      await axios.put(`${process.env.REACT_APP_API}/competition/update/${updatedCompetition.id}`, updatedCompetition);
      // console.log(`Competition with ID ${updatedCompetition.id} updated.`);

      // Update the competition in the list or state with the updated competition
      const updatedCompetitionIndex = competitions.findIndex((competition) => competition.id === updatedCompetition.id);
      if (updatedCompetitionIndex !== -1) {
        const updatedCompetitions = [...competitions];
        updatedCompetitions[updatedCompetitionIndex] = updatedCompetition;
        setCompetitions(updatedCompetitions); // Update the state with the updated competition list
      }
    } catch (error) {
      console.error(`Error updating competition with ID ${updatedCompetition.id}:`, error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirmation = async () => {
    console.log('handleDeleteConfirmation called');
    try {
      await axios.delete(`${process.env.REACT_APP_API}/competition/delete/${deleteConfirmationCompetitionId}`);
      console.log(`Competition with ID ${deleteConfirmationCompetitionId} deleted.`);
      // Remove the deleted competition from the list
      setCompetitions((prevCompetitions) => prevCompetitions.filter((competition) => competition.id !== deleteConfirmationCompetitionId));
    } catch (error) {
      console.error(`Error deleting competition with ID ${deleteConfirmationCompetitionId}:`, error);
    } finally {
      setIsDeleteConfirmationOpen(false);
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };
  return (
    <Grid container spacing={gridSpacing}>
      <Container className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Search Competitions
          </Typography>

          <Box display="flex" alignItems="center" marginBottom={2}>
            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search..." />
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
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
                  <TableCell align="left">Events</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {competitions.length > 0 ? (
                  competitions.map((competition) => (
                    <TableRow key={competition.id}>
                      <TableCell align="right">{competition.id}</TableCell>
                      <TableCell align="left">{competition.name}</TableCell>
                      <TableCell align="left"> {competition.competitionType} </TableCell>
                      <TableCell align="left">
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                          <Button onClick={() => handleEdit(competition.id)}>Edit</Button>
                          <Button onClick={() => handleDelete(competition.id)}>Delete</Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="left">
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                          <Button onClick={() => handleViewEvents(competition.id)}>View Events</Button>
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
        <EditCompetitionModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} competition={editedCompetition} />
        <DeleteConfirmationModal
          isOpen={isDeleteConfirmationOpen}
          onClose={handleCloseDeleteConfirmation}
          onConfirm={handleDeleteConfirmation}
          competition={editedCompetition}
          message="All Associated Events and Scores will also be deleted. Are you Sure?"
        />
      </Container>
    </Grid>
  );
};

export default ViewCompetition;
