import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import { motion } from "framer-motion";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url('https://i.ibb.co/bgx0hgPY/image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: 2,
        position: "relative"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.6)",
          zIndex: 1
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3, backdropFilter: "blur(6px)", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
            <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
              Contact Us
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Full Name"
                fullWidth
                margin="normal"
                variant="outlined"
                {...register("fullname", { required: true })}
                error={Boolean(errors.fullname)}
                helperText={errors.fullname && "Full name is required"}
              />

              <TextField
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                type="email"
                {...register("email", { required: true })}
                error={Boolean(errors.email)}
                helperText={errors.email && "Email is required"}
              />

              <TextField
                label="Message"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                {...register("message", { required: true })}
                error={Boolean(errors.message)}
                helperText={errors.message && "Message is required"}
              />

              <Box textAlign="center" mt={3}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ px: 4, py: 1.2, borderRadius: 2 }}
                  >
                    Submit
                  </Button>
                </motion.div>
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;


