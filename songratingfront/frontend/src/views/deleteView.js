import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function DeleteView({ id }) {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = () => {
    // Send a request to delete the song
    fetch(`http://localhost:80/index.php/music/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Handle success, e.g., show a success message or navigate back to the HomeView
          // You can use React Router to navigate to the home page.
          // Example: history.push("/");
          navigate("/read");
        } else {
          // Handle failure, display an error message
          console.error("Error deleting song:", data.error);
        }
      })
      .catch((error) => {
        // Handle other errors, e.g., network issues
        console.error("Error deleting song:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" style={{ margin: "20px 0" }}>
        Delete Rating
      </Typography>

      <form>
        <input type="hidden" name="id" value={id} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleDeleteClick}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDeleteConfirm}
        >
          Confirm
        </Button>
      </form>

      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Delete Rating</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this rating?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DeleteView;
