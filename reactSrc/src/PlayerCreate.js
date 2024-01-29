import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import axios from "axios";
import { apiUrl } from "./config";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
  saveButton: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
}));

export default function PlayerCreate() {
  const classes = useStyles();

  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: "", handicap: "" });
  const [openImportDialog, setOpenImportDialog] = useState(false);

  const handleImportClick = () => {
    setOpenImportDialog(true);
  };

  const handleImportClose = () => {
    setOpenImportDialog(false);
  };

  const handleImportPlayers = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const rows = content.split("\n");
      const importedPlayers = rows.map((row) => {
        const [name, handicap] = row.split(",");
        return { name, handicap };
      });
      setPlayers(importedPlayers);
      handleImportClose();
    };
    reader.readAsText(file);
  };

  const handleAddPlayer = () => {
    if (newPlayer.name && newPlayer.handicap) {
      setPlayers([...players, newPlayer]);
      setNewPlayer({ name: "", handicap: "" });
    } else {
      console.log("Please enter both the name and handicap");
    }
  };

  const handleSave = () => {
    if (players.some((player) => !player.name || !player.handicap)) {
      alert("Please enter all player details");
      return;
    }

    axios
      .post(`${apiUrl}/players`, players)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "ok") {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Paper>
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Player
          </Typography>
          <Button
            className={classes.addButton}
            color="primary"
            variant="outlined"
            onClick={handleImportClick}
          >
            Import Players
          </Button>
          <form className={classes.form} onSubmit={handleSave}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Handicap</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players.map((player, index) => (
                    <TableRow key={index}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.handicap}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Name"
                        className={classes.textField}
                        value={newPlayer.name}
                        onChange={(e) =>
                          setNewPlayer({ ...newPlayer, name: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Handicap"
                        className={classes.textField}
                        value={newPlayer.handicap}
                        onChange={(e) =>
                          setNewPlayer({
                            ...newPlayer,
                            handicap: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.addButton}
                        color="primary"
                        onClick={handleAddPlayer}
                      >
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.saveButton}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </form>
        </div>
        <Dialog open={openImportDialog} onClose={handleImportClose}>
          <DialogTitle>Import Players</DialogTitle>
          <DialogContent>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleImportPlayers(e.target.files[0])}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </Paper>
  );
}
