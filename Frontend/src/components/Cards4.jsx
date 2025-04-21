import React, { useState } from "react";
import Exit from "./Exit";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Dialog,
} from "@mui/material";

function Cards3() {
  const [isVerifyOpen, setIsVerifyOpen] = useState(false); // State to manage Verify component visibility

  const handleOpenVerify = () => {
    setIsVerifyOpen(true); // Open the Verify component
  };

  const handleCloseVerify = () => {
    setIsVerifyOpen(false); // Close the Verify component
  };

  return (
    <>
      <Box
        sx={{
          mt: 1,
          mb: 4,
          p: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: 350,
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
            borderRadius: 4,
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          {/* Card Media/Image */}
          <CardMedia
            component="img"
            height="200"
            image="https://img.freepik.com/premium-vector/chargeable-parking-facility-with-car-standing-front-auto-barrier-isometric-vector-illustration_223337-39761.jpg?ga=GA1.1.126040631.1745250077&semt=ais_hybrid&w=740"
            alt="Exit car"
            sx={{
              borderRadius: "4px 4px 0 0",
              objectFit: "cover",
            }}
          />

          {/* Card Content */}
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
              Exit Car
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1, mb: 2 }}
            >
              Click on <span style={{ fontWeight: "bold", color: "#1976d2" }}>Exit </span> to exit parking.
            </Typography>

            {/* Button
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenVerify} // Open the Verify component
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 2,
                paddingX: 1,
                paddingY: 1,
              }}
            > */}
              <Exit onClose={handleCloseVerify} />
            {/* </Button> */}
          </CardContent>
        </Card>
      </Box>

        
    </>
  );
}

export default Cards3;