// import React, { useEffect, useRef } from "react";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import { motion } from "framer-motion";
// import { Car, LoaderPinwheel } from "lucide-react"; 
// import engineSound from '../assets/engine.mp3';

// const Loader = () => {
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.play().catch((err) => {
//         console.warn("Autoplay failed:", err);
//       });
//     }

//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//       }
//     };
//   }, []);

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         width: "100%",
//         bgcolor: "rgba(15, 15, 15, 0.9)", // semi-transparent background
//         color: "white",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         overflow: "hidden",
//         position: "relative",
//         zIndex: 9999,
//       }}
//     >
//       {/* Road Line */}
//       <Box
//         sx={{
//           width: "100%",
//           height: "6px",
//           bgcolor: "#444",
//           borderRadius: 2,
//           position: "relative",
//           mt: 4,
//         }}
//       >
//         <motion.div
//           initial={{ x: "-100vw" }}
//           animate={{ x: "100vw" }}
//           transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
//           style={{
//             position: "absolute",
//             top: "-32px", // Adjust to place car above the road
//             left: 0,
//           }}
//         >
//           <Car size={64} color="#4caf50" />
//         </motion.div>
//       </Box>

//       {/* Rotating Loader Icon */}
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
//         style={{ marginTop: 50 }}
//       >
//         <LoaderPinwheel size={48} color="#2196f3" />
//       </motion.div>

//       {/* Text + Circular Progress */}
//       <Typography variant="h6" mt={4} sx={{ opacity: 0.9 }}>
//         AutoParkIQ is starting your engine...
//       </Typography>
//       <CircularProgress color="success" sx={{ mt: 2 }} />

//       {/* Hidden Audio */}
//       <audio ref={audioRef} src={engineSound} loop />
//     </Box>
//   );
// };

// export default Loader;


"use client"

import { useEffect, useRef, useState } from "react"
import { Box, Typography } from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import { Car, LoaderPinwheel, CheckCircle, Gauge, Lock } from "lucide-react"

const Loader = () => {
  const audioRef = useRef(null)
  const [loadingPhase, setLoadingPhase] = useState(0)
  const [progress, setProgress] = useState(0)

  const loadingTexts = [
    "Initializing systems...",
    "Starting your engine...",
    "Optimizing parking algorithm...",
    "Securing connection...",
    "Ready to navigate",
  ]

  const loadingIcons = [LoaderPinwheel, Gauge, Car, Lock, CheckCircle]
  const colors = ["#6366f1", "#ec4899", "#f97316", "#14b8a6", "#22c55e"]

  useEffect(() => {
    // Audio setup
    if (audioRef.current) {
      audioRef.current.volume = 0.6 // Lower volume
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay failed:", err)
      })
    }

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 80)

    // Phase transitions
    const phaseInterval = setInterval(() => {
      setLoadingPhase((prev) => {
        if (prev >= loadingTexts.length - 1) {
          clearInterval(phaseInterval)
          return prev
        }
        return prev + 1
      })
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(phaseInterval)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [loadingTexts.length])

  const CurrentIcon = loadingIcons[loadingPhase]

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        background: "radial-gradient(circle at center, rgba(15, 23, 42, 0.95) 0%, rgba(3, 7, 18, 0.98) 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        zIndex: 9999,
      }}
    >
      {/* Particle background effect */}
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2, overflow: "hidden" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              backgroundColor: "#fff",
              borderRadius: "50%",
            }}
          />
        ))}
      </Box>

      {/* Logo */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          letterSpacing: "-0.03em",
          mt: -8,
          mb: 1,
          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
          background: "linear-gradient(to right, #fff 0%, #94a3b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        AutoParkIQ
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 10,
          fontWeight: 300,
          opacity: 0.7,
          letterSpacing: "0.05em",
        }}
      >
        loading ...
      </Typography>

      {/* Road Line with Perspective */}
      <Box
        sx={{
          width: "60%",
          maxWidth: "700px",
          height: "8px",
          backgroundColor: "rgba(30, 41, 59, 0.8)",
          borderRadius: 8,
          position: "relative",
          overflow: "visible",
          transform: "perspective(1000px) rotateX(60deg)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 8,
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255, 255, 255, 0.4) 40px, rgba(255, 255, 255, 0.4) 80px)",
            animation: "roadMarkings 1.5s linear infinite",
            "@keyframes roadMarkings": {
              "0%": { backgroundPosition: "0 0" },
              "100%": { backgroundPosition: "-80px 0" },
            },
          },
        }}
      >
        <motion.div
          initial={{ x: "-100%", rotateY: 0 }}
          animate={{ x: "100%", rotateY: 0 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "-28px",
            left: 0,
            // This transform counteracts the parent's perspective
            transform: "perspective(1000px) rotateX(-60deg)",
            transformOrigin: "bottom center",
          }}
        >
          <motion.div
            animate={{
              y: [0, -2, 0],
              boxShadow: [
                "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
                "0 15px 30px -5px rgba(0, 0, 0, 0.5)",
                "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 0.6,
              repeatType: "reverse",
            }}
          >
            <Car
              size={40}
              color={colors[loadingPhase]}
              style={{
                filter: `drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))`,
                transition: "color 0.5s ease",
              }}
            />
          </motion.div>
        </motion.div>
      </Box>

      {/* Loading Status */}
      <Box sx={{ mt: 10, width: "80%", maxWidth: "400px" }}>
        {/* Phase animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={loadingPhase}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <motion.div
              animate={{ rotate: loadingPhase === loadingTexts.length - 1 ? 0 : 360 }}
              transition={{
                repeat: loadingPhase === loadingTexts.length - 1 ? 0 : Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "linear",
              }}
              style={{ marginRight: "12px" }}
            >
              <CurrentIcon
                size={28}
                color={colors[loadingPhase]}
                strokeWidth={2}
                style={{ transition: "color 0.5s ease" }}
              />
            </motion.div>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: colors[loadingPhase],
                transition: "color 0.5s ease",
              }}
            >
              {loadingTexts[loadingPhase]}
            </Typography>
          </motion.div>
        </AnimatePresence>

        {/* Custom Progress Bar */}
        <Box
          sx={{
            width: "100%",
            height: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
            style={{
              height: "100%",
              background: `linear-gradient(to right, ${colors[0]}, ${colors[loadingPhase]})`,
              borderRadius: "6px",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "0.75rem",
          }}
        >
          <span>Starting up</span>
          <span>{`${Math.min(progress, 100)}%`}</span>
        </Box>
      </Box>

      {/* Hidden Audio */} 
      <audio ref={audioRef} src="../assets/engine.mp3" loop />
    </Box>
  )
}

export default Loader
