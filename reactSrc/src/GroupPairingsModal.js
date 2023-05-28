import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import axios from "axios";

const GroupPairingsModal = ({ open, onClose, golfEvent }) => {
  const [groupPairings, setGroupPairings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalKey, setModalKey] = useState(0); // Add modalKey state variable

  console.log("get groupings with golfEvent " + JSON.stringify(golfEvent));

  useEffect(() => {
    const fetchPairings = async () => {
      console.log("get groupings with eventId " + golfEvent.id);
      try {
        const response = await axios.get(
          `http://localhost:8080/events/getplayergroups/${golfEvent.id}`
        );
        console.log("Response data:", response.data);

        // Group players by their "groupNumber"
        const groupedPairings = response.data.reduce((acc, pairing) => {
          const { groupNumber, player } = pairing;
          if (acc[groupNumber]) {
            acc[groupNumber].push(player);
          } else {
            acc[groupNumber] = [player];
          }
          return acc;
        }, {});

        console.log("Grouped pairings:", groupedPairings);

        // Convert the grouped pairings object into an array of arrays
        const pairings = Object.values(groupedPairings);

        setGroupPairings(pairings);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching group pairings:", error);
        // Handle error or show notification
      }
    };

    const fetchPlayersForEvent = async () => {
      console.log("get groupings with eventId " + golfEvent.id);
      try {
        const response = await axios.get(
          `http://localhost:8080/events/getPlayersForEvent/${golfEvent.id}`
        );
        console.log("Response data:", response.data);

        // Set players on golfEvent
        const updatedGolfEvent = { ...golfEvent, players: response.data };
        setGolfEvent(updatedGolfEvent);
      } catch (error) {
        console.error("Error fetching group pairings:", error);
        // Handle error or show notification
      }
    };

    if (open) {
      fetchPlayersForEvent();
      fetchPairings();
    }
  }, [open, golfEvent, modalKey]);

  const generatePairings = () => {
    // Create a copy of the players array to avoid mutation
    const playersCopy = [...golfEvent.players];
    const pairings = [];

    let groupNumber = 1; // Initialize the groupNumber

    while (playersCopy.length > 1) {
      const pair = [];
      for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * playersCopy.length);
        const player = playersCopy.splice(randomIndex, 1)[0];
        pair.push(player);
      }
      pairings.push({ groupNumber, players: pair }); // Include groupNumber in the pairings
      groupNumber++; // Increment groupNumber for the next pair
    }

    // If there's an odd number of players, add the last player to a random pair
    if (playersCopy.length === 1) {
      const randomPairIndex = Math.floor(Math.random() * pairings.length);
      pairings[randomPairIndex].players.push(playersCopy[0]);
    }

    // Log the updated playersCopy and pairings for debugging
    console.log("playersCopy is ", playersCopy);
    console.log("pairings is ", JSON.stringify(pairings));

    setGroupPairings(pairings);
  };

  const saveGroups = async () => {
    try {
      await axios.post("http://localhost:8080/events/savegroupsforevent", {
        eventId: golfEvent.id,
        playerGroups: groupPairings,
      });
      // Handle success or show notification
      console.log("Groups saved successfully");
      setModalKey((prevKey) => prevKey + 1); // Update modalKey to trigger effect on next open
    } catch (error) {
      console.error("Error saving groups:", error);
      // Handle error or show notification
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Group Pairings Generator</DialogTitle>
      <DialogContent>
        <Container maxWidth="xs">
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h6">Selected Players:</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Handicap</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {golfEvent.players.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.handicap}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={generatePairings}
                disabled={isLoading}
              >
                {groupPairings.length === 0
                  ? "Generate Pairings"
                  : "Generate New Pairings"}
              </Button>
            </Grid>
            {groupPairings && Object.keys(groupPairings).length > 0 ? (
              <Grid item>
                {/* Display the group pairings */}
                <Typography variant="h6">Group Pairings:</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Group</TableCell>
                      <TableCell>Players</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupPairings.map((pairing, index) => (
                      <TableRow key={index}>
                        <TableCell>{pairing.groupNumber}</TableCell>
                        <TableCell>
                          {pairing.players && pairing.players.length > 0
                            ? pairing.players
                                .map((player) => player.name)
                                .join(", ")
                            : "No players"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            ) : (
              <Grid item>
                {isLoading ? (
                  <Typography variant="body1">Loading...</Typography>
                ) : (
                  <Typography variant="h6">
                    No Group Pairings available
                  </Typography>
                )}
              </Grid>
            )}
          </Grid>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        {groupPairings.length > 0 && (
          <Button variant="contained" color="primary" onClick={saveGroups}>
            Save Groups
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GroupPairingsModal;
