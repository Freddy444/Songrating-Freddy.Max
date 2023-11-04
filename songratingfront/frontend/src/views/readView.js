import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function ReadView() {
  const navigate = useNavigate();
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    // Fetch song list on component mount
    const user = Cookies.get('name');
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate("/login");
      return;
    }

    // Fetch song list for the logged-in user
    fetch(`http://localhost:80/index.php/music/list?username=${user}`)
      .then((response) => response.json())
      .then((data) => {
        setSongList(data);
      })
      .catch((error) => {
        console.error("Error fetching song list:", error);
      });
  }, [navigate]);

  // Handle logout button click
  const handleLogout = () => {
    // Remove user cookie and redirect to login page
    Cookies.remove('name');
    navigate("/login");
  };

  return (
    <div>
      <Typography variant="h6">
        You are logged in as {Cookies.get('name')}
      </Typography>

      <h2>Song Ratings</h2>
      <p>
        <Link to="/create">Rate a Song!</Link>
      </p>

      {/* Display song list in a table */}
      <TableContainer>
        <Table border="1" cellspacing="0" cellpadding="8">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Song</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map through the song list to render each row */}
            {songList.map((song) => (
              <TableRow key={song.id}>
                <TableCell>{song.id}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>{song.song}</TableCell>
                <TableCell>{song.rating}</TableCell>
                <TableCell>
                  {/* Provide links to view, update, and delete each rating */}
                  <Link to={`/view/${song.id}`}>View</Link>
                  {Cookies.get('name') === song.username && (
                    <>
                      <Link to={`/update/${song.id}`}>Update</Link>
                      <Button onClick={() => handleDelete(song.id)}>Delete</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Logout button */}
      <form onSubmit={handleLogout}>
        <Button type="submit" variant="contained" color="primary">
          Logout
        </Button>
      </form>

      <br />
      {/* Link to go back to the home page */}
      <Link to="../index.html">Back to Home</Link>
    </div>
  );
}

export default ReadView;
