<?php
require_once "db.php";

$conn = new mysqli($servername, $username, $password, $dbname);
    if  ($conn->connect_error) {
        die("Connection Failed: " . $conn->connect_error);
    }

    session_start(); 
    if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] === false) {
        header("Location: login.php");
        exit();
    }

echo '<label>You are logged in as ' . $_SESSION['username'] . '</label>';
echo '<br />';
echo '<a href="logout.php">Logout</a>';

// Retrieve the song details based on the id parameter
if (isset($_GET['id'])) {
    $songId = $_GET['id'];
    $sql = "SELECT * FROM ratings WHERE id = $songId";
    $result = mysqli_query($conn, $sql);

    if ($result && $row = mysqli_fetch_assoc($result)) {
        // Display the details of the song
        echo "<h1>View Rating</h1>";
        echo "<p>ID: " . $row['id'] . "</p>";
        echo "<p>Username: " . $row['username'] . "</p>";
        echo "<p>Artist: " . $row['artist'] . "</p>";
        echo "<p>Song: " . $row['song'] . "</p>";
        echo "<p>Rating: " . $row['rating'] . "</p>";

        // Back button to go back to read.php
        echo '<form method="post" action="read.php">';
        echo '    <button type="submit">Back</button>';
        echo '</form>';
    } else {
        echo "<p>Song not found!</p>";
    }
    } else {
    echo "<p>Invalid request!</p>";
    }

    mysqli_close($conn);
    ?>