import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
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
import { X, Mail, Lock, Car, ParkingSquare } from "lucide-react"

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: { main: "#e91e63", light: "#f48fb1", dark: "#c2185b" },
    background: { default: "#ffffff", paper: "#ffffff" },
  },
  typography: {
    fontFamily: ["-apple-system", "BlinkMacSystemFont", "Roboto", "Arial", "sans-serif"].join(","),
  },
})

function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm()
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:4001/user/login", data)
      if (res.data) {
        toast.success("Logged in Successfully")
        localStorage.setItem("Users", JSON.stringify(res.data.user))
        setTimeout(() => window.location.reload(), 1000)
        handleClose()
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed")
    }
    finally {
      
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Login
      </Button>

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
            <DialogContent sx={{ p: 3 , backgroundColor: 'white' , padding : '80px' , borderRadius: '20px' , scrollBehavior :'none' }}>
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

                <Box sx={{ mb: 5, display: "flex", alignItems: "center", justifyContent: "center"   }}>
                  <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: "50%", backgroundColor: alpha(theme.palette.primary.main, 0.1), mb: 2 }}>
                      <ParkingSquare size={30} color={theme.palette.primary.main} />
                    </Box>
                  </motion.div>
                </Box>

                <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                  Welcome Back
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Button type="submit" variant="contained" color="primary" fullWidth={isMobile} sx={{ py: 1.2, px: 4, mb: isMobile ? 2 : 0 }} startIcon={<Car size={18} />}>
                      Login
                    </Button>

                    <Typography variant="body2" color="textSecondary">
                      Not registered?{" "}
                      <Link to="/signup" style={{ color: theme.palette.primary.main, textDecoration: "none", fontWeight: 500 }}>
                        Sign up
                      </Link>
                    </Typography>
                  </Box>
                </form>
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default Login
