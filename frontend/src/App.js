// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Container, CssBaseline, Snackbar, Alert, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { login, logout } from "./services/api";

const theme = createTheme();

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      setUser(JSON.parse(localStorage.getItem("user")));
    } catch (err) {
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await login(username, password);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setError("");
      setOpenSnackbar(true);
    } catch (err) {
      setError("Login failed: " + (err.response?.data?.message || err.message));
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      setError("");
      localStorage.removeItem("user");
    } catch (err) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Container component="main" maxWidth="xs">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Routes>
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onLogin={handleLogin} error={error} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                user ? (
                  <Dashboard user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={error ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {error || "Login successful!"}
            </Alert>
          </Snackbar>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;