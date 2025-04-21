"use client"

import { Box, Button, Container, Grid, TextField, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { Link } from "react-router-dom"
import CarParkingAnimation from "./PAnimation"

export default function Banner() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg,rgb(208, 221, 237) 0%,rgb(221, 236, 237) 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/pattern-bg.png')",
          backgroundSize: "cover",
          opacity: 0.05,
          zIndex: 0,
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          my: { xs: 1, sm: 2, md: 5 },
          py: { xs: 3, sm: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
          position: "relative",
          zIndex: 1,
          minHeight: { xs: "100vh", md: "auto" },
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 6 }}
          alignItems="center"
          sx={{
            flexDirection: { xs: "column-reverse", md: "row" },
            flexWrap: "nowrap",
            minHeight: { xs: "100%", md: "auto" },
          }}
        >
          {/* Text Content */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              px: { xs: 1, sm: 2, md: 4 },
              width: { xs: "100%", md: "50%" },
              flexShrink: 0,
              mt: { xs: 3, md: 0 },
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                width: "200px",
                height: "200px",
                background: "radial-gradient(circle, rgba(255,65,108,0.1) 0%, rgba(255,75,43,0) 70%)",
                borderRadius: "50%",
                bottom: "-100px",
                left: "-50px",
                zIndex: -1,
              },
            }}
          >
            <Box
              sx={{
                mt: { xs: 0, sm: 1, md: 8 },
                mb: { xs: 1, sm: 2, md: 4 },
              }}
            >
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Typography
                  variant="h3"
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem",
                      md: "2.75rem",
                    },
                    textAlign: { xs: "center", md: "left" },
                    lineHeight: { xs: 1.3, md: 1.2 },
                    background: "linear-gradient(135deg, #333333 0%, #111111 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  Hello, Welcome To{" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: { xs: "block", md: "inline" },
                    }}
                  >
                    AutoParkIQ
                  </Box>
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <CarParkingAnimation />
                </Box>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
                <Typography
                  variant="body1"
                  sx={{
                    mb: { xs: 3, sm: 4, md: 5 },
                    fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
                    maxWidth: { xs: "100%", md: "90%" },
                    textAlign: { xs: "center", md: "left" },
                    px: { xs: 1, sm: 0 },
                    lineHeight: { xs: 1.6, md: 1.8 },
                    color: "#555",
                    fontWeight: 400,
                    letterSpacing: "0.015em",
                  }}
                >
                  Park your vehicle quick. Rent your place for parking and make your city traffic free. The best parking
                  app to save your time and reduce urban congestion.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-start",
                  width: "100%",
                  padding: isMobile ? "0 16px" : "0",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  variant="outlined"
                  sx={{
                    maxWidth: { xs: "100%", sm: "400px" },
                    mb: { xs: 3, sm: 4, md: 5 },
                    "& .MuiOutlinedInput-root": {
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      height: { xs: "50px", sm: "55px" },
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(5px)",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                      "&:hover fieldset": {
                        borderColor: "secondary.main",
                      },
                      "& fieldset": {
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <Mail
                        size={isSmallMobile ? 18 : 22}
                        className="mr-2 text-gray-500"
                        style={{ color: "#ff416c", marginRight: "10px" }}
                      />
                    ),
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-start",
                  padding: isMobile ? "0 16px" : "0",
                }}
              >
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  color="secondary"
                  sx={{
                    px: { xs: 4, sm: 6 },
                    py: { xs: 1.5, sm: 2 },
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: { xs: "0.875rem", sm: "1.125rem" },
                    width: { xs: "100%", sm: "auto" },
                    maxWidth: { xs: "250px", sm: "none" },
                    height: { xs: "50px", sm: "55px" },
                    background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
                    boxShadow: "0px 8px 20px rgba(255, 65, 108, 0.3)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      background: "linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)",
                      boxShadow: "0px 10px 25px rgba(255, 65, 108, 0.5)",
                      transform: "translateY(-3px)",
                    },
                    "&:active": {
                      transform: "translateY(1px)",
                      boxShadow: "0px 5px 15px rgba(255, 65, 108, 0.4)",
                    },
                  }}
                >
                  Get Started 🚀
                </Button>
              </motion.div>
            </Box>
          </Grid>

          {/* Image - TV Screen Style */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: { xs: "100%", md: "55%" }, // Made wider
              flexShrink: 0,
              mt: { xs: 2, md: 0 },
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                width: { xs: "150px", md: "300px" },
                height: { xs: "150px", md: "300px" },
                background: "radial-gradient(circle, rgba(255,65,108,0.1) 0%, rgba(255,75,43,0) 70%)",
                borderRadius: "50%",
                top: { xs: "10%", md: "20%" },
                right: { xs: "5%", md: "10%" },
                zIndex: 0,
              },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: isMobile ? "0 8px" : "0",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* TV Screen Frame */}
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "95%", sm: "90%", md: "110%" }, // Wider than before
                  maxWidth: "650px", // Increased max width
                  borderRadius: "12px",
                  background: "#111",
                  padding: "15px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  "&::before": {
                    // TV Screen power indicator
                    content: '""',
                    position: "absolute",
                    bottom: "10px",
                    right: "20px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "rgba(255,65,108,1)",
                    boxShadow: "0 0 10px rgba(255,65,108,0.8)",
                    zIndex: 3,
                  },
                  "&::after": {
                    // TV Stand
                    content: '""',
                    position: "absolute",
                    bottom: "-25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: "25px",
                    background: "linear-gradient(to bottom, #333, #111)",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    zIndex: 1,
                  },
                }}
              >
                {/* Screen Inner Frame */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "4px",
                    overflow: "hidden",
                    background: "#000",
                    "&::before": {
                      // Screen reflection/glare
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "200%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                      transform: "skewX(-15deg)",
                      zIndex: 2,
                      pointerEvents: "none",
                    },
                  }}
                >
                  {/* TV Screen Content */}
                  <Box
                    component="img"
                    src="/Banner.png"
                    alt="AutoParkIQ Banner"
                    sx={{
                      maxWidth: "100%",
                      height: "auto",
                      width: "100%",
                      maxHeight: {
                        xs: "220px",
                        sm: "300px",
                        md: "500px",
                      },
                      objectFit: "strech" ,
                      transform: "translateZ(0)",
                      transition: "all 0.3s ease-in-out",
                      position: "relative",
                      zIndex: 1,
                      filter: "brightness(1.1) contrast(1.1)",
                    }}
                  />

                  {/* TV Screen Scan Lines Effect */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
                      backgroundSize: "100% 2px",
                      opacity: 0.3,
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  />

                  {/* TV Screen Edge Vignette */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      boxShadow: "inset 0 0 30px rgba(0,0,0,0.8)",
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  />
                </Box>

                {/* TV Control Buttons */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "20px",
                    display: "flex",
                    gap: "6px",
                    zIndex: 3,
                  }}
                >
                  {[...Array(4)].map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#444",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
