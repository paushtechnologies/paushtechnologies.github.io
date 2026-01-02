import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { COMPANY_NAME } from "../data/constants";
import { useLanguage } from "../context/LanguageContext";
import { ScrollAnimation, fadeInLeft, fadeInRight } from "./ScrollAnimation";

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: "#f8fafc" }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 2, md: 6 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <ScrollAnimation variant={fadeInLeft}>
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  color: "text.primary",
                  fontSize: { xs: "1.5rem", md: "2.25rem" }
                }}
              >
                {t('about.title').replace('PAUSH Technologies', COMPANY_NAME)}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  color: "text.secondary",
                  fontSize: { xs: "0.85rem", md: "1.25rem" }
                }}
              >
                {t('about.subtitle')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: "text.secondary",
                  fontSize: { xs: "0.75rem", md: "1rem" }
                }}
              >
                {t('about.mission')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "text.secondary",
                  fontSize: { xs: "0.75rem", md: "1rem" }
                }}
              >
                {t('about.vision')}
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(45deg, #6366f1, #ec4899)",
                  borderRadius: "25px",
                  px: { xs: 2, md: 4 },
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: { xs: "0.75rem", md: "1rem" },
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: "0 15px 35px rgba(99, 102, 241, 0.3)",
                  },
                }}
              >
                {t('about.discoverStory')}
              </Button>
            </ScrollAnimation>
          </Grid>
          <Grid item xs={12} md={6}>
            <ScrollAnimation variant={fadeInRight} delay={0.2}>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "105%",
                    height: { xs: 200, md: 400 },
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
                    <Typography variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: { xs: "1.25rem", md: "2.25rem" }
                      }}>
                      {t('about.aiPowered')}
                    </Typography>
                    <Typography variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: { xs: "1.25rem", md: "2.25rem" }
                      }}>
                      {t('about.blockchainEnabled')}
                    </Typography>
                    <Typography variant="h4"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.25rem", md: "2.25rem" }
                      }}>
                      {t('about.cloudNative')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ScrollAnimation>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}