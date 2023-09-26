import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Stack, TextField, Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import label from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function Login() {
  const [username, setUsername] = useState("");
  const [password1, setPassword] = useState("");
  const [Rollno, setRollno] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem("isLoggedIn")){
      navigate('/rep');
    }
  },[])

  const handleInputChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleLogin = async () => {
    try {
      // Send a GET request to retrieve user data based on the username
      const response = await axios.get(
        `http://localhost:5000/api/signup/${username}`
      );
      console.log(response);

      // Check if the server response contains user data
      if (response.status === 200 && response.data) {
        const { name, password, srn, _id } = response.data;
        console.log(response.data);
        // Verify the password
        if (password === password1) {
          // Set the user as logged in
          setIsLoggedIn(true);

          // Store session information in localStorage
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", name);
          localStorage.setItem("Rollno", srn);
          localStorage.setItem("userid", _id);
          navigate("/rep");
        } else {
          setError("Invalid password");
          setPopupStatus("Invalid password!");
          setShowPopup(true);
        }
      } else {
        setError("User not found");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while trying to log in");
    }
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Effective Project Management System
          </Typography>
          <Button
            type="button"
            color="inherit"
            onClick={() => navigate("/Signup")}
          >
            Signup
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "10px",
          marginTop: "70px",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          
          <h2 align="center">Login</h2>
          <Stack rowGap={2}>
            <TextField
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
            <TextField
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <Button type="Submit" variant="contained">
              Login
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Stack>
        </form>
      </Box>
    </div>
  );
}

export default Login;
