import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
  Grid,
  Typography,
  DialogActions,
  Fragment,
} from "@material-ui/core";

import { apiUrl } from "./config";

const GroupPairingsModal = ({ open, onClose, golfEvent }) => {
  const [playersRegisteredForEvent, setPlayersRegisteredForEvent] = useState(
    []
  );
  const [groupPairings, setGroupPairings] = useState([]);
  const [manuallyCreatedPairings, setManuallyCreatedPairings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open) {
      // Fetch players registered for the event
      fetch(`${apiUrl}/events/getPlayersForEvent/${golfEvent.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(
            "Response from getPlayersForEvent:",
            JSON.stringify(data)
          );
          setPlayersRegisteredForEvent(data);
        })
        .catch((error) => console.error("Error fetching players:", error))
        .finally(() => setIsLoading(false));

      // Fetch group pairings
      fetch(`${apiUrl}/events/getplayergroups/${golfEvent.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from getplayergroups:", JSON.stringify(data));
          setGroupPairings(data); // Ensure that data is being set correctly here
        })
        .catch((error) =>
          console.error("Error fetching group pairings:", error)
        );
    }
  }, [open, golfEvent.id]);

  const handleSaveGroups = async () => {
    const requestBody = {
      eventId: golfEvent.id,
      playerGroups: groupPairings,
    };

    fetch(`${apiUrl}/events/savegroupsforevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          onClose(); // Close the modal on successful save
          console.log("Groups saved successfully");
          setModalKey((prevKey) => prevKey + 1);
        } else {
          console.error("Error saving groups:", response.statusText);
        }
      })
      .catch((error) => console.error("Error saving groups:", error));
  };

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
    //alert("Pairings are " + pairings);
  };

  const handleAddManuallyCreatedPairing = () => {
    if (manuallyCreatedPairings.length < 4) {
      setManuallyCreatedPairings((prevPairings) => [
        ...prevPairings,
        { groupNumber: prevPairings.length + 1, players: [] },
      ]);
    }
  };

  const handleAddPlayerToGroup = (player, groupNumber) => {
    setManuallyCreatedPairings((prevPairings) =>
      prevPairings.map((pairing) => {
        if (pairing.groupNumber === groupNumber) {
          return {
            ...pairing,
            players: [...pairing.players, player],
          };
        }
        return pairing;
      })
    );
  };

  const handleCloseModal = () => {
    setManuallyCreatedPairings([]); // Clear manually created pairings when closing the modal
    onClose();
  };

  const canAddGroup = playersRegisteredForEvent.length > 0;

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
                disabled={isLoading || groupPairings.length > 0}
              >
                {groupPairings.length === 0
                  ? "Generate Pairings"
                  : "Generate New Pairings"}
              </Button>
            </Grid>
            {groupPairings.length > 0 && (
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
                    {groupPairings
                      .reduce((groups, pairing) => {
                        if (!groups[pairing.groupNumber]) {
                          groups[pairing.groupNumber] = [];
                        }
                        groups[pairing.groupNumber].push(pairing.player.name);
                        return groups;
                      }, [])
                      .map((players, groupNumber) => (
                        <TableRow key={groupNumber}>
                          <TableCell>{groupNumber}</TableCell>
                          <TableCell>{players.join(", ")}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Grid>
            )}
            {canAddGroup && (
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddManuallyCreatedPairing}
                  disabled={manuallyCreatedPairings.length >= 4}
                >
                  Add Group
                </Button>
              </Grid>
            )}
            {manuallyCreatedPairings.length > 0 && (
              <Grid item>
                {/* Display manually created pairings */}
                <Typography variant="h6">Manually Created Pairings:</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Group</TableCell>
                      <TableCell>Players</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {manuallyCreatedPairings.map((pairing, index) => (
                      <TableRow key={index}>
                        <TableCell>{pairing.groupNumber}</TableCell>
                        <TableCell>
                          {pairing.players.length > 0
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
            )}
          </Grid>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        {groupPairings.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveGroups}
          >
            Save Groups
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GroupPairingsModal;
