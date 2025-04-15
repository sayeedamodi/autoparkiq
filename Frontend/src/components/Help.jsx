import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Cards2 from "./Cards2";
import Cards3 from "./Cards3";
import Cards4 from "./Cards4";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, AccessTime, Person } from "@mui/icons-material";

// Custom CSS for focused card carousel
const customSliderStyles = `
  .slick-slide {
    transition: all 0.5s ease;
    opacity: 0.05;
    transform: scale(0.7);
  }

  .slick-center {
    opacity: 1;
    transform: scale(1);
  }

  .slick-slide > div {
    padding: 20px;
  }

  .slick-dots li button:before {
    font-size: 12px;
    color: #1976d2;
  }

  .slick-dots li.slick-active button:before {
    color: #1976d2;
    opacity: 1;
  }

  .slick-list {
    overflow: visible;
  }
`;

function Help() {
  const theme = useTheme();
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "100px",
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
        }
      }
    ]
  };

  return (
    <>
      <style>{customSliderStyles}</style>
      <Container 
        maxWidth={false}
        sx={{
          maxWidth: "1400px",
          pt: { xs: 4, md: 10 },
          pb: { xs: 1, md: 1 },
          px: { xs: 2, sm: 4, md: 2 }
        }}
      >
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* <Box
            sx={{
              textAlign: "center",
              mb: { xs: 3, md: 2 },
              mt:{ xs:8 , md:3 }
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 1,
                background: "linear-gradient(45deg, #007FFF, #0059B2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Parking Management System
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: "600px",
                mx: "auto",
                mb: 1,
              }}
            >
              Smart parking solutions with real-time updates
            </Typography>

            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<ChevronLeft />}
              sx={{
                borderRadius: "12px",
                py: 1.5,
                px: 4,
                textTransform: "none",
                fontSize: "1rem",
                background: theme.palette.primary.main,
                "&:hover": {
                  background: theme.palette.primary.dark,
                },
              }}
            >
              Return to Dashboard
            </Button>
          </Box> */}

          {/* Carousel Section */}
          <Box 
            sx={{ 
              mt: 0,
              ".slick-track": {
                display: "flex",
                alignItems: "center",
              },
              mx: -3, // Compensate for card padding
            }}
          >
            <Slider {...settings}>
              {[Cards2, Cards, Cards3, Cards4].map((Card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card />
                </motion.div>
              ))}
            </Slider>
          </Box>
        </motion.div>
      </Container>
    </>
  );
}

export default Help;