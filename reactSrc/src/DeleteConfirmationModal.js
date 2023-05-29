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
    backgroundColor: theme.palette.background.paper,
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
}));

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  competition,
  message,
}) => {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onConfirm(competition);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation Modal"
      className={classes.modalContainer}
      overlayClassName={classes.modalOverlay}
    >
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleSave} color="primary">
          Yes
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
