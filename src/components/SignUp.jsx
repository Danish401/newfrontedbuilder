import * as React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import "../index.css"; // Import the CSS file
import { fadeIn } from "../animations/framerMotion";
import { GoogleIcon } from "./CustomIcons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { toggleDarkMode } from "../features/formSlice"; // Import the action
import axios from "axios"; // Import axios
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://newbackendformbuilder.onrender.com"
    : "http://localhost:5000";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.form.isDarkMode); // Get dark mode state from Redux
  const location = useLocation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  // Input validation
  const validateInputs = () => {
    let valid = true;

    if (!name) {
      setNameError(true);
      setNameErrorMessage("Full Name is required");
      valid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!email) {
      setEmailError(true);
      setEmailErrorMessage("Email is required");
      valid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage("Password is required");
      valid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return valid;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!validateInputs()) return;

    try {
      // Make a POST request to the backend to create the user
      const response = await axios.post(
        `${BACKEND_URL}/signup`,
        {
          name: name,
          email,
          password,
        }
      );
      toast.success("Signup successful!", {
        style: {
            backgroundColor: "#9b9ef0", // Change this to your desired color
            color: "#ffffff", // Text color
        },
    });
    
      console.log("Signup successful", response.data);
      navigate("/login"); // Redirect to the dashboard on success
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  // Handle Google Signup
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const signupStatus = query.get('signup');
  
    if (signupStatus === 'success') {
        toast.success("Signup successful with Google!");
    } else if (signupStatus === 'failure') {
        toast.error("Signup failed. Please try again.");
    }
  }, [location]);
  const handleGoogleSignup = async () => {
    // Show a toast notification indicating the signup process has started
    toast.info("Redirecting to Google for Signup...");
  
    // Open Google Auth in the same window
    window.open("http://localhost:5000/auth/google/callback", "_self");
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`flex justify-center mt-9 items-center min-h-screen bg-gradient-to-br from-[#b0dfd6] via-[#80c8bd] to-[#56aba0] ${
        isDarkMode ? "bg-gradient-to-br from-[#21403e] via-[#285d59] to-[#3c9087]" : ""
      }`}
    >
      <Box
        sx={{
          maxWidth: "400px",
          p: 4,
          bgcolor: isDarkMode ? "#1e1e1e" : "white",
          borderRadius: 2,
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          color={isDarkMode ? "white" : "black"}
        >
          Sign Up
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameErrorMessage}
            sx={{
              backgroundColor: isDarkMode ? "#424242" : "#E2DDFE",
              color: isDarkMode ? "white" : "black",
            }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailErrorMessage}
            sx={{
              backgroundColor: isDarkMode ? "#424242" : "#E2DDFE",
              color: isDarkMode ? "white" : "black",
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordErrorMessage}
            sx={{
              backgroundColor: isDarkMode ? "#424242" : "#E2DDFE",
              color: isDarkMode ? "white" : "black",
            }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="I want to receive updates via email."
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-gradient-to-r from-[#3c9087] to-[#56aba0] hover:from-[#56aba0] hover:to-[#3c9087] text-[#f3faf8] rounded-full font-semibold shadow px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3c9087] transition-all duration-200"
            sx={{ mt: 2 }}
          >
            Create Account
          </Button>
        </form>
        <Divider sx={{ mt: 2, mb: 2 }}>or</Divider>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          sx={{ color: '#3c9087', borderColor: '#3c9087', borderRadius: '999px', fontWeight: 600, boxShadow: 2, px: 3, py: 1.5, '&:hover': { background: 'linear-gradient(90deg,#56aba0,#3c9087)', color: '#f3faf8', borderColor: '#3c9087' } }}
          onClick={handleGoogleSignup}
        >
          Sign Up with Google
        </Button>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: isDarkMode ? "white" : "black" }}
        >
          Already have an account?
          <Button
            variant="text"
            onClick={() => navigate("/login")}
            sx={{ color: '#3c9087', fontWeight: 600, borderRadius: '999px', px: 2, '&:hover': { background: 'linear-gradient(90deg,#56aba0,#3c9087)', color: '#f3faf8' } }}
          >
            Log In
          </Button>
        </Typography>
      </Box>
    </motion.div>
  );
};

export default SignUp;