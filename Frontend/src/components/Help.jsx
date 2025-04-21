import React from "react";
import Cards from "./Cards";
import Cards2 from "./Cards2";
import Cards3 from "./Cards3";
import Cards4 from "./Cards4";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  Box,
  Container,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// Custom CSS for the slider
const customSliderStyles = `
  .slick-slide {
    transition: all 0.5s ease;
    opacity: 0.3;
    transform: scale(0.85);
  }

  .slick-center {
    opacity: 1;
    transform: scale(1.05);
  }

  .slick-slide > div {
    padding: 16px;
    border-radius: 16px; /* Added rounded borders */
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .slick-dots li button:before {
    font-size: 10px;
    color: #6c757d;
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
  const sliderRef = React.useRef(null);

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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
        },
      },
    ],
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <>
      <style>{customSliderStyles}</style>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
          color: theme.palette.text.primary,
          py: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center", px: { xs: 2, sm: 4 } }}>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
              }}
            >
              Discover Our Features
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 0,
                color: theme.palette.text.secondary,
              }}
            >
              Swipe through to explore the cutting-edge capabilities we bring to you.
            </Typography>
          </motion.div>

          {/* Slider Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Box
              sx={{
                mt: 4,
                position: "relative",
                ".slick-track": {
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              {/* Navigation Buttons */}
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "-40px",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  boxShadow: theme.shadows[3],
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "-40px",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  boxShadow: theme.shadows[3],
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
              >
                <ChevronRight />
              </IconButton>

              <Slider {...settings} ref={sliderRef}>
                {[Cards2, Cards, Cards3, Cards4].map((Card, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Card />
                  </motion.div>
                ))}
              </Slider>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}

export default Help;