<?php
define ('PROJECT_ROOT_PATH', "./db.php");
require "/Applications/XAMPP/xamppfiles/htdocs/inc/bootstrap.php";

class UserModel extends Database
{

    /**
     * Retrieves username and password of a user.
     *
     * @param $username The username to retrieve from the database.
     *
     * @return array|false The result of the database query.
     */
    public function getUserByUsername($username)
    {
        return $this->select("SELECT username, password FROM users WHERE username = ?", ["s", $username]);
    }



    /**
     * Creates a new user in the database.
     *
     * @param $username The username of the new user.
     * @param $hashedPassword The hashed password of the new user.
     *
     * @return bool True if the user is created successfully, false otherwise.
     */
    public function createUser($username, $hashedPassword)
    {
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = mysqli_prepare($this->connection, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $username, $hashedPassword);
        
        return mysqli_stmt_execute($stmt);
    }
}