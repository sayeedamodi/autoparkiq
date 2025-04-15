import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Alert, AlertTitle, Fade } from '@mui/material';

const BookingSuccess = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setVisible(false), 5000); // Hide the message after 5s
    const timer2 = setTimeout(() => navigate('/MyBookings'), 5500); // Redirect after fade out

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <Fade in={visible} timeout={500}>
      <Card
        sx={{
          mt: 4,
          mx: 'auto',
          maxWidth: 500,
          backgroundColor: '#e6ffed',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Alert severity="success" variant="filled">
            <AlertTitle>🎉 Congratulations!</AlertTitle>
            Your parking slot has been booked successfully.
            <br />
            Redirecting to <strong>My Bookings</strong>...
          </Alert>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default BookingSuccess;
