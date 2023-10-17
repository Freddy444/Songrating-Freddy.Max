<?php
require_once "db.php";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
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


if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["Add_Song"])) {
    // Get the user's username
    $username = $_SESSION["username"];

    // Get the song details from the form
    $new_artist = $_POST['artist'];
    $new_song = $_POST['song'];
    $new_rating = intval($_POST['rating']); // Assume the rating is on a numeric scale of 1 to 5

    // Check if the user has already rated the same song
    $check_sql = "SELECT * FROM ratings WHERE username = ? AND artist = ? AND song = ?";
    $check_stmt = mysqli_prepare($conn, $check_sql);
    mysqli_stmt_bind_param($check_stmt, "sss", $username, $new_artist, $new_song);
    mysqli_stmt_execute($check_stmt);
    $result = mysqli_stmt_get_result($check_stmt);

    if (mysqli_num_rows($result) > 0) {
        // User has already rated this song, display a message
        echo "You have already rated this song. You cannot rate the same song twice.";
    } else {
        // Insert the new song into the database
        $insert_sql = "INSERT INTO ratings (username, artist, song, rating) VALUES (?, ?, ?, ?)";
        $insert_stmt = mysqli_prepare($conn, $insert_sql);
        mysqli_stmt_bind_param($insert_stmt, "sssi", $username, $new_artist, $new_song, $new_rating);

        try {
            // Execute the prepared statement
            if (mysqli_stmt_execute($insert_stmt) === TRUE) {
                echo "Song added successfully!";
            } else {
                // Display an error message if the insertion fails
                echo "Error: " . $insert_sql . "<br>" . mysqli_error($conn);
            }
        } catch (Exception $e) {
            // Catch any exceptions and display the error
            echo $e;
        }
    }

    // Close the prepared statements
    mysqli_stmt_close($check_stmt);
    mysqli_stmt_close($insert_stmt);
}
?>

<!-- Form for adding a new song -->
<h1> Rate A Song! </h1>
<form action="" method="post">
    <label>Artist:</label>
    <input type="text" name="artist" required><br>

    <label>Song:</label>
    <input type="text" name="song" required><br>

    <label>Rating (1 to 5):</label>
    <input type="number" name="rating" min="1" max="5" required><br>

    <input type="submit" value="Add Song" name="Add_Song">
    <a href="read.php"><button type="button">Cancel</button></a>
</form>
