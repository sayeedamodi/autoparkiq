import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  Container,
  Paper,
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function Exit() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const scannerRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data) => {
    const userInfom = {
      carnumber: data.carnumber,
    };
    try {
      const res = await axios.post("http://localhost:4001/exit/exiting", userInfom);
      if (res.data) {
        toast.success("🚗 Exit successful!");
        setIsDialogOpen(false);
      }
    } catch (err) {
      if (err.response) {
        toast.error("❌ Error: " + err.response.data.message);
      } else {
        toast.error("❌ An unexpected error occurred.");
      }
    }
  };

  const handleStartScan = () => {
    setIsScanning(true);
    if (scannerRef.current) {
      const html5QrCodeScanner = new Html5QrcodeScanner(
        "qr-reader-exit",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        }
      );

      html5QrCodeScanner.render(
        (decodedText, decodedResult) => {
          toast.success("QR Code scanned successfully!");
          const [carnumber] = decodedText.split(" - "); // Assuming format: "AP-09-1234 - entrydate - code"
          setValue("carnumber", carnumber?.trim() || "");

          html5QrCodeScanner.clear();
          setIsScanning(false);
        },
        (errorMessage) => {
          console.error("QR Code scanning error:", errorMessage);
        }
      );
    }
  };

  const handleStopScan = () => {
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.innerHTML = "";
    }
  };

  useEffect(() => {
    return () => {
      handleStopScan();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsDialogOpen(true)}
      >
        EXIT NOW
      </Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth>
        <DialogTitle>
          <Typography variant="h6">Exit</Typography>
        </DialogTitle>
        <DialogContent>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  component={Link}
                  to="/Help"
                  onClick={() => setIsDialogOpen(false)}
                  color="secondary"
                >
                  ✕
                </Button>
              </Box>

              {/* QR Scanner Section */}
              <Box sx={{ my: 4 }}>
                <div
                  id="qr-reader-exit"
                  ref={scannerRef}
                  style={{ width: "100%", height: "auto", marginBottom: "20px" }}
                ></div>
                <Box sx={{ display: "flex", gap: 2, flexDirection: "column", mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={handleStartScan}
                    disabled={isScanning}
                  >
                    Start Scanning
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleStopScan}
                    disabled={!isScanning}
                  >
                    Stop Scanning
                  </Button>
                </Box>
              </Box>

              {/* Input Field for Car Number */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Car Number
                </Typography>
                <TextField
                  fullWidth
                  placeholder="enter your car number"
                  variant="outlined"
                  error={!!errors.carnumber}
                  helperText={errors.carnumber && "This field is required"}
                  {...register("carnumber", { required: true })}
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                >
                  Exit
                </Button>
              </Box>
            </form>
          </Paper>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Exit;