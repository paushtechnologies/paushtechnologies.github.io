import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { COMPANY_NAME } from "../data/constants";

export default function AboutSection() {
  return (
    <Box sx={{ py: 8, background: "#f8fafc" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                color: "text.primary",
                animation: "fadeInUp 1s ease-out",
              }}
            >
              Welcome to the Future with {COMPANY_NAME}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: "text.secondary",
                animation: "fadeInUp 1s ease-out 0.2s both",
              }}
            >
              We're not just a technology company—we're architects of tomorrow's
              digital landscape, crafting innovative solutions that redefine
              what's possible in the digital realm.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: "text.secondary",
                animation: "fadeInUp 1s ease-out 0.4s both",
              }}
            >
              Our mission is to bridge the gap between cutting-edge technology
              and real-world business challenges, creating digital ecosystems
              that drive unprecedented growth and efficiency.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: "text.secondary",
                animation: "fadeInUp 1s ease-out 0.6s both",
              }}
            >
              From AI-powered automation to blockchain innovations, we don't
              just follow trends—we create them. Every solution we build is
              designed to be future-proof, scalable, and transformative.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #6366f1, #ec4899)",
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                animation: "fadeInUp 1s ease-out 0.8s both",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.05)",
                  boxShadow: "0 15px 35px rgba(99, 102, 241, 0.3)",
                },
              }}
            >
              🚀 Discover Our Story
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                animation: "slideInRight 1s ease-out 0.5s both",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #10b981 100%)",
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    animation: "float 20s ease-in-out infinite",
                  },
                }}
              >
                <Box sx={{ textAlign: "center", zIndex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                    🧠 AI-Powered
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                    🔗 Blockchain-Enabled
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ☁️ Cloud-Native
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}