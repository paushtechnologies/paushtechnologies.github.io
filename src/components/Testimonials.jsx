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
import { TESTIMONIALS } from "../data/testimonials";

export default function TestimonialsSection() {
  return (
    <Box sx={{ py: 8, background: "white" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" sx={{ mb: 2, color: "text.primary" }}>
            What Our Clients Say
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Don't just take our word for it - hear from our satisfied clients
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {TESTIMONIALS.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: "100%", borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{ color: "#fbbf24", fontSize: 20 }}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, fontStyle: "italic" }}
                  >
                    "{testimonial.quote}"
                  </Typography>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {testimonial.company}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}