<?php
require_once 'PROJECT_ROOT_PATH' . "./db.php";
require "/Applications/XAMPP/xamppfiles/htdocs/Songrating-Freddy.Max/songratingfront/backend/config/boot.php";

class UserModel extends Database
{

    
     /* Retrieves username and password of a user. */
    public function getUserByUsername($username)
    {
        return $this->select("SELECT username, password FROM users WHERE username = ?", ["s", $username]);
    }


    
     /* Creates a new user in the database.*/
 
    public function createUser($username, $hashedPassword)
    {
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = mysqli_prepare($this->connection, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $username, $hashedPassword);
        
        return mysqli_stmt_execute($stmt);
    }
}