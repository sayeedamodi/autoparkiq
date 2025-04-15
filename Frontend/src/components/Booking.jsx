import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import BookingSuccess from "./BookingSuccess";
import QRCode from "qrcode";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  Grid,
  Typography,
  CircularProgress,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText
} from "@mui/material";
import {
  Close as CloseIcon,
  DirectionsCar as CarIcon,
  EventNote as DateIcon,
  Schedule as TimeIcon,
  LocationOn as LocationIcon,
  LocalParking as ParkingIcon,
  AttachMoney as MoneyIcon,
  Token as TokenIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 16,
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      minWidth: 600,
    },
  },
}));

const StyledForm = styled("form")(({ theme }) => ({
  "& .MuiTextField-root": {
    marginBottom: theme.spacing(2),
  },
}));

const InfoField = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  background: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[200]}`,
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
}));

function Booking({ code }) {
  const location = useLocation();
  const selectedParking = JSON.parse(localStorage.getItem("selectedParking")) || {};
  const user = JSON.parse(localStorage.getItem("Users")) || [];
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([1, 2, 3, 4]);
  const [currentDateTime, setCurrentDateTime] = useState("2025-04-06 11:09:43");
  const [exitDateRange, setExitDateRange] = useState({ min: "", max: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    carnumber: "",
    entrydate: "",
    entrytime: "",
    exitdate: "",
    area: selectedParking.RoadName || "",
    slot: "",
    amount: selectedParking.Cost || "",
    code: code , 
    User : user ,
    Email : user.email
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: formData
  });

  // Generate exit date range based on entry date
  const generateExitDateRange = (entryDate) => {
    const entry = new Date(entryDate);
    const minExitDate = entry.toISOString().split('T')[0];
    const maxExitDate = new Date(entry.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setExitDateRange({ min: minExitDate, max: maxExitDate });
  };

  // Watch entry date and update exit date range accordingly
  const entryDate = watch("entrydate");
  useEffect(() => {
    if (entryDate) {
      generateExitDateRange(entryDate);
    }
  }, [entryDate]);

  // Check slot availability
  const checkSlotAvailability = async (area, slot) => {
    try {
      const res = await axios.get("http://localhost:4001/book/check-slot", {
        params: { area, slot }
      });
      return res.status === 200;
    } catch (err) {
      return false;
    }
  };

  // Filter available slots
  const filterAvailableSlots = async () => {
    const slots = [1, 2, 3, 4];
    const filteredSlots = [];
    for (const slot of slots) {
      const isAvailable = await checkSlotAvailability(formData.area, slot);
      if (isAvailable) {
        filteredSlots.push(slot);
      }
    }
    setAvailableSlots(filteredSlots);
  };

  // Update available slots when area changes
  useEffect(() => {
    if (formData.area) {
      filterAvailableSlots();
    }
  }, [formData.area]);

  // Update current date time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const year = now.getUTCFullYear();
      const month = String(now.getUTCMonth() + 1).padStart(2, '0');
      const day = String(now.getUTCDate()).padStart(2, '0');
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setCurrentDateTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate total amount based on entry and exit dates
  const calculateAmount = (entryDate, exitDate, perDayCost) => {
    const entry = new Date(entryDate);
    const exit = new Date(exitDate);
    const diffInTime = exit.getTime() - entry.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays * perDayCost;
  };

  // Watch exit date and update amount accordingly
  const exitDate = watch("exitdate");
  useEffect(() => {
    if (entryDate && exitDate) {
      const totalAmount = calculateAmount(entryDate, exitDate, selectedParking.Cost);
      setValue("amount", totalAmount);
    }
  }, [entryDate, exitDate, selectedParking.Cost, setValue]);

  
  const handleDownload = async (data) => {
  const doc = new jsPDF();

  // Add AutoParkIQ title
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text("AutoParkIQ", 105, 20, null, null, "center");

  const currentDateTime = new Date();
  const istDateTime = new Date(currentDateTime.getTime() + (currentDateTime.getTimezoneOffset() + 330) * 60000).toISOString().slice(0, 19).replace('T', ' ');

  doc.setFontSize(10);
  doc.text(`Date & Time (IST): ${istDateTime}`, 105, 30, null, null, "center");

  // Add booking details
  doc.setFontSize(12);
  doc.text(`Car Number: ${data.carnumber}`, 20, 40);
  doc.text(`Entry Date: ${data.entrydate}`, 20, 50);
  doc.text(`Entry Time: ${data.entrytime}`, 20, 60);
  doc.text(`Exit Date: ${data.exitdate}`, 20, 70);
  doc.text(`Parking Area: ${data.area}`, 20, 80);
  doc.text(`Slot Number: ${data.slot}`, 20, 90);
  doc.text(`Amount: ₹${data.amount}`, 20, 100);
  doc.text(`Token Number: ${data.code}`, 20, 110);

  try {
    // Generate QR code image (async/await)
    const qrData = `${data.carnumber} - ${data.entrydate} - ${data.code}`;
    const qrUrl = await QRCode.toDataURL(qrData, { width: 100, margin: 2 });

    // Add the QR code image to the PDF
    doc.addImage(qrUrl, 'PNG', 150, 40, 40, 40); // Position (150, 40), width and height 40px

    // Save as PDF
    const pdfData = doc.output('blob'); // Correctly output as blob
    const url = URL.createObjectURL(pdfData);
    const a = document.createElement("a");
    a.href = url;
    a.download = "booking_receipt.pdf";
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
};

  

const onSubmit = async (data) => {
  setLoading(true);
  try {
    const res = await axios.post("http://localhost:4001/book/booking", data);
    console.log("API response:", res.data);

    if (res.data) {
      toast.success("Parking slot booked successfully");
      console.log("parking booked");

      if (res.data.user) {
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        console.log("local data stored");
      } else {
        console.warn("No user data in response");
      }

      try {
        handleDownload(data);
        setShowSuccess(true);
        console.log("pdf downloaded");
      } catch (e) {
        console.error("PDF download failed:", e);
        toast.error("Failed to download PDF");
      }
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "An unexpected error occurred");
    console.log(err.response?.data?.message || "An unexpected error occurred");
  } finally {
    setLoading(false);
    console.log("finally block exec");
  }
};


  return (
    <StyledDialog
      id="my_modal_4"
      open={true}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Book Parking Space
          </Typography>
          <IconButton
            component={Link}
            to="/Help"
            onClick={() => document.getElementById("my_modal_4").close()}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* User Information Display */}
            <Grid item xs={12}>
              <Box mb={2} p={2} bgcolor="primary.light" color="white" borderRadius={2}>
                <Typography variant="subtitle1">
                  Current User: {user.fullname}
                </Typography>
                <Typography variant="subtitle2">
                  Date & Time (UTC): {currentDateTime}
                </Typography>
              </Box>
            </Grid>

            {/* Pre-selected Information */}
            <Grid item xs={12} md={6}>
              <InfoField elevation={0}>
                <LocationIcon />
                <Box>
                  <Typography variant="caption" color="textSecondary">Selected Area</Typography>
                  <Typography variant="body1">{formData.area}</Typography>
                </Box>
              </InfoField>
            </Grid>

            <Grid item xs={12} md={6}>
              <InfoField elevation={0}>
                <MoneyIcon />
                <Box>
                  <Typography variant="caption" color="textSecondary">Amount</Typography>
                  <Typography variant="body1">{formData.amount}</Typography>
                </Box>
              </InfoField>
            </Grid>

            <Grid item xs={12} md={6}>
              <InfoField elevation={0}>
                <TokenIcon />
                <Box>
                  <Typography variant="caption" color="textSecondary">Token Number</Typography>
                  <Typography variant="body1">{code}</Typography>
                </Box>
              </InfoField>
            </Grid>

            {/* Slot Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={Boolean(errors.slot)}>
                <InputLabel>Select Parking Slot</InputLabel>
                <Select
                  {...register("slot", { required: "Parking slot is required" })}
                  label="Select Parking Slot"
                >
                  {availableSlots.map((slot) => (
                    <MenuItem key={slot} value={slot}>
                      Slot {slot}
                    </MenuItem>
                  ))}
                </Select>
                {errors.slot && (
                  <FormHelperText>{errors.slot.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Input Fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Car Number"
                {...register("carnumber", { required: "Car number is required" })}
                error={Boolean(errors.carnumber)}
                helperText={errors.carnumber?.message}
                InputProps={{
                  startAdornment: <CarIcon sx={{ mr: 1, color: 'primary.main' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Entry Date"
                InputLabelProps={{ shrink: true }}
                {...register("entrydate", { required: "Entry date is required" })}
                error={Boolean(errors.entrydate)}
                helperText={errors.entrydate?.message}
                InputProps={{
                  startAdornment: <DateIcon sx={{ mr: 1, color: 'primary.main' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Entry Time"
                InputLabelProps={{ shrink: true }}
                {...register("entrytime", { required: "Entry time is required" })}
                error={Boolean(errors.entrytime)}
                helperText={errors.entrytime?.message}
                InputProps={{
                  startAdornment: <TimeIcon sx={{ mr: 1, color: 'primary.main' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Exit Date"
                InputLabelProps={{ shrink: true }}
                {...register("exitdate", {
                  required: "Exit date is required",
                  validate: value => {
                    const entryDate = new Date(watch("entrydate"));
                    const exitDate = new Date(value);
                    const maxExitDate = new Date(entryDate.getTime() + 24 * 60 * 60 * 1000);
                    return exitDate <= maxExitDate || "Exit date must be within 24 hours of entry date";
                  }
                })}
                error={Boolean(errors.exitdate)}
                helperText={errors.exitdate?.message}
                InputProps={{
                  startAdornment: <DateIcon sx={{ mr: 1, color: 'primary.main' }} />,
                  inputProps: {
                    min: exitDateRange.min,
                    max: exitDateRange.max,
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ParkingIcon />}
              sx={{
                minWidth: 200,
                height: 48,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </Button>
          </Box>
          {showSuccess && <BookingSuccess />}
        </StyledForm>
      </DialogContent>
    </StyledDialog>
  );
}

export default Booking;