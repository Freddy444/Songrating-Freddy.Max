<?php 
    require_once "db.php";

?>
<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Gets the username, password, and confirm password from the POST data
        $userid = $_POST['userid'];
        $password = $_POST['password'];
        $password_2 = $_POST['password_2'];

        // Check if username or password are empty
        if (empty($userid)) {
            echo "Username is required!";
        }
        else if (empty($password)) {
            echo "Password is required!";
        }
        else if (empty($password_2)) {
            echo "Confirm password is required!";
        }

        // Check if the password and confirm password match
        else if ($password !== $password_2) {
            echo "Password and Confirm Password do not match!";
        }
        // Check if the password is at least 10 characters long
        else if (strlen($password) < 10) {
            echo "The password is not long enough. You need at least 10 characters.";
        }

        /* SQL injection protection adn hashed password */
        else {
            // check if the username already exists in the database
            $check_sql = "SELECT * FROM users WHERE username = ?";
            $check_stmt = mysqli_prepare($conn, $check_sql);

            // Bind the username parameter to the prepared statement
            mysqli_stmt_bind_param($check_stmt, "s", $userid);

            try {
                if (mysqli_stmt_execute($check_stmt) === TRUE) {
                    $result = mysqli_stmt_get_result($check_stmt);
                    $row = mysqli_fetch_array($result);

                    // Checks if the username already exists
                    if(mysqli_num_rows($result) > 0) {
                        echo "Please try another username";
                    } 
                    else {
                        //user is registered if not

                        // Hashes the password
                        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                        // Prepare the SQL statement for user registration
                        $sql = "INSERT INTO users (username, password) VALUES (?,?)";
                        $stmt = mysqli_prepare($conn, $sql);

                        // Bind the username and hashed password parameters to the prepared statement
                        mysqli_stmt_bind_param($stmt, "ss", $userid, $hashed_password);

                        try {
                            // Executes the prepared statement
                            if (mysqli_stmt_execute($stmt) === TRUE) {
                                // starts session is registration succeeds
                                session_start();
                                $_SESSION["loggedin"] = true;
                                $_SESSION["username"] = $userid;

                                header("Location: create.php"); 
                                exit(); 
                            } else {
                                //error if registration fails
                                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                            }
                        }
                        catch (Exception $e) {
                            echo $e;
                        }
                    }
                } else {
                    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                }
            }
            catch (Exception $e) {
                echo $e;
            }
        }
    }
?>

<!--
    USer registration form
-->
<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body>
    <div id="form">
        <h1>Register</h1>
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
                <label> CONFIRM PASSWORD: </label>
                <input type="password" id="confirm_pass" name="password_2" />
            </p>
            <p>
                <input type="submit" id="button" value="Register" />
                <p> Already have an account? <a href="login.php">Register here</a> </p>
            </p>
        </form>
    </div>
</body>
</html>
