import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import qr from "../../public/QR.png";
import Code from './Code';
import Booking from "./Booking";

function Payment({ amount}) {
  const [showCode, setShowCode] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [upiAddress, setUpiAddress] = useState("");
  const [isPayClicked, setIsPayClicked] = useState(false);
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(true); // State to control dialog open/close

  const handlePayClick = (e) => {
    e.preventDefault();
    if (upiAddress) {
      setShowCode(true);
      setIsPayClicked(true);
      generateCode();
      handlePayment();
    }
  };

  const handleUpiChange = (e) => {
    setUpiAddress(e.target.value);
    setIsPayClicked(false);
  };

  const handleGoNext = () => {
    setShowBooking(true);
    localStorage.setItem("generatedCode", code);
  };

  const generateCode = () => {
    const newCode = generateRandomTenCharacterString();
    setCode(newCode);
  };

  const generateRandomTenCharacterString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload(); // Refresh the page after closing the dialog
  };


  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="sm"
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Payment</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
            <img src={qr} alt="QR Code" width="300" height="240" />
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            Enter UPI Address
          </Typography>

          <TextField
            label="UPI Address"
            variant="outlined"
            fullWidth
            value={upiAddress}
            onChange={handleUpiChange}
            placeholder="autoparkiq@okabi"
            required
            margin="normal"
          />

          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePayClick}
              disabled={!upiAddress}
            >
              Pay
            </Button>
          </Box>

          {showCode && (
            <Box mt={3} display="flex" justifyContent="center">
              <Code code={code} />
            </Box>
          )}

          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="outlined"
              color="success"
              fullWidth
              onClick={handleGoNext}
              disabled={!isPayClicked}
            >
              Go Next
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Link to="/Help" style={{ textDecoration: 'none' }}>
            <Button variant="text" color="secondary">
              Help
            </Button>
          </Link>
        </DialogActions>
      </Dialog>

      {showBooking && <Booking code={code} />}
    </>
  );
}

export default Payment;