import React from 'react';
import styles from './home.module.css';

function Homescreen() {
  return (
    <div className={styles.backgroundImage}>
      <div className={`${styles.flexItem} ${styles.box}`}>
        <section>
          <h2 className={`${styles.content} content`}>New Features Here!</h2>
          <p>Song Ratings</p>
          <p>Song Reviews</p>
          <p>Song Discussion Boards</p>
          <p>Artist Leaderboard</p>
        </section>
      </div>

      <div className={`${styles.flexItem} ${styles.box}`}>
        <section>
          <p>Learn about our song rating system!</p>
          <p>Read and write your own reviews!</p>
          <p>Check out the latest artists on the leaderboard!</p>
        </section>

        <section>
          <p>Listen to our song suggestions on Spotify!</p>
          <iframe
            title="spotmuse"
            src="https://open.spotify.com/embed/playlist/1Qfs7pecrN8NyjgB0KqBn9?utm_source=generator"
            width="100%"
            height="352"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </section>
      </div>

      <div className={`${styles.flexItem} ${styles.box}`}>
        <section>
          <h2 className={`${styles.content} content`}>Subscriptions</h2>
          <p>Freemium</p>
          <p>Premium</p>
        </section>
      </div>

      <div className={`${styles.flexItem} ${styles.box}`}>

      </div>
    </div>
  );
}

export default Homescreen;
