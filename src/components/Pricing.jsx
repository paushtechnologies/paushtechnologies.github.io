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
import { ScrollAnimation, StaggerContainer, StaggerItem } from "./ScrollAnimation";
import { useLanguage } from "../context/LanguageContext";
import ContactWizardModal from "./ContactWizardModal";

export default function PricingSection() {
  const { t } = useLanguage();
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        background: "white",
      }}
    >
      <Container maxWidth="lg">
        <ScrollAnimation>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h3"
              sx={{
                mb: { xs: 1, md: 2 },
                color: "text.primary",
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              {t('pricing.title')}
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
              {t('pricing.subtitle')}
            </Typography>
          </Box>
        </ScrollAnimation>

        <StaggerContainer>
          <Grid
            container spacing={{ xs: 2, md: 4 }} justifyContent="center">
            {PRICING_PLANS.map((plan, index) => (
              <Grid item xs={12} md={4} key={plan.name}>
                <StaggerItem>
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
                        label={t('pricing.mostPopular')}
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

                    <CardContent
                      sx={{
                        px: { xs: 2, md: 4 },
                        py: { xs: 2, md: 4 }
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          mb: { xs: 0.5, md: 2 },
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        {t('pricing.plans.' + index + '.name')}
                      </Typography>

                      {/* <Box sx={{ textAlign: "center", mb: { xs: 1, md: 1 } }}>
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
                      </Box> */}

                      <List sx={{ mb: { xs: 0.5, md: 3 } }}>
                        {t('pricing.plans.' + index + '.features').map((feature, featureIndex) => (
                          <ListItem key={featureIndex} sx={{ px: 0, py: { xs: 0.2, md: 0.5 } }}>
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
                        onClick={() => setWizardOpen(true)}
                        sx={{
                          borderRadius: 2,
                          py: { xs: 0.75, md: 1.5 },
                          fontWeight: 600,
                          textTransform: "capitalize",
                          background: plan.popular
                            ? "linear-gradient(45deg, #10b981, #059669)"
                            : undefined,
                        }}
                      >
                        {t('pricing.getEstimate')}
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>

        <ContactWizardModal
          open={wizardOpen}
          onClose={() => setWizardOpen(false)}
          phoneNumber="+919456644264"
        />
      </Container>
    </Box>
  );
}
