import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import theme from './theme';
import Home from "./home/Home";
import Helps from "./helps/Helps";
import Signup from "./components/Signup";
import Abouts from "./abouts/Abouts";
import Contacts from "./contacts/Contacts";
import CarParkingArea from "./components/CarParkingArea";
import Location from "./components/Location";
import Login from './components/Login';

import { Toaster } from 'react-hot-toast';
import { useAuth } from "./context/AuthProvider";
import Loader from './components/Loader'; 
import MyBookings from './components/MyBookings';
function App() {
  const [authUser] = useAuth();
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 
  const user = JSON.parse(localStorage.getItem("Users")) || [];
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, [location.pathname]); 

  if (loading) {
    return <Loader />; 
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myBookings" element={<MyBookings  userEmail={user.email}/>} />
        <Route path="/about" element={<Abouts />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/location" element={<Location />} />
        <Route path="/carparkingarea" element={<CarParkingArea />} />
        <Route path="/help" element={authUser ? <Helps /> : <Navigate to="/signup" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

