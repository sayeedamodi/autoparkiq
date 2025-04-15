import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Radio,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { AccessTime, Person, Close, Visibility, Search } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "95%",
    maxWidth: "1200px",
    margin: theme.spacing(1),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0,
      maxHeight: "100vh",
    },
  },
}));

function Location({ isOpen, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [parkingData, setParkingData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentUser, setCurrentUser] = useState("Guest");
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const locations = [
    "Hitech City", "Begumpet", "Banjara Hills", "Kukatpally", "Charminar",
    "Madhapur", "Secunderabad", "Gachibowli", "Mehdipatnam", "Dilsukhnagar",
    "Kompally", "Tolichowki", "Nampally"
  ];

  useEffect(() => {
    // Set current user
    const storedUser = localStorage.getItem("Users");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user.fullname);
    }

    // Update date time
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentDateTime(formatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Initial data fetch
    const fetchParkingStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/parking-status");
        setParkingData(res.data);
      } catch (err) {
        toast.error("Failed to fetch parking data");
      }
    };

    if (isOpen) {
      fetchParkingStatus();
    }

    return () => clearInterval(interval);
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.get("http://localhost:4001/area", {
        params: { Location: data.Location }
      });
      setParkingData(res.data);
      toast.success("Data fetched successfully");
    } catch (err) {
      toast.error("Failed to fetch location data");
    }
  };

  const handleRadioChange = (index) => {
    setSelectedRow(index);
    localStorage.setItem("selectedParking", JSON.stringify(parkingData[index]));
  };

  return (
    <StyledDialog open={isOpen} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          p: 2
        }}
      >
        <Typography component="div" variant={isMobile ? "h6" : "h5"} fontWeight="bold">
          Parking Areas
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Chip
            icon={<AccessTime />}
            label={currentDateTime}
            size="small"
            sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
          />
          <Chip
            icon={<Person />}
            label={currentUser}
            size="small"
            sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
          />
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="Location"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Select
                        {...field}
                        displayEmpty
                        size={isMobile ? "small" : "medium"}
                      >
                        <MenuItem value="" disabled>Select Area</MenuItem>
                        {locations.map(loc => (
                          <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  startIcon={<Search />}
                  sx={{ mt: 2 }}
                >
                  Search
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
              <Table size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>Road Name</TableCell>
                    {!isMobile && (
                      <>
                        <TableCell>Stretch</TableCell>
                        <TableCell>Side</TableCell>
                      </>
                    )}
                    <TableCell>Remarks</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parkingData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Radio
                          checked={selectedRow === index}
                          onChange={() => handleRadioChange(index)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{item.RoadName}</TableCell>
                      {!isMobile && (
                        <>
                          <TableCell>{item.ParkingStretch}</TableCell>
                          <TableCell>{item.ParkingSide}</TableCell>
                        </>
                      )}
                      <TableCell>{item.Remarks}</TableCell>
                      <TableCell>₹{item.Cost}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={!isMobile && <Visibility />}
                          onClick={() => navigate("/carparkingarea", { state: { item } })}
                          disabled={!item.availableSlots?.length}
                        >
                          {isMobile ? 'View' : 'Details'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
    </StyledDialog>
  );
}

export default Location;
