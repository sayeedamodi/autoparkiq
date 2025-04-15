import React from "react";
import { Box, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import WifiIcon from "@mui/icons-material/Wifi";

const AutoParkIQ = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(to right top, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#fff",
        p: 2,
      }}
    >
      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 1,
          animation: "glow 2s ease-in-out infinite alternate",
          fontSize: { xs: "2rem", md: "3rem" },
        }}
      >
        AutoParkIQ
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", color: "#ccc", mb: 4 }}
      >
        Smart AI-Powered Parking Management System 🚗
      </Typography>

      {/* Floating Car Icons */}
      {[0, 1, 2].map((item, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            left: `${10 + index * 30}%`,
            bottom: `${20 + index * 15}%`,
            animation: `floatCar 5s ease-in-out ${index}s infinite`,
          }}
        >
          <DirectionsCarIcon sx={{ fontSize: 50, color: "#e0e0e0" }} />
        </Box>
      ))}

      {/* Camera with Green Dot */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          gap: 1,
          background: "#212121",
          px: 2,
          py: 1,
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <CameraIndoorIcon sx={{ color: "#fff" }} />
        <WifiIcon sx={{ color: "#66bb6a" }} />
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#4caf50",
            boxShadow: "0 0 10px #4caf50",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        />
      </Box>

      {/* Background Particles */}
      {[...Array(10)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            animation: `floatUp ${4 + i}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Custom Animations */}
      <style>
        {`
          @keyframes glow {
            from {
              text-shadow: 0 0 10px #66bb6a, 0 0 20px #66bb6a;
            }
            to {
              text-shadow: 0 0 20px #66bb6a, 0 0 40px #66bb6a;
            }
          }

          @keyframes floatCar {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }

          @keyframes pulse {
            0% { transform: scale(0.9); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(0.9); opacity: 0.7; }
          }

          @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0.3; }
            50% { transform: translateY(-20px); opacity: 0.7; }
            100% { transform: translateY(0); opacity: 0.3; }
          }
        `}
      </style>
    </Box>
  );
};

export default AutoParkIQ;
