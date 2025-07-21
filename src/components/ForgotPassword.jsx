import React, { useState } from "react";
import axios from "axios";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles"; // Ensure this is included
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OtpInputStyled = styled(MuiOtpInput)(({ theme }) => ({
  marginBottom: "15px",
  "& .MuiOtpInput-input": {
    backgroundColor: "#e2ddfe", // Set background color
    borderColor: "#9b9ef0",
    "&:focus": {
      borderColor: "#7d66d9",
    },
  },
}));

const AnimatedCard = styled(motion(Card))({
  maxWidth: "400px",
  width: "100%",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  padding: "16px",
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgotpassword",
        { email }
      );
      setSnackbarMessage(response.data.message);
      setOpenSnackbar(true);
      setStep(2);
    } catch (error) {
      setSnackbarMessage("Failed to send OTP. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/resetpassword",
        {
          email,
          otp,
          newPassword,
        }
      );
      setSnackbarMessage(response.data.message);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setSnackbarMessage(
        "Failed to reset password. Please check your OTP and try again."
      );
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#b0dfd6] via-[#80c8bd] to-[#56aba0] p-6">
      <AnimatedCard
        variant="outlined"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <CardContent>
          {step === 1 && (
            <div>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                color="#7d66d9"
              >
                Forgot Password
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                label="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                className="bg-[#e2ddfe] border border-[#9b9ef0] focus:border-[#7d66d9] transition duration-300" // Apply Tailwind CSS classes
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleSendOtp}
                className="bg-gradient-to-r from-[#3c9087] to-[#56aba0] hover:from-[#56aba0] hover:to-[#3c9087] text-[#f3faf8] rounded-full font-semibold shadow px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3c9087] transition-all duration-200"
              >
                Send OTP
              </Button>
            </div>
          )}
          {step === 2 && (
            <div>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                color="#7d66d9"
              >
                Reset Password
              </Typography>
              <OtpInputStyled value={otp} onChange={setOtp} length={6} />
              <TextField
                variant="outlined"
                fullWidth
                type="password"
                label="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
                className="bg-[#e2ddfe] border border-[#9b9ef0] focus:border-[#7d66d9] transition duration-300" // Apply Tailwind CSS classes
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleResetPassword}
                className="bg-gradient-to-r from-[#3c9087] to-[#56aba0] hover:from-[#56aba0] hover:to-[#3c9087] text-[#f3faf8] rounded-full font-semibold shadow px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3c9087] transition-all duration-200"
              >
                Reset Password
              </Button>
            </div>
          )}
        </CardContent>
      </AnimatedCard>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
