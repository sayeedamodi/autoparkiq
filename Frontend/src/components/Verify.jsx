import React, { useEffect, useRef, useState } from "react";
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
  Grid,
} from "@mui/material";

function Verify({ onClose }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const scannerRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  const onSubmit = async (data) => {
    const userInfoS = {
      carnumber: data.carnumber,
      entrydate: data.entrydate,
      code: data.code,
    };
    try {
      const res = await axios.post("http://localhost:4001/verify/verifing", userInfoS);
      if (res.data) {
        toast.success("Verification Successful ✅");
        onClose(); // Close the dialog after successful submission
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
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        }
      );

      html5QrCodeScanner.render(
        (decodedText) => {
          toast.success("QR Code scanned successfully!");
          const [carnumber, entrydate, code] = decodedText.split(" - ");
          setValue("carnumber", carnumber?.trim() || "");
          setValue("entrydate", entrydate?.trim() || "");
          setValue("code", code?.trim() || "");
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: 4,
          background: "#f9f9f9",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} color="secondary">
            ✕
          </Button>
        </Box>

        <Typography
          variant="h5"
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Verify Parking Details
        </Typography>

        {/* QR Scanner Section */}
        <Box
          sx={{
            my: 4,
            p: 2,
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="body1" color="textSecondary" mb={2}>
            QR Code Scanner
          </Typography>
          <div id="qr-reader" ref={scannerRef} style={{ width: "100%" }}></div>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "row", mt: 2 }}>
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

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Car Number"
                variant="outlined"
                error={!!errors.carnumber}
                helperText={errors.carnumber && "This field is required"}
                {...register("carnumber", { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="YYYY-MM-DD"
                variant="outlined"
                error={!!errors.entrydate}
                helperText={errors.entrydate && "This field is required"}
                {...register("entrydate", { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Token Number"
                variant="outlined"
                error={!!errors.code}
                helperText={errors.code && "This field is required"}
                {...register("code", { required: true })}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                paddingY: 1.5,
                borderRadius: 2,
              }}
            >
              Verify
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Verify;