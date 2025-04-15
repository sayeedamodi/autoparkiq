import { Box, Button, Container, Grid, TextField, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { Link } from "react-router-dom";
import CarParkingAnimation from './PAnimation';
export default function Banner() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        my: { xs: 1, sm: 2, md: 5 }, 
        py: { xs: 1, sm: 2, md: 4 },
        px: { xs: 1, sm: 2, md: 4 },
        overflow: 'hidden',
        minHeight: { xs: '100vh', md: 'auto' } // Full height on mobile
      }}
    >
      <Grid 
        container 
        spacing={{ xs: 1, sm: 2, md: 4 }} 
        alignItems="center"
        sx={{
          flexDirection: { xs: 'column-reverse', md: 'row' },
          flexWrap: 'nowrap',
          minHeight: { xs: '100%', md: 'auto' }
        }}
      >
        {/* Text Content */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            px: { xs: 1, sm: 2, md: 4 },
            width: { xs: '100%', md: '50%' },
            flexShrink: 0,
            mt: { xs: 2, md: 0 } // Add margin top on mobile
          }}
        >
          <Box 
            sx={{ 
              mt: { xs: 0, sm: 1, md: 8 }, 
              mb: { xs: 1, sm: 2, md: 4 }
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "1.25rem",
                    sm: "1.75rem",
                    md: "2.5rem"
                  },
                  textAlign: { xs: "center", md: "left" },
                  lineHeight: { xs: 1.3, md: 1.2 }
                }}
              >
                Hello, welcomes To{" "}
                <Box 
                  component="span" 
                  sx={{ 
                    color: "secondary.main",
                    display: { xs: "block", md: "inline" }
                  }}
                >
                  AutoParkIQ
                </Box>
                <CarParkingAnimation />
              </Typography>
            </motion.div>
           
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Typography
                variant="body1"
                sx={{
                  mb: { xs: 2, sm: 3, md: 4 },
                  fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
                  maxWidth: { xs: "100%", md: "90%" },
                  textAlign: { xs: "center", md: "left" },
                  px: { xs: 1, sm: 0 },
                  lineHeight: { xs: 1.5, md: 1.7 }
                }}
              >
                Park your vehicle quick. Rent your place for parking and make your city traffic free. The best parking
                app to save your time.
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
                padding: isMobile ? "0 16px" : "0"
              }}
            >
              <TextField
                fullWidth
                placeholder="Email"
                variant="outlined"
                sx={{
                  maxWidth: { xs: "100%", sm: "400px" },
                  mb: { xs: 2, sm: 3, md: 4 },
                  "& .MuiOutlinedInput-root": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    height: { xs: "45px", sm: "auto" },
                    "&:hover fieldset": {
                      borderColor: "secondary.main",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Mail 
                      size={isSmallMobile ? 16 : 20} 
                      className="mr-2 text-gray-500" 
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
                padding: isMobile ? "0 16px" : "0"
              }}
            >
 <Button
      component={Link}
      to="/signup"
      variant="contained"
      color="secondary"
      sx={{
        px: { xs: 3, sm: 5 },
        py: { xs: 1.5, sm: 2 },
        borderRadius: "12px",
        textTransform: "none",
        fontWeight: "bold",
        fontSize: { xs: "0.875rem", sm: "1rem" },
        width: { xs: "100%", sm: "auto" },
        maxWidth: { xs: "250px", sm: "none" },
        height: { xs: "45px", sm: "50px" },
        background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
        boxShadow: "0px 4px 10px rgba(255, 105, 135, 0.3)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          background: "linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)",
          boxShadow: "0px 6px 15px rgba(255, 105, 135, 0.5)",
          transform: "scale(1.05)",
        },
      }}
    >
      Get Started 🚀
    </Button>

            </motion.div>
          </Box>
        </Grid>

        {/* Image */}
        <Grid 
          item 
          xs={12} 
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: '100%', md: '50%' },
            flexShrink: 0,
            mt: { xs: 2, md: 0 }
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
              padding: isMobile ? "0 8px" : "0"
            }}
          >
            <Box
              component="img"
              src="/Banner.png"
              alt="AutoParkIQ Banner"
              sx={{
                maxWidth: "100%",
                height: "auto",
                width: {
                  xs: "90%",
                  sm: "80%",
                  md: "100%"
                },
                maxHeight: {
                  xs: "180px",
                  sm: "250px",
                  md: "460px"
                },
                objectFit: "contain",
              }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  )
}