import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import WifiIcon from "@mui/icons-material/Wifi";
import Footer from './Footer' ;
const About = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('https://i.ibb.co/bgx0hgPY/image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        py: 10,
        fontFamily: "Roboto, sans-serif"
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: 6,
          p: 6,
          position: "relative",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.6)",
          fontFamily: "'Montserrat', sans-serif"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            fontWeight={700} 
            textAlign="center"
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            About <span style={{ color: "#FF4081" }}>AutoParkIQ</span>
          </Typography>

          <Typography variant="body1" fontSize={18} mb={4} sx={{ fontFamily: "'Montserrat', sans-serif" }}>
            <strong>AutoParkIQ</strong> is your ultimate destination for affordable online parking solutions. Our platform allows users to easily search, book, and manage parking spaces at competitive prices.
          </Typography>


          <Typography variant="body1" fontSize={18} mb={4} sx={{ fontFamily: "'Montserrat', sans-serif" }}>
            We integrate Machine Learning (CNN) for car detection, a robust Database (MongoDB) to manage parking slots and user info, and a user-friendly Web Interface built with React and Node.js.
          </Typography>

          <Typography variant="body1" fontSize={18} mb={4} sx={{ fontFamily: "'Montserrat', sans-serif" }}>
            🔍 <strong>Motivation:</strong> To reduce car thefts and improve parking management by ensuring vehicles are parked in secure, designated smart zones.
          </Typography>

          <Typography variant="body1" fontSize={18} mb={4} sx={{ fontFamily: "'Montserrat', sans-serif" }}>
            🛠 <strong>Tech Stack:</strong> React (Frontend), Node.js, Express.js (Backend), Mongoose & MongoDB (Database), CNN (ML for car detection)
          </Typography>

          <Typography variant="body1" fontSize={18} mb={4} sx={{ fontFamily: "'Montserrat', sans-serif" }}>
            🧠 <strong>ML Integration:</strong> Our model is trained using CNN on 1436 images (car & non-car), validated on 360 images. The system auto-detects if a slot is occupied or available.
          </Typography>

          <Typography variant="body1" fontSize={18} mb={4} sx={{ fontFamily: "'Montserrat', sans-serif" }}>
            🗂 <strong>Database Logic:</strong> When a user books a slot, all details (car no, slot, time) are stored. Once booked, others cannot access it until it’s free.
          </Typography>

          <Typography variant="body1" fontSize={18} mb={4} sx={{ fontFamily: "'Montserrat', sans-serif" }}>
            🚀 <strong>Future Plans:</strong> Auto-cancel if user doesn’t arrive on time, Number Plate Recognition for double-checking, weather-based smart slot suggestions, and dynamic cost updates.
          </Typography>

          <Typography variant="body2" fontSize={16} mt={4} sx={{ fontFamily: "'Montserrat', sans-serif" }}>
            👨‍💻 Team Members:<br />
            • Sayeed (160921733058)<br />
            • Sohail (160921733034)<br />
            • Faizan (160921733034)
          </Typography>

          <Grid container spacing={2} justifyContent="center" mt={4}>
            <Grid item>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DirectionsCarIcon />}
                  sx={{ borderRadius: "2xl", px: 4, py: 1.5, fontFamily: "'Montserrat', sans-serif" }}
                >
                  Explore Parking
                </Button>
              </motion.div>
            </Grid>

            <Grid item>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<CameraIndoorIcon />}
                  sx={{ borderRadius: "2xl", px: 4, py: 1.5, fontFamily: "'Montserrat', sans-serif" }}
                >
                  View Camera Feed
                </Button>
              </motion.div>
            </Grid>
          </Grid>

          {/* Floating Camera Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              position: "absolute",
              top: 20,
              right: 40,
              backgroundColor: "#1e1e1e",
              borderRadius: 12,
              padding: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
            }}
          >
            <CameraIndoorIcon sx={{ color: "white" }} />
            <WifiIcon sx={{ color: "#66bb6a" }} />
          </motion.div>
        </motion.div>
       
      </Container>
      
    </Box>
    
  );
};

export default About;