// apiService.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:80",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (username, password) => {
  return api.post("/index.php/user/login", { username, password });
};

// LoginView.js
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./apiService";
import styles from './loginView.module.css';

export default function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // Global configuration for Axios
  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:80";
    axios.defaults.headers.post["Content-Type"] = "application/json";

    // Global error handling
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("Global Error Handling:", error);
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    const loggedInUser = Cookies.get('name');
    if (loggedInUser) {
      setUser(loggedInUser);
      navigate("/");
    }
  }, [navigate]);

  function handleLogin(event) {
    event.preventDefault();

    loginUser(username, password)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setUser(response.data.username);
          Cookies.set('name', response.data.username, { expires: 1 });
          navigate("/");
        } else {
          console.error(`Login failed. ${response.data.username}`);
        }
      })
      .catch((error) => {
        console.error("Error Logging in user:", error);
      });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login Form</h1>
      <form autoComplete="off" onSubmit={handleLogin}>
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
        <Button variant="outlined" color="secondary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
