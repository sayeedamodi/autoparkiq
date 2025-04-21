// In your Navbar.jsx
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  InputBase,
  Container,
  alpha,
  Slide,
  useScrollTrigger,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Menu as MenuIcon, Search as SearchIcon, LightMode, DarkMode, Close } from "@mui/icons-material";
import { Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Login from './Login';
import Logout from './Logout';
import { useAuth } from '../context/AuthProvider';
import MyBookings from './MyBookings';
import WelcomeUser from "./WelcomeUser";
// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === "dark"
    ? "linear-gradient(180deg, rgba(13, 17, 23, 0.95) 0%, rgba(22, 27, 34, 0.95) 100%)"
    : "linear-gradient(180deg, rgba(189, 229, 243, 0.95) 0%, rgba(209, 216, 229, 0.95) 100%)",
  backdropFilter: "blur(10px)",
  boxShadow: theme.palette.mode === "dark" 
    ? "0 4px 20px rgba(0, 230, 255, 0.1)" 
    : "0 4px 20px rgba(0, 0, 0, 0.05)",
  borderBottom: theme.palette.mode === "dark" 
    ? "1px solid rgba(0, 230, 255, 0.1)" 
    : "1px solid rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease-in-out",
}));

const InfoDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.mode === "dark"
    ? alpha(theme.palette.common.white, 0.05)
    : alpha(theme.palette.common.black, 0.05),
  padding: theme.spacing(1, 4),
  borderRadius: theme.shape.borderRadius * 2,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const InfoText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '0.875rem',
  color: theme.palette.mode === "dark"
    ? alpha(theme.palette.common.white, 0.9)
    : alpha(theme.palette.common.black, 0.9),
  '& svg': {
    color: theme.palette.primary.main,
  },
}));

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(
    theme.palette.mode === "dark" 
      ? theme.palette.common.white 
      : theme.palette.common.black,
    0.05
  ),
  "&:hover": {
    backgroundColor: alpha(
      theme.palette.mode === "dark" 
        ? theme.palette.common.white 
        : theme.palette.common.black,
      0.1
    ),
  },
  border: theme.palette.mode === "dark"
    ? "1px solid rgba(255, 255, 255, 0.1)"
    : "1px solid rgba(0, 0, 0, 0.05)",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  transition: "all 0.3s ease",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.7) : undefined,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Fredoka, sans-serif',
  fontWeight: 700,
  letterSpacing: "0.05em",
  background: theme.palette.mode === "dark"
    ? "linear-gradient(90deg, #00e6ff, #b400ff)"
    : "linear-gradient(90deg, #e91e63, #2196f3)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: theme.palette.mode === "dark" ? "0 0 10px rgba(0, 230, 255, 0.5)" : "none",
}));

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  borderRadius: theme.shape.borderRadius * 2,
  textTransform: "none",
  fontWeight: 500,
  color: theme.palette.mode === "dark" 
    ? alpha(theme.palette.common.white, 0.9)
    : alpha(theme.palette.common.black, 0.9),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === "dark"
    ? "linear-gradient(90deg, #00e6ff, #b400ff)"
    : "linear-gradient(90deg, #e91e63, #2196f3)",
  color: "#fff",
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1, 3),
  textTransform: "none",
  fontWeight: 600,
  boxShadow: "none",
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    background: theme.palette.mode === "dark"
      ? "linear-gradient(90deg, #b400ff, #00e6ff)"
      : "linear-gradient(90deg, #2196f3, #e91e63)",
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Current date/time state with the specified format
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentUser, setCurrentUser] = useState("Guest");

  useEffect(() => {
    const storedUser = localStorage.getItem("Users");
    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            setCurrentUser(user.fullname); // Extract and set fullname
        } catch (error) {
            console.error("Failed to parse user data:", error);
            setCurrentUser("guest"); // Set to empty string or handle appropriately
        }
    }
}, []);

  // Update time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Convert to UTC+5:30 (IST)
      now.setMinutes(now.getMinutes()); // Add 5 hours 30 minutes

      // Format the date & time in YYYY-MM-DD hh:mm:ss AM/PM format
      const formattedDateTime = now.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // 12-hour format with AM/PM
      });

      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime(); // Set initial value immediately
    const timer = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const toggleTheme = () => {
    setMode(prev => prev === "dark" ? "light" : "dark");
  };

  const toggleDrawer = (open) => (event) => {
    if (event?.type === "keydown" && (event?.key === "Tab" || event?.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };
 

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };
  const navItems = [
    { title: "Home", path: "/" },
    { title: "Parking", path: "/Help" },
    { title: "My Bookings" , path : "/MyBookings"},
    { title: "Contact", path: "/Contact" },
    { title: "About", path: "/About" },
  ];

  return (
    <>
      <HideOnScroll>
        <StyledAppBar position="fixed">
          <Container maxWidth="xl" >
            <Toolbar disableGutters>
              {/* Mobile menu icon */}
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  onClick={toggleDrawer(true)}
                  sx={{ mr: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              {/* Logo */}
              <LogoText variant="h5" noWrap component="a" href="/">
                AutoParkIQ
              </LogoText>

              {/* Info Display */}
              <InfoDisplay
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                sx={{ ml: 4 }}
              >
                <InfoText>
                  <Clock size={16} />
                  {currentDateTime}
                </InfoText>
                <InfoText sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.1rem' }}>
  <User size={20} style={{ fontWeight: 'bold', color: '#1976d2' }} />
  Welcome  
  <span style={{ fontWeight: 'bold', color: '#1976d2', fontSize: '1.2rem' }}>
  {currentUser}
  </span>
  &nbsp;
</InfoText>
              
              </InfoDisplay>

              {/* Desktop navigation */}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end", mr: 2 }}>
                {navItems.map((item) => (
                  <NavButton key={item.title} href={item.path}>
                    {item.title}
                  </NavButton>
                ))}
              </Box>

              
              

              {/* Auth buttons */}
              <Box sx={{ ml: 1 }}>
                {authUser ? (
                  <Logout />
                ) : (
                  <Login isOpen={handleLoginClick} 
        onClose={handleLoginClose}  />
                )}
              </Box>
            </Toolbar>
          </Container>
        </StyledAppBar>
      </HideOnScroll>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(13,17,23,0.98) 0%, rgba(22,27,34,0.98) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(245,245,245,0.98) 100%)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <LogoText variant="h6">AutoParkIQ</LogoText>
            <IconButton onClick={toggleDrawer(false)}>
              <Close />
            </IconButton>
          </Box>
          
          <InfoText sx={{ mb: 1 }}>
            <Clock size={16} />
            {currentDateTime}
          </InfoText>
          <InfoText>
            <User size={16} />
            {currentUser}
          </InfoText>
        </Box>

        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.title}
              component="a"
              href={item.path}
              onClick={toggleDrawer(false)}
              sx={{
                borderRadius: 1,
                mx: 1,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>

        
      </Drawer>

      
    </>
  );
}