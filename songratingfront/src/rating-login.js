import './rating-login.css';
import React, { useState } from 'react';

function RatingLogin() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Artist, setArtist] = useState('');
  const [Song, setSong] = useState('');
  const [Rating, setRating] = useState(1);

  const updateList = () => {
    // FIND THE AVERAGE SCORE OF THE SONG IN THE DATABASE AND UPDATE THE LIST
  }

  const handleLogin = () => {
    // CHECK Username AND Password AGAINST THE USERS DATABASE
  }

  const handleRatingSubmit = () => {
    // Check that all an artist, song, and rating have been given and create a new entry
    if (Artist.trim() !== '' && Song.trim() !== '') {
      // ADD FUNCTIONALITY TO ADD TO DATABASE
      updateList();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Username:</p>
        <input
          type="text"
          placeholder="Username"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Password:</p>
        <input
          type="text"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log In</button>
      </header>

      <div className="Main">
        <div className="makeEntry">
          <p>Rate a Song Here!</p>
          <p>Artist:</p>
          <input
            type="text"
            placeholder="Artist"
            value={Artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <p>Song:</p>
          <input
            type="text"
            placeholder="Song"
            value={Song}
            onChange={(e) => setSong(e.target.value)}
          />
          <p>Rating:</p>
          <select value={Rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <p></p>
          <button onClick={handleRatingSubmit}>Submit Rating</button>
        </div>
        <div className="songDisplay">
          <p>Ratings List</p>
          {/* MAP THROUGH THE RATINGS AND DISPLAY HERE */}
        </div>
      </div>
    </div>
  );
}

export default RatingLogin;
