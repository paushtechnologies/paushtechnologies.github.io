import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Zoom,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { PRICING_PLANS } from "../data/pricing";

export default function PricingSection() {
  return (
    <Box sx={{ py: 8, background: "white" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" sx={{ mb: 2, color: "text.primary" }}>
            Plans & Pricing
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", maxWidth: 800, mx: "auto" }}
          >
            We are among India's best web solution companies committed to
            offering full ROI-driven customized web services at affordable
            prices.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {PRICING_PLANS.map((plan, index) => (
            <Grid item xs={12} md={4} key={plan.name}>
              <Zoom in timeout={500 + index * 200}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    position: "relative",
                    border: plan.popular
                      ? "2px solid #10b981"
                      : "1px solid #e2e8f0",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  {plan.popular && (
                    <Chip
                      label="Most Popular"
                      color="success"
                      sx={{
                        position: "absolute",
                        top: -10,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontWeight: 600,
                      }}
                    />
                  )}

                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
                    >
                      {plan.name}
                    </Typography>

                    <Box sx={{ textAlign: "center", mb: 3 }}>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "primary.main" }}
                      >
                        {plan.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        ( + 18% Digital Services Fee )
                      </Typography>
                    </Box>

                    <List sx={{ mb: 3 }}>
                      {plan.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckIcon
                              sx={{ color: "success.main", fontSize: 20 }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{ fontSize: "0.9rem" }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      fullWidth
                      variant={plan.popular ? "contained" : "outlined"}
                      size="large"
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 600,
                        background: plan.popular
                          ? "linear-gradient(45deg, #10b981, #059669)"
                          : undefined,
                      }}
                    >
                      Call Now
                    </Button>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}