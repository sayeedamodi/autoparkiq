import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react'; // or your icon source

const WelcomeUser = ({ currentUser }) => {
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateOut(true), 2000); // Big display for 2s
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!animateOut ? (
        <motion.div
          key="big"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30vh',
          }}
        >
          <Typography variant="h3" color="primary">
            Welcome, {currentUser}👋
          </Typography>
        </motion.div>
      ) : (
        <motion.div
          key="small"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <User size={20} color="#1976d2" />
          <Typography variant="body1">
            Welcome, <strong style={{ color: '#1976d2' }}>{currentUser}</strong>
          </Typography>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeUser;
