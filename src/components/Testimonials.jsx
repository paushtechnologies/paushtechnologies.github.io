import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useLanguage } from "../context/LanguageContext";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "./ScrollAnimation";

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const testimonials = t('testimonials.items');
  const items = Array.isArray(testimonials) ? testimonials : [];

  return (
    <Box sx={{ py: 8, background: "white" }}>
      <Container maxWidth="lg">
        <ScrollAnimation>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                mb: 2, color: "text.primary",
                fontSize: { xs: "2rem", md: "3rem" }
              }}>
              {t('testimonials.title')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.85rem", md: "1.25rem" }
              }}>
              {t('testimonials.subtitle')}
            </Typography>
          </Box>
        </ScrollAnimation>

        <StaggerContainer>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {items.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <StaggerItem>
                  <Card sx={{ height: "100%", borderRadius: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", mb: 2 }}>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            sx={{ color: "#fbbf24", fontSize: 20 }}
                          />
                        ))}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 3,
                          fontStyle: "italic",
                          fontSize: { xs: "0.85rem", md: "1rem" }
                        }}
                      >
                        "{testimonial.quote}"
                      </Typography>
                      <Box>
                        <Typography variant="h6"
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: "1rem", md: "1.25rem" }
                          }}>
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.85rem", md: "1rem" }
                          }}
                        >
                          {testimonial.company}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>
      </Container>
    </Box>
  );
}