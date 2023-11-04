import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import UpdateView from "./updateView";

// StarRating component to display song ratings
function StarRating({ rating }) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;

  // Create an array of star components based on the rating
  const stars = Array.from({ length: maxStars }, (_, index) => {
    if (index < fullStars) {
      return <span key={index} role="img" aria-label="star">⭐</span>;
    } else if (index === fullStars && halfStars === 1) {
      return <span key={index} role="img" aria-label="half-star">🌟</span>;
    } else {
      return <span key={index} role="img" aria-label="empty-star">☆</span>;
    }
  });

  return <span>{stars}</span>;
}

function HomeView() {
  const navigate = useNavigate();
  const [songList, setSongList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newSong, setNewSong] = useState({ artist: "", song: "", rating: "" });
  const [artistFilter, setArtistFilter] = useState("");

  useEffect(() => {
    // Fetch user data and song list on component mount
    const user = Cookies.get('name');
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:80/index.php/music/list?username=${user}`)
      .then((response) => response.json())
      .then((data) => setSongList(data))
      .catch((error) => console.error("Error fetching song list:", error));

    setLoggedInUser(user);
  }, [navigate]);

  const handleCreateClick = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateClose = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateSong = () => {
    // Create a new song and update the song list
    fetch("http://localhost:80/index.php/music/create", {
      method: "POST",
      body: JSON.stringify(newSong),
    })
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:80/index.php/music/list")
          .then((response) => response.json())
          .then((data) => setSongList(data))
          .catch((error) => console.error("Error fetching song list:", error));

        setOpenCreateDialog(false);
      })
      .catch((error) => console.error("Error creating song:", error));
  };

  // Filter songs based on artist name
  const filteredSongs = songList.filter((song) =>
    artistFilter
      ? song.artist.toLowerCase().includes(artistFilter.toLowerCase())
      : true
  );

  return (
    <div>
      {loggedInUser && (
        <>
          {/* Display welcome message and logout button */}
          <Typography variant="h6">Welcome, {loggedInUser}!</Typography>
          <button onClick={() => {
            Cookies.remove('name');
            navigate("/login");
          }}>Logout</button>
        </>
      )}

      {/* Search bar for artist filtering */}
      <TextField
        label="Search by Artist"
        value={artistFilter}
        onChange={(e) => setArtistFilter(e.target.value)}
        fullWidth
        style={{ margin: "20px 0" }}
      />

      {/* Button to create a new song */}
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Create Song
      </Button>

      {/* List of songs with their details and update button */}
      <List>
        {filteredSongs.map((song) => (
          <ListItem key={song.id}>
            <ListItemText
              primary={song.song}
              secondary={`Artist: ${song.artist}`}
            />
            <StarRating rating={song.rating} />
            {loggedInUser === song.username && (
              <Link to={`/update/${song.id}`}>
                <Button variant="contained" color="primary">Update</Button>
              </Link>
            )}
          </ListItem>
        ))}
      </List>

      {/* Dialog for creating a new song */}
      <Dialog open={openCreateDialog} onClose={handleCreateClose}>
        <DialogTitle>Create New Song</DialogTitle>
        <DialogContent>
          <TextField
            label="Artist"
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            fullWidth
          />
          <TextField
            label="Song"
            value={newSong.song}
            onChange={(e) => setNewSong({ ...newSong, song: e.target.value })}
            fullWidth
          />
          <TextField
            label="Rating"
            value={newSong.rating}
            onChange={(e) => setNewSong({ ...newSong, rating: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose} color="primary">Cancel</Button>
          <Button onClick={handleCreateSong} color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HomeView;

