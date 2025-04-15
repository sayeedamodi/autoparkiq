import React, { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import Login from "./Login"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
  InputAdornment,
  createTheme,
  ThemeProvider,
  alpha,
  useMediaQuery,
} from "@mui/material"
import { X, Mail, Lock, UserRound, ParkingSquare } from "lucide-react"
import CarParkingAnimation from "./PAnimation" 
import AutoParkIQ from "./AutoParkIQ"
import Navbar from "./Navbar"

const theme = createTheme({
  palette: {
    primary: { main: "#e91e63", light: "#f48fb1", dark: "#c2185b" },
    background: { default: "#ffffff", paper: "#ffffff" },
  },
  typography: {
    fontFamily: ["-apple-system", "BlinkMacSystemFont", "Roboto", "Arial", "sans-serif"].join(","),
  },
})

function Signup() {
  const { control, handleSubmit, formState: { errors } } = useForm()
  const [open, setOpen] = useState(true)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const handleClose = () => setOpen(false)

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:4001/user/signup", data)
      if (res.data) {
        toast.success("Signup Successfully")
        localStorage.setItem("Users", JSON.stringify(res.data.user))
        console.log("Sending userInfo:" , data);
        navigate('/')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup Failed")

    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <AnimatePresence>
        {open && (
          <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={motion.div}
            PaperProps={{
              initial: { opacity: 0, y: -20, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, scale: 0.95 },
              transition: { duration: 0.3 },
            }}
            maxWidth="xs"
            fullWidth
          >
            <DialogContent sx={{ p: 3, backgroundColor: 'white', borderRadius: '20px' }}>
              <Box sx={{ position: "relative" }}>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{ position: "absolute", right: -10, top: -10, color: "grey.500" }}
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} />
                </IconButton>

                <Box sx={{ mb: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: "50%", backgroundColor: alpha(theme.palette.primary.main, 0.1), mb: 2 }}>
                      <ParkingSquare size={30} color={theme.palette.primary.main} />
                    </Box>
                  </motion.div>
                </Box>

                <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                  Create Your Account
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="fullname"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.fullname}
                        helperText={errors.fullname?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <UserRound size={18} color={errors.fullname ? theme.palette.error.main : undefined} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Mail size={18} color={errors.email ? theme.palette.error.main : undefined} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock size={18} color={errors.password ? theme.palette.error.main : undefined} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />

                  <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary" fullWidth={isMobile} sx={{ py: 1.2, px: 4, mb: isMobile ? 2 : 0 }}>
                      Signup
                    </Button>

                    <Typography variant="body2" color="textSecondary">
                      Already have an account?{' '}
                      
                        <Login/>
            
                    </Typography>
                  </Box>
                </form>
                
              </Box>
            </DialogContent>
            
          </Dialog>
           
        )}
        
      </AnimatePresence>
      
      
      <AutoParkIQ/>
    </ThemeProvider>
    
  )
}

export default Signup