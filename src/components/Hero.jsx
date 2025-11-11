import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Fade,
} from "@mui/material";
import { STATS } from "../data/constants";
import homepage2 from "../assets/homepage2.png";

export default function Hero() {
  const [fadeIn, setFadeIn] = useState(false);
  const [imageJump, setImageJump] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    const jumpTimeout = setTimeout(() => setImageJump(true), 600);
    return () => clearTimeout(jumpTimeout);
  }, []);

  // Smooth scroll function
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      id="home"
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 2, md: 6 },
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Fade in={fadeIn} timeout={1000}>
          <Grid container spacing={6} alignItems="center">
            {/* LEFT: Text content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  mb: 2,
                  background: "linear-gradient(45deg, #ffffff, #e0e7ff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "slideInLeft 1s ease-out",
                  fontSize: { xs: "2rem", md: "3.75rem" },
                  lineHeight: { xs: 1.2, md: 1.1 },
                }}
              >
                Pioneering the Future of Technology
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  mb: { xs: 2, md: 3 },
                  fontWeight: 700,
                  animation: "slideInLeft 1s ease-out 0.2s both",
                  fontSize: { xs: "1.15rem", md: "1.75rem" },
                }}
              >
                Where Innovation Meets{" "}
                <span
                  style={{
                    background:
                      // "linear-gradient(45deg, rgb(249, 5, 127), rgb(21, 35, 230))",
                      "linear-gradient(45deg, #FFE600, #FF4BC1)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "pulse 2s infinite",
                    // textShadow: "0 1px 6px rgba(255,255,255,0.35)",
                    //  WebkitTextStroke: "0.5px rgba(255,255,255,0.75)",
                  }}
                >
                  Excellence
                </span>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: { xs: 3, md: 6 },
                  opacity: 0.9,
                  animation: "slideInLeft 1s ease-out 0.4s both",
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                }}
              >
                Transforming businesses through cutting-edge technologies
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 1, md: 2},
                  flexWrap: "wrap",
                  animation: "slideInLeft 1s ease-out 0.6s both",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => scrollToSection("#pricing")}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(45deg, #484be2ff, #ec4899)",
                    borderRadius: "25px",
                    px: { xs: 1.5, sm: 3, md: 4 },
                    py: { xs: 1.5, sm: 1, md: 1.5 },
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    // px: 4,
                    // py: 1.5,
                    // fontSize: "1.1rem",
                    fontWeight: 600,
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "200%",
                      height: "100%",
                      // background:
                      //   "linear-gradient(120deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.3) 100%)",
                      transform: "skewX(-20deg)",
                      // animation: "shine 10s linear infinite",
                    },
                    "&:hover": {
                      transform: "translateY(-2px) scale(1.05)",
                      boxShadow: "0px 15px 35px rgba(74, 74, 110, 1)",
                    },
                  }}
                >
                  🚀 Start Your Innovation Journey
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollToSection("#ourprojects")}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    borderRadius: "25px",
                    px: { xs: 2.5, sm: 3.5, md: 4 },
                    py: { xs: 1, sm: 1.2, md: 1.5 },
                    fontSize: { xs: "1rem", sm: "1rem", md: "1.1rem" },
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderColor: "white",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  ✨ Explore Our Creations
                </Button>
              </Box>
            </Grid>

            {/* RIGHT: Quick Facts */}
            <Grid item xs={12} md={6}>
              <Fade
                in={fadeIn}
                timeout={1000}
                style={{ transitionDelay: "0.3s" }}
              >
                <Paper
                  elevation={10}
                  sx={{
                    p: { xs: 1.5, sm: 3, md: 4 },
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    animation: "slideInRight 1s ease-out 0.5s both",
                    position: "relative",
                    zIndex: 2,
                    // width: "100%",
                    // overflow: "hidden",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ mb: { xs: 1, sm: 2, md: 3 }, color: "text.primary", fontWeight: 600 }}
                  >
                    Quick Facts
                  </Typography>
                  <Grid
                    container
                    spacing={{ xs: 0.5, sm: 2, md: 3 }} // ✅ much smaller gap on phone
                    columnSpacing={{ xs: 0.5, sm: 2, md: 3 }}
                  >
                    {STATS.map((stat) => (
                      <Grid item xs={4} sm={4} md={4} key={stat.label}>
                        <Box
                          sx={{
                            textAlign: "center",
                            p: { xs: 1, sm: 2 },
                            borderRadius: 2,
                            background:
                              "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                            },
                          }}
                        >
                          <stat.icon
                            sx={{ fontSize: 34, color: stat.color, mb: 1 }}
                          />
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 700,
                              color: stat.color,
                              mb: 0.5,
                              fontSize: {
                                xs: "1.1rem",
                                sm: "1.25rem",
                                md: "1.75rem",
                              },
                            }}
                          >
                            {stat.value}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ 
                            color: "text.secondary", 
                            fontWeight: 500,
                            fontSize: {
                                xs: "0.75rem",
                                sm: "0.75rem",
                                md: "0.80rem",
                              }, 
                            }}
                          >
                            {stat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Fade>
      </Container>

      {/* Animated Hero Image */}
      {/* Hero image: absolute on larger screens, flows in document on small screens */}
      <Box
        component="img"
        src={homepage2}
        alt="Hero"
        sx={{
          position: { xs: "relative", md: "absolute" },
          top: { xs: "auto", md: "70%" },
          right: { xs: "auto", md: 0 },
          transform: imageJump
            ? { xs: "translateY(0)", md: "translateY(-50%)" }
            : { xs: "translateY(0)", md: "translateY(-30%)" },
          width: { xs: "100%", md: "40%" },
          maxWidth: { xs: "720px", md: "unset" },
          height: "auto",
          borderRadius: "16px",
          transition: "transform 0.6s ease-in-out",
          zIndex: 1,
          pointerEvents: "auto",
          objectFit: "cover",
          mt: { xs: 4, md: 0 },
          display: "block",
          mx: { xs: "auto", md: 0 },
          "&:hover": {
            transform: imageJump
              ? {
                  xs: "translateY(0)",
                  md: "translateY(-52%) scale(1.05) rotate3d(1,1,0,6deg)",
                }
              : {
                  xs: "translateY(0)",
                  md: "translateY(-32%) scale(1.05) rotate3d(1,1,0,6deg)",
                },
          },
        }}
      />

      {/* Floating slogan near image */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "70%", md: "32%" },
          right: { xs: "5%", md: "6%" },
          mt: { xs: 3, md: 0 },
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: {xs: "blur(200px)", md: "blur(20px)"},
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
          px: { xs: 2, md: 5 },
          py: { xs: 2, md: 3 },
          color: "white",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
          animation:
            "fadeIn 2s ease-out 1.5s both, floatCloud 4s ease-in-out infinite",
          zIndex: 2,
          maxWidth: { xs: "70%", md: "40%" },
          mx: { xs: "auto", md: "unset" },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #ec4899, #6366f1)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            letterSpacing: "0.5px",
            fontSize: {
              xs: "1rem",
              sm: "1.25rem",
              md: "1.50rem",
            },
          }}
        >
          You think it, we ink it.
        </Typography>
        <Box
          sx={{
            position: "absolute",
            bottom: "-15px",
            right: "25%",
            width: "25px",
            height: "25px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(15px)",
          }}
        />
      </Box>

      {/* Animations */}
      <style>
        {`
          @keyframes floatCloud {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }

          @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
}
