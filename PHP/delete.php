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

    /* For for deleting a song*/
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["Delete"])) {
        // Gets the music ID from the POST data
        $music = intval($_POST['id']);
        // Fetch the details of the song to be deleted
        $sql = "SELECT username, artist, song, rating FROM ratings WHERE id=$music";
        $result = mysqli_query($conn, $sql);

        // Extract song details from the result
        $row = mysqli_fetch_assoc($result);
        $music_username = $row['username'];
        $music_artist = $row['artist'];
        $music_song = $row['song'];
        $music_rating = $row['rating'];

?>

<label>You are logged in as <?php echo $music_username; ?></label>

<form action="" method="post">
    <input type='hidden' name='id' value=<?php echo $music ?>>
    <input type="submit" value="Cancel" name="Delete_Cancel">
    <input type="submit" value="Confirm" name="Delete_Confirm">
</form>



<?php
//user choice whther to delete or cancel
    } elseif ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["Delete_Confirm"])) {
        //sql statement deletes the item
        $sql = "DELETE FROM ratings WHERE id=?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $_POST['id']);
        try {
            if (mysqli_stmt_execute($stmt) === TRUE) {
                //redrects to songrating page if successful
                header("Location: read.php");
                exit();
            } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            }
        } catch (Exception $e) {
            echo $e;
        }
        //redrects to songrating page if unsucessful
    } elseif ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["Delete_Cancel"])) {
        header("Location: read.php");
        exit();
    }
    ?>

    <a href = "logout.php">logout</a>

