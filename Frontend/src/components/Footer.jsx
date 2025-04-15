import React from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  useTheme,
  Container,
  IconButton,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        py: 4,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          {/* Navigation Links */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 3,
                mb: { xs: 2, md: 0 },
              }}
            >
              {["About", "Contact", "Privacy", "Terms"].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                gap: 1,
              }}
            >
              {[TwitterIcon, InstagramIcon, FacebookIcon].map((Icon, idx) => (
                <IconButton
                  key={idx}
                  size="small"
                  sx={{
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 3,
            textAlign: "center",
            borderTop: `1px solid ${theme.palette.divider}`,
            pt: 2,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            © {new Date().getFullYear()} AutoParkIQ. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;