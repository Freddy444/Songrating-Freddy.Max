import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

function UpdateView({ onClose }) {
  // State to store the song details for update
  const [updateData, setUpdateData] = useState({
    artist: "",
    song: "",
    rating: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch song details and update updateData when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:80/index.php/music/read/${id}`);
        const data = await response.json();
        setUpdateData(data);
      } catch (error) {
        console.error("Error fetching song details:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // Redirect to login if the user is not logged in
    const name = Cookies.get('name');
    if (!name) {
      navigate('/login');
    }
  }, [navigate]);

  // Handle the song update
  const handleUpdate = async () => {
    const payload = { ...updateData, "id": id };

    try {
      const response = await fetch(`http://localhost:80/index.php/music/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Song updated successfully");
      } else {
        console.error("Error updating song:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating song:", error.message);
    }

    // After updating, close the dialog
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Update Song</DialogTitle>
      <DialogContent>
        <TextField
          label="Artist"
          value={updateData.artist}
          onChange={(e) => setUpdateData({ ...updateData, artist: e.target.value })}
          fullWidth
        />
        <TextField
          label="Song"
          value={updateData.song}
          onChange={(e) => setUpdateData({ ...updateData, song: e.target.value })}
          fullWidth
        />
        <TextField
          label="Rating"
          value={updateData.rating}
          onChange={(e) => setUpdateData({ ...updateData, rating: e.target.value })}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate("/")} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateView;
