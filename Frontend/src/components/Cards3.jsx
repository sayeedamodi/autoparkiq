import React, { useState } from "react";
import Verify from "./Verify";
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
            image="https://img.freepik.com/premium-vector/two-factor-authentication-concept-illustration_538492-58.jpg?w=740"
            alt="Verify Parking Code"
            sx={{
              borderRadius: "4px 4px 0 0",
              objectFit: "cover",
            }}
          />

          {/* Card Content */}
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
              Verify Code!
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1, mb: 2 }}
            >
              Click on <span style={{ fontWeight: "bold", color: "#1976d2" }}>Go Now</span> and verify your parking code.
            </Typography>

            {/* Button */}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenVerify} // Open the Verify component
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 2,
                paddingX: 3,
                paddingY: 1,
              }}
            >
              Go Now
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* Verify Modal/Dialog */}
      <Dialog
        open={isVerifyOpen}
        onClose={handleCloseVerify}
        fullWidth
        maxWidth="sm"
      >
        <Verify onClose={handleCloseVerify} />
      </Dialog>
    </>
  );
}

export default Cards3;