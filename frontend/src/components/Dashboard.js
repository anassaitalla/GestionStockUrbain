// src/components/Dashboard.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";

function Dashboard({ user, onLogout }) {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Welcome, {user.username}!
      </Typography>
      <Button
        fullWidth
        variant="outlined"
        onClick={onLogout}
        sx={{ mt: 3, mb: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
}

export default Dashboard;