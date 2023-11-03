import './ratings.css';
import React, { useState } from 'react';



function Ratings() {
    const [Artist, ArtistInput] = useState('');
    const [Song, SongInput] = useState('');
    const [Rating, RatingInput] = useState(1);
  
    const updateList = () => {
                                        //FIND THE AVERAGE SCORE OF THE SONG IN THE DATABASE AND UPDATE THE LIST
    }
  
    const handleRetrieveValues = () => {
      // check that all an artist, song, and rating have been given and create a new entry
      if (Artist.trim() !== '') {
        if(Song.trim() !=='') {
                                       //ADD FUNCTIONALITY TO ADD TO DATABASE
          updateList()
    }
  }
  }
    return (
      
      
        
          
          <div className="makeEntry">
          <p>Rate a Song Here!</p>
          <p>Artist:</p>
          <input
          type="text"
          placeholder="Artist"
          value={Artist}
          onChange={(e) => ArtistInput(e.target.value)}
        />
        <p>Song:</p>
        <input
          type="text"
          placeholder="Song"
          value={Song}
          onChange={(e) => SongInput(e.target.value)}
        />
        
        
  
        <p>Rating:</p>
        <select value={Rating} onChange={(e) => RatingInput(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p></p>
        <button onClick={handleRetrieveValues}>Submit Rating</button>
  
      
        
        
        <div className="songDisplay">
           <p>Ratings List</p>
           <p>placeholder song</p>
           
           
          </div>
        </div>
    );
  }
  
  export default Ratings;
        
  