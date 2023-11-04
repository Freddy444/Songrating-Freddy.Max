import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function CreateView() {
  // State to store the new song data
  const [newSong, setNewSong] = useState({ artist: "", song: "", rating: "" });
  // State to control the visibility of the create dialog
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  // Handler to open the create dialog
  const handleCreateClick = () => setOpenCreateDialog(true);

  // Handler to close the create dialog
  const handleCreateClose = () => setOpenCreateDialog(false);

  // Handler to create a new song
  const handleCreateSong = () => {
    fetch("http://localhost:80/index.php/music/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Handle success, e.g., show a success message or navigate back to the HomeView
          // You can use React Router to navigate to the home page.
          // Example: history.push("/");
        } else {
          // Handle failure, display an error message
          console.error("Error creating song:", data.error);
        }
      })
      .catch((error) => {
        // Handle other errors, e.g., network issues
        console.error("Error creating song:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" style={{ margin: "20px 0" }}>
        Create a New Song
      </Typography>

      {/* Iterate over fields to create TextFields */}
      {["artist", "song", "rating"].map((field) => (
        <TextField
          key={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          value={newSong[field]}
          onChange={(e) => setNewSong({ ...newSong, [field]: e.target.value })}
          fullWidth
          style={{ margin: "10px 0" }}
        />
      ))}

      {/* Button to open the create dialog */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateClick}
        style={{ margin: "20px 0" }}
      >
        Create Song
      </Button>

      {/* Dialog to confirm the new song details */}
      <Dialog open={openCreateDialog} onClose={handleCreateClose}>
        <DialogTitle>Create New Song</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to create this song with the following details?
          </Typography>
          <ul>
            {/* Iterate over newSong properties to create list items */}
            {Object.entries(newSong).map(([key, value]) => (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          {/* Button to cancel the creation */}
          <Button onClick={handleCreateClose} color="primary">
            Cancel
          </Button>
          {/* Button to confirm and create the song */}
          <Button onClick={handleCreateSong} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CreateView;
