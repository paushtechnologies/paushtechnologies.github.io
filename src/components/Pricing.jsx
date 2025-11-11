import React, { useState } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { PRICING_PLANS } from "../data/pricing";

export default function PricingSection() {
  const [copyAlert, setCopyAlert] = useState(false);

  const copyNumber = () => {
    navigator.clipboard.writeText("+91 8076864264");
    setCopyAlert(true);
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        background: "white",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              color: "text.primary",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Plans & Pricing
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: 800,
              mx: "auto",
              fontSize: { xs: "0.85rem", md: "1.2rem" },
            }}
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
                        top: -7,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontWeight: 600,
                      }}
                    />
                  )}

                  <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: { xs: 1, md: 2 },
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      {plan.name}
                    </Typography>

                    <Box sx={{ textAlign: "center", mb: { xs: 1, md: 3 } }}>
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

                    <List sx={{ mb: { xs: 1, md: 3 } }}>
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

                    {/* ✅ Updated Button with copy functionality */}
                    <Button
                      fullWidth
                      variant={plan.popular ? "contained" : "outlined"}
                      size="large"
                      onClick={copyNumber}
                      sx={{
                        borderRadius: 2,
                        py: { xs: 0.75, md: 1.5 },
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

        {/* ✅ Snackbar for “Phone number copied!” */}
        <Snackbar
          open={copyAlert}
          autoHideDuration={2000}
          onClose={() => setCopyAlert(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setCopyAlert(false)}
            severity="success"
            variant="filled"
            sx={{
              width: "100%",
              backgroundColor: "#d1fae5", // ✅ Pastel green
              color: "#065f46", // darker green text for contrast
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            Phone number copied!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
