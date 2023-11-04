import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import styles from "./registerView.module.css";
import { useNavigate } from "react-router-dom";

export default function RegisterView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  // Check if a user is already logged in (persisted login)
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
    }
  }, []);

  // Redirect to the home page if a user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Function to handle user registration
  function registerUser(event) {
    event.preventDefault();

    // Send a POST request to the server for registration
    axios
      .post("http://localhost:80/index.php/user/register", {
        username: username,
        password: password,
        confirm_password: confirmPassword,
      })
      .then((response) => {
        if (response.data.success) {
          // Successful registration, set the user and store registration data
          setUser(response.data.username);
          localStorage.setItem("user", response.data.username);
          navigate("/");
          // Handle successful registration, such as redirecting to another page
        } else {
          console.error(`Registration failed. ${response.data.username}`);
          // Handle registration failure, display an error message, etc.
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        // Handle registration error, display an error message, etc.
      });
    return;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Register Form</h1>
      <form autoComplete="off" onSubmit={registerUser}>
        {/* Input for username */}
        <TextField
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          variant="outlined"
          color="primary"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={username}
          error={usernameError}
        />
        {/* Input for password */}
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={password}
          error={passwordError}
          fullWidth
          sx={{ mb: 3 }}
        />
        {/* Input for confirming password */}
        <TextField
          label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={confirmPassword}
          error={confirmPasswordError}
          fullWidth
          sx={{ mb: 3 }}
        />
        {/* Button for submitting the registration form */}
        <Button variant="outlined" color="secondary" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
