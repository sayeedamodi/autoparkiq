import React, { useState } from "react";
import { motion } from "framer-motion";
import Location from "./Location";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled } from "@mui/material/styles";

const StyledCard = styled(motion(Card))(({ theme }) => ({
  maxWidth: 400,
  margin: '0 auto',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  background: theme.palette.mode === 'dark' ? '#1a2027' : '#fff',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    margin: theme.spacing(2),
  },
}));

const AnimatedButton = styled(motion(Button))(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: '10px 30px',
  fontSize: '1.1rem',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: 'white',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  },
}));

function Cards2() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <Box 
      sx={{ 
        padding: { xs: 2, sm: 3, md: 4 },
        background: (theme) => 
          theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <StyledCard elevation={8}>
          <CardMedia
            component="img"
            height="300"
            image="https://img.freepik.com/free-vector/man-looking-through-loupe-car-route-mobile-map-app-persons-hand-holding-magnifying-glass-flat-vector-illustration-gps-service-location-concept-banner-website-design-landing-web-page_74855-24914.jpg"
            alt="Parking Search"
            sx={{
              objectFit: 'cover',
              p: { xs: 2, sm: 3 },
              background: 'linear-gradient(45deg, #f0f0f0, #ffffff)'
            }}
          />
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1.5rem', sm: '2rem' },
                background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Search Parking!
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                color: 'text.secondary'
              }}
            >
              Click On <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Go Now
              </Box> And Find Your Parking Area
            </Typography>
            <AnimatedButton
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              startIcon={<SearchIcon />}
              component={motion.button}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              sx={{
                width: { xs: '100%', sm: 'auto' },
                minWidth: { sm: 200 }
              }}
            >
              GO NOW
            </AnimatedButton>
          </CardContent>
        </StyledCard>
      </motion.div>

      <Location 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

</Box>
  );
}

export default Cards2;