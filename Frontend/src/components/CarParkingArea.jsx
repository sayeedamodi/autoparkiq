import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CircularProgress,
  Box,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  useMediaQuery,
  Paper,
  Dialog
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  AccessTime as ClockIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  DirectionsCar as CarIcon,
  Videocam as VideoIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';
import Payment from './Payment';

// Constants
const drawerWidth = 240;
const USERNAME = 'sayeedamodi';
const INITIAL_UTC_TIME = '2025-04-06 10:14:35';

// Styled Components
const Root = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  background: '#f8f9fa',
});

const MainContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: 'linear-gradient(90deg, #1a237e, #0d47a1)',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DateTimeDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0, 2),
  '& .MuiSvgIcon-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

const LiveFeedContainer = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%)',
    zIndex: 1,
  },
}));

const BookNowButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  padding: theme.spacing(1.5, 4),
  borderRadius: '30px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  [theme.breakpoints.down('sm')]: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    left: theme.spacing(2),
    width: 'calc(100% - 32px)',
  },
}));

function CarParkingArea() {
  const [parkingStatus, setParkingStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(INITIAL_UTC_TIME);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchParkingStatus = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/parking-status', {
          headers: { 'Content-Type': 'application/json' },
        });
        setParkingStatus(response.data);
      } catch (error) {
        console.error('Error fetching parking status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingStatus();
    const interval = setInterval(fetchParkingStatus, 5000);

    // Update UTC time in specified format
    const timeInterval = setInterval(() => {
      const now = new Date();
      const utcYear = now.getUTCFullYear();
      const utcMonth = String(now.getUTCMonth() + 1).padStart(2, '0');
      const utcDay = String(now.getUTCDate()).padStart(2, '0');
      const utcHours = String(now.getUTCHours()).padStart(2, '0');
      const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
      const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
      
      const formattedDateTime = `${utcYear}-${utcMonth}-${utcDay} ${utcHours}:${utcMinutes}:${utcSeconds}`;
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  const drawerItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'History', icon: <HistoryIcon />, path: '/history' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  return (
    <Root>
      <MainContent open={drawerOpen}>
        <Toolbar />
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Status Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <CarIcon color="primary" />
                      <Typography variant="h6" color="primary">
                        Total Spaces
                      </Typography>
                    </Box>
                    <Typography variant="h3">
                      {parkingStatus.length}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <CheckCircleIcon color="success" />
                      <Typography variant="h6" color="success.main">
                        Available Spaces
                      </Typography>
                    </Box>
                    <Typography variant="h3" color="success.main">
                      {parkingStatus.filter(space => space.status.toLowerCase() === 'free').length}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <CancelIcon color="error" />
                      <Typography variant="h6" color="error.main">
                        Occupied Spaces
                      </Typography>
                    </Box>
                    <Typography variant="h3" color="error.main">
                      {parkingStatus.filter(space => space.status.toLowerCase() !== 'free').length}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>

            {/* Parking Spaces Grid */}
            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={2}>
                {parkingStatus.map((space, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <StyledCard>
                        <CardContent>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">
                              Space {space.space}
                            </Typography>
                            <Chip
                              icon={space.status.toLowerCase() === 'free' ? <CheckCircleIcon /> : <CancelIcon />}
                              label={space.status}
                              color={space.status.toLowerCase() === 'free' ? 'success' : 'error'}
                              variant="outlined"
                            />
                          </Box>
                        </CardContent>
                      </StyledCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Live Feed */}
            <Box mt={6}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VideoIcon /> Live Feed
              </Typography>
              <LiveFeedContainer
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
              >
                <img
                  src="http://127.0.0.1:5000/video-feed"
                  alt="Live Feed"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    color: 'white',
                  }}
                >
                  <Typography variant="subtitle1">
                    Last Updated: {currentDateTime}
                  </Typography>
                </Box>
              </LiveFeedContainer>
            </Box>
          </motion.div>
        </Container>

        {/* Book Now Button */}
        <BookNowButton
          variant="contained"
          color="primary"
          onClick={() => setIsPaymentOpen(true)}
          startIcon={<PaymentIcon />}
        >
          Book Now
        </BookNowButton>

        {/* Payment Modal */}
        <Dialog
          open={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              bgcolor: 'background.paper',
            }
          }}
        >
          <Payment onClose={() => setIsPaymentOpen(false)} />
        </Dialog>
      </MainContent>
    </Root>
  );
}

export default CarParkingArea;