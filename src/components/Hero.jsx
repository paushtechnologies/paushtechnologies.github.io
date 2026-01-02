import React, { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";
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
import { useLanguage } from "../context/LanguageContext";

/* ================= COUNT UP COMPONENT ================= */
const CountUp = ({ value, duration = 3000 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const start = 0;
    const end = Number(value);
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  const formatted =
    Number.isInteger(value)
      ? Math.round(displayValue)
      : displayValue.toFixed(1).replace(/\.0$/, "");

  return <>{formatted}</>;
};
/* ===================================================== */
export default function Hero() {
  const { t } = useLanguage();
  const [fadeIn, setFadeIn] = useState(false);
  const [imageJump, setImageJump] = useState(false);

  // VANTA BIRDS
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      const isMobile = window.innerWidth < 768;

      const effect = BIRDS({
        el: vantaRef.current,
        THREE,
        backgroundAlpha: 0.0,
        scale: 1.0,
        scaleMobile: isMobile ? 0.5 : 1.0,
        quantity: isMobile ? 1 : 1.5,
        birdSize: 0.6,
        wingSpan: 22,
        color1: "#FFFFFF",
        color2: 50943,
        colorMode: "varianceGradient",
        cohesion: isMobile ? 15 : 25,
        alignment: isMobile ? 15 : 40,
        separation: 8,
        speed: isMobile ? 0.2 : 1.6,
        speedLimit: isMobile ? 0.5 : 6,
        freedomFactor: isMobile ? 0.5 : 1.0,
        forceAnimate: !isMobile,
        mouseControls: true,
        touchControls: !isMobile,
      });
      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    setFadeIn(true);
    const jumpTimeout = setTimeout(() => setImageJump(true), 600);
    return () => clearTimeout(jumpTimeout);
  }, []);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      id="home"
      ref={vantaRef}
      sx={{
        pt: { xs: 10, md: 12 },
        pb: { xs: 2, md: 6 },
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        // background: "linear-gradient(90deg,  #FDB4BF 0%,  #F5C9D8 25%,  #E8D3EB 50%,  #D6D9EB 75%,  #B2DCDD 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Fade in={fadeIn} timeout={1000}>
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            {/* LEFT: Text content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  mb: { xs: 2, md: 2 },
                  background: "linear-gradient(45deg, #ffffff, #e0e7ff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "slideInLeft 1s ease-out",
                  fontSize: { xs: "1.75rem", md: "3.25rem" },
                  fontWeight: { xs: 450, md: 400 },
                  lineHeight: { xs: 1.4, md: 1.4 },
                }}
              >
                {t('hero.title')}
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
                {t('hero.subtitle')}{" "}
                <span
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(45deg, #FFF500, #FF2CAD)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "exWave 1.8s ease-in-out infinite",
                  }}
                >
                  {t('hero.excellence')}
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
                {t('hero.description')}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 1, md: 2 },
                  flexWrap: "wrap",
                  animation: "slideInLeft 1s ease-out 0.6s both",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => scrollToSection("#pricing")}
                  aria-label="Start your digital journey"
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(45deg, #484be2ff, #ec4899)",
                    borderRadius: "25px",
                    px: { xs: 1.5, sm: 3, md: 4 },
                    py: { xs: 1.5, sm: 1, md: 1.5 },
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    fontWeight: 600,
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "200%",
                      height: "100%",
                      transform: "skewX(-20deg)",
                    },
                    "&:hover": {
                      transform: "translateY(-2px) scale(1.05)",
                      boxShadow: "0px 15px 35px rgba(74, 74, 110, 1)",
                    },
                  }}
                >
                  {t('hero.startJourney')}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollToSection("#ourprojects")}
                  aria-label="Explore our creations"
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
                  {t('hero.exploreCreations')}
                </Button>
              </Box>
            </Grid>

            {/* RIGHT: Quick Facts */}
            <Grid item xs={12} md={6}>
              <Fade in={fadeIn} timeout={1000} style={{ transitionDelay: "0.3s" }}>
                <Paper
                  elevation={10}
                  sx={{
                    p: { xs: 1.25, sm: 3, md: 4 },
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    animation: "slideInRight 1s ease-out 0.5s both",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ mb: { xs: 1, sm: 2, md: 3 }, color: "text.primary", fontWeight: 600 }}
                  >
                    {t('hero.quickFacts')}
                  </Typography>
                  <Grid container spacing={{ xs: 0.5, sm: 2, md: 3 }} columnSpacing={{ xs: 0.5, sm: 2, md: 3 }}>
                    {STATS.map((stat) => (
                      <Grid item xs={4} sm={4} md={4} key={stat.label}>
                        <Box
                          sx={{
                            textAlign: "center",
                            p: { xs: 1, sm: 2 },
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                            },
                          }}
                        >
                          <stat.icon sx={{ fontSize: 34, color: stat.color, mb: 1 }} />
                          <Typography
                            variant="h4"
                            sx={{ fontWeight: 700, color: stat.color, mb: 0.5, fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.75rem" } }}
                          >
                            <CountUp value={stat.value} />+
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, fontSize: { xs: "0.75rem", sm: "0.75rem", md: "0.80rem" } }}>
                            {t(`hero.stats.${stat.label.toLowerCase().replace(' ', '')}`)}
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
      <Box
        component="img"
        src={homepage2}
        alt="Hero"
        sx={{
          position: { xs: "relative", md: "absolute" },
          top: { xs: "auto", md: "70%" },
          right: { xs: "auto", md: 60 },
          transform: imageJump ? { xs: "translateY(0)", md: "translateY(-50%)" } : { xs: "translateY(0)", md: "translateY(-30%)" },
          width: { xs: "100%", md: "35%" },
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
              ? { xs: "translateY(0)", md: "translateY(-52%) scale(1.05) rotate3d(1,1,0,6deg)" }
              : { xs: "translateY(0)", md: "translateY(-32%) scale(1.05) rotate3d(1,1,0,6deg)" },
          },
        }}
      />

      {/* Floating slogan near image */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "69%", md: "36%" },
          right: { xs: "5%", md: "6%" },
          mt: { xs: 3, md: 0 },
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: { xs: "blur(100px)", md: "blur(20px)" },
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
          px: { xs: 3, md: 5 },
          py: { xs: 2, md: 3 },
          color: "white",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
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
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.50rem" },
          }}
        >
          {t('hero.slogan')}
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
            @keyframes exWave {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
          }
          }
        `}
      </style>
    </Box>
  );
}
