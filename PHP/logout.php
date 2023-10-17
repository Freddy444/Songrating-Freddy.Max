<?php
session_start();

$_SESSION = array();

// Destroys the session
session_destroy();

// Redirect to the login page (adjust the path accordingly)
header("Location: login.php");
exit();
?>
