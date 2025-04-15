import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import WifiIcon from "@mui/icons-material/Wifi";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";

const CarParkingAnimation = () => {
  const parkingSpots = [0, 1, 2];

  return (
    <Box
      sx={{
        mt: 5,
        position: "relative",
        height: 280,
        width: "100%",
        backgroundColor: "#f5f5f5",
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid #e0e0e0",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* IP Camera */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          top: 10,
          right: 20,
          zIndex: 5,
          backgroundColor: "#2b2b2b",
          padding: 10,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <CameraIndoorIcon sx={{ fontSize: 28, color: "#fff" }} />
        <WifiIcon sx={{ fontSize: 20, color: "#66bb6a" }} />
        {/* Green dot */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#00e676",
            boxShadow: "0 0 8px #00e676",
          }}
        />
      </motion.div>

      {/* WiFi Beams */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.5 + i * 0.4, 2] }}
          transition={{
            duration: 2.5,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: 24,
            right: 35,
            width: 30 + i * 10,
            height: 30 + i * 10,
            borderRadius: "50%",
            background: "rgba(102, 187, 106, 0.15)",
            zIndex: 1,
          }}
        />
      ))}

      {/* Parking Spots */}
      {parkingSpots.map((i) => (
        <Box
          key={`spot-${i}`}
          sx={{
            position: "absolute",
            top: 60 + i * 65,
            left: 30,
            width: 100,
            height: 45,
            border: "1.5px dashed #bdbdbd",
            borderRadius: 4,
            backgroundColor: "#ffffff",
            zIndex: 1,
          }}
        />
      ))}

      {/* Cars Entering & Exiting */}
      {parkingSpots.map((i) => (
        <motion.div
          key={`car-${i}`}
          animate={{
            x: ["-120%", "0%", "0%", "120%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            delay: i * 1.2,
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: 60 + i * 65,
            left: 30,
            width: 100,
            height: 45,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3,
          }}
        >
          <DirectionsCarIcon sx={{ fontSize: 38, color: "#424242" }} />
        </motion.div>
      ))}

      {/* Slot Detection */}
      {parkingSpots.map((i) => (
        <motion.div
          key={`pulse-${i}`}
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.05, 1] }}
          transition={{
            delay: i * 1.2,
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: 60 + i * 65,
            left: 30,
            width: 100,
            height: 45,
            border: "1.5px solid #ef5350",
            borderRadius: 4,
            zIndex: 2,
          }}
        />
      ))}

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 8,
          right: 12,
          color: "#9e9e9e",
          fontSize: "0.75rem",
        }}
      >
        Parking AI System Active • 2025
      </Typography>
    </Box>
  );
};

export default CarParkingAnimation;
