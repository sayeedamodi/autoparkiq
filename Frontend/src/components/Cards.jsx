import React, { useState } from "react";
import Payment from "./Payment";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  Container,
  Paper,
  Fade
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  width: "100%",
  borderRadius: 16,
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[8],
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: "12px 24px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    background: theme.palette.primary.dark,
  },
}));

function Cards() {
  const [showPayment, setShowPayment] = useState(false);

  const handleGoNowClick = () => {
    setShowPayment(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
      >
        <StyledCard elevation={3}>
          <CardMedia
            component="img"
            height="300"
            image="https://img.freepik.com/free-vector/parking-concept-illustration_114360-6644.jpg?t=st=1716189594~exp=1716193194~hmac=bda96a6b59037fd2b7efe2439765e23032b6cefdc9e088b4efd6d59818cc9a92&w=740"
            alt="Book Parking"
            sx={{ 
              p: 2, 
              borderRadius: 4,
              objectFit: "cover"
            }}
          />
          <CardContent sx={{ textAlign: "center", p: 3 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 2
              }}
            >
              Book Parking!
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ mb: 3 }}
            >
              Click on <Box component="span" color="primary.main" fontWeight="600">Go Now</Box> and fill in your parking details.
            </Typography>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={handleGoNowClick}
            >
              Go Now
            </StyledButton>
          </CardContent>
        </StyledCard>

        <Fade in={showPayment}>
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            {showPayment && (
              <Paper 
                elevation={3} 
                sx={{ 
                  borderRadius: 4,
                  overflow: "hidden"
                }}
              >
                <Payment />
              </Paper>
            )}
          </Box>
        </Fade>
      </Box>
    </Container>
  );
}

export default Cards;
