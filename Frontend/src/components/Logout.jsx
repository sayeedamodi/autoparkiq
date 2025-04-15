import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { Button, Box } from "@mui/material";
import { DoorOpen } from "lucide-react";
import { motion } from "framer-motion";

const Logout = () => {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = () => {
    try {
      setAuthUser({ ...authUser, user: null });
      localStorage.removeItem("Users");
      toast.success("Logout successfully");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: -1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleLogout}
          variant="contained"
          startIcon={<DoorOpen size={20} />}
          sx={{
            bgcolor: "#d32f2f",
            color: "#fff",
            textTransform: "none",
            px: 3,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: "0px 4px 12px rgba(211, 47, 47, 0.4)",
            "&:hover": {
              bgcolor: "#b71c1c",
            },
          }}
        >
          Logout
        </Button>
      </motion.div>
    </Box>
  );
};

export default Logout;

