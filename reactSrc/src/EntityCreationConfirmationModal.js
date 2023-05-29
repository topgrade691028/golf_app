import React from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-modal";

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
    backgroundColor: "#fff", // Add a solid background color here
    boxShadow: theme.shadows[5],
    outline: "none",
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    width: "50%",
    maxWidth: 400,
    maxHeight: "80vh",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      maxWidth: "100%",
    },
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a solid background color here
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9998,
  },
}));

const EntityCreationConfirmationModal = ({
  isOpen,
  onClose,
  competitionId,
  message,
}) => {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Entity Create Successfully Modal"
      className={classes.modalContainer}
      overlayClassName={classes.modalOverlay}
    >
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Button onClick={handleClose} color="primary">
          Ok
        </Button>
      </Box>
    </Modal>
  );
};

export default EntityCreationConfirmationModal;
