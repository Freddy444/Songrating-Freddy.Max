<?php

    require_once "db.php";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if  ($conn->connect_error) {
        die("Connection Failed: " . $conn->connect_error);
    }

    
    session_start(); 
    //makes sure the user is logged in, if not they get redirected to login
    if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] === false) {
        header("Location: login.php");
        exit();
    }

    //handles form submission
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST["Logout"])) {
            handleLogout();
        } elseif (isset($_POST["Update"])) {
            handleUpdate();
        }
    }

    //Gets new cookie value because of change in permissions
    //logout function
    function handleLogout() {
        $_SESSION = array();
        session_regenerate_id();
        session_destroy();
        header("Location: login.php");
        exit();
    }
    function handleUpdate() {
        echo "Form submitted!";
    }

//fetches usernaem
$username = $_SESSION['username'];

//retrieves all songs from the database
$sql = "SELECT * FROM ratings";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Song Rating Page</title>
</head>
<body>
    <p>You are logged in as <?php echo $username; ?></p>
    <h2>Song ratings</h2>
    <p><a href="create.php">Rate a Song!</a> </p>

    <div>
        <table border="1" cellspacing="0" cellpadding="8">
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Artist</th>
                <th>Song</th>
                <th>Rating</th>
                <th>Actions</th>
            </tr>

        <!-- Loops through the result -->
        <?php while ($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?= $row['id'] ?></td>
                <td><?= $row['username'] ?></td>
                <td><?= $row['artist'] ?></td>
                <td><?= $row['song'] ?></td>
                <td><?= $row['rating'] ?></td>
                <td>  
                    
                <!-- Views a song, only allows registered users to access the song rating features-->
                <a href="view.php?id=<?php echo $row['id']; ?>">View</a>
                <?php if ($username === $row["username"]): ?>
                        <!-- Updates a song -->
                        <form action="update.php" method="post">
                            <input type="hidden" name="id" value="<?= $row['id'] ?>">
                            <input type="submit" value="Update" name="Update">
                        </form>

                        <span style="margin-right: 10px;"></span>

                        <!-- Deletes a song -->
                        <form action="delete.php" method="post">
                            <input type="hidden" name="id" value="<?= $row['id'] ?>">
                            <input type="submit" value="Delete" name="Delete">
                        </form>
                    </td>
                <?php endif; ?>
            </tr>
        <?php endwhile; ?>
        </table>
    </div>
        <!-- logout button (directs to login) -->
        <form method="post" action="">
        <br>
        <button type="submit" name="Logout">Logout</button>
        </form>
        <!-- home button-->
        <br>
    <a href="../index.html">Back to Home</a>
</body>
</html>
