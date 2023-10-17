<?php 
    require_once "db.php";

    $conn = new mysqli($servername, $username, $password, $dbname);

    #testing connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    else {
        echo " $username Connected successfully";
    }

    session_start(); 
    if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
        header("Location: read.php");
        exit();
    }

?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Gets the username and password from the POST data
    $userid = $_POST['userid'];
    $pass = $_POST['password'];

    // Check if the username or password are empty
    if (empty($userid)) {
        echo "Username is required!";
        return;
    }

    if (empty($pass)) {
        echo "Password is required!";
        return;
    }

    //SQL statement to select the password based on the username
    $sql = "SELECT password FROM users WHERE username = ?";
    $stmt = mysqli_prepare($conn, $sql);

    if (!$stmt) {
        echo "Error: " . mysqli_error($conn);
        return; 
    }

    // Binds the username parameter to the prepared statement
    mysqli_stmt_bind_param($stmt, "s", $userid);

    if (mysqli_stmt_execute($stmt)) {
        $result = mysqli_stmt_get_result($stmt);
        
        $row = mysqli_fetch_array($result);

        // Checks if the row exists and the password matches
        if ($row && password_verify($pass, $row['password'])) {
            // Regenerates session ID to prevent session fixation
            session_regenerate_id();
            
            // Start the session and set session variables
            session_start();
            $_SESSION["loggedin"] = true;
            $_SESSION["username"] = $userid;

            header("Location: read.php");
            exit(); // Terminate the script after redirect
        } else {
            echo "Invalid Credentials";
        }
    } else {
        echo "Error: " . mysqli_error($conn);
    }

    mysqli_stmt_close($stmt);
}
?>



<!--
User Log in
-->
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
</head>

<body>
    <div id="form">
        <h1>Login</h1>
        <form name="form" action="" method="POST">
            <p>
                <label> USER NAME: </label>
                <input type="text" id="user" name="userid" />
            </p>

            <p>
                <label> PASSWORD: </label>
                <input type="password" id="pass" name="password" />
            </p>
            <p>
                <input type="submit" id="button" value="Login" />
                <p> Don't have an account? <a href="register.php">Register here</a> </p>
            </p>
        </form>
    </div>
</body>
</html>
