// ServicesSection.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "./ScrollAnimation";
import { useLanguage } from "../context/LanguageContext";

import WebIcon from "@mui/icons-material/Web";
import CloudIcon from "@mui/icons-material/Cloud";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import SecurityIcon from "@mui/icons-material/Security";
import BusinessIcon from "@mui/icons-material/Business";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const SERVICES = [
  {
    id: "digital-transformation",
    titleKey: 'services.digitalTransformation',
    descriptionKey: 'services.digitalTransformationDesc',
    icon: WebIcon,
    color: "#6366f1",
  },
  {
    id: "cloud-architecture",
    titleKey: 'services.cloudArchitecture',
    descriptionKey: 'services.cloudArchitectureDesc',
    icon: CloudIcon,
    color: "#ec4899",
  },
  {
    id: "ai-automation",
    titleKey: 'services.aiAutomation',
    descriptionKey: 'services.aiAutomationDesc',
    icon: AutoAwesomeIcon,
    color: "#10b981",
  },
  {
    id: "blockchain-tech",
    titleKey: 'services.blockchainTech',
    descriptionKey: 'services.blockchainTechDesc',
    icon: CurrencyBitcoinIcon,
    color: "#8b5cf6",
  },
  {
    id: "mobile-innovation",
    titleKey: 'services.mobileInnovation',
    descriptionKey: 'services.mobileInnovationDesc',
    icon: SmartphoneIcon,
    color: "#f59e0b",
  },
  {
    id: "cyber-security",
    titleKey: 'services.cyberSecurity',
    descriptionKey: 'services.cyberSecurityDesc',
    icon: SecurityIcon,
    color: "#ef4444",
  },
  {
    id: "data-intelligence",
    titleKey: 'services.dataIntelligence',
    descriptionKey: 'services.dataIntelligenceDesc',
    icon: BusinessIcon,
    color: "#06b6d4",
  },
  {
    id: "tech-consulting",
    titleKey: 'services.techConsulting',
    descriptionKey: 'services.techConsultingDesc',
    icon: SupportAgentIcon,
    color: "#f97316",
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();
  const [activeCard, setActiveCard] = React.useState(null);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: "#f8fafc" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <ScrollAnimation>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 }, px: 2 }}>
            <Typography
              variant="h3"
              sx={{
                mb: { xs: 1, md: 2 },
                fontWeight: 700,
                fontSize: { xs: "1.75rem", md: "3rem" },
              }}
            >
              {t('services.title')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: 820,
                mx: "auto",
                fontWeight: 400,
                fontSize: { xs: "0.85rem", md: "1.25rem" },
              }}
            >
              {t('services.subtitle')}
            </Typography>
          </Box>
        </ScrollAnimation>

        <StaggerContainer>
          <Grid
            container
            spacing={{ xs: 1.5, sm: 2, md: 4 }}
            alignItems="stretch"
            justifyContent="center"
          >
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isCardActive = activeCard === service.id;

              return (
                <Grid item xs={6} sm={6} md={4} lg={3} key={service.id || index}>
                  <StaggerItem>
                    <Card
                      onClick={() => setActiveCard(activeCard === service.id ? null : service.id)}
                      aria-label={`${t(service.titleKey)} service`}
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        height: { xs: 190, sm: 220, md: 300 },
                        borderRadius: { xs: 3, md: 4 },
                        overflow: "hidden",
                        boxSizing: "border-box",
                        cursor: "pointer",
                        background: `${service.color}10`,
                        color: "#111",
                        border: `1px solid ${service.color}20`,
                        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        userSelect: "none",
                        WebkitUserSelect: "none",

                        "&:hover": {
                          background: { md: `linear-gradient(135deg, ${service.color}40, ${service.color})` },
                          color: { md: "#fff" },
                          transform: { md: "translateY(-8px)" },
                          boxShadow: { md: "0 20px 40px rgba(0,0,0,0.12)" },
                        },

                        ...(isCardActive && {
                          background: `linear-gradient(135deg, ${service.color}40, ${service.color})`,
                          color: "#fff",
                        }),

                        "&:hover .icon-box, &:hover .title-text": {
                          md: { opacity: 0, transform: "translateY(-20px)" },
                        },
                        "&:hover .desc-overlay": {
                          md: { opacity: 1, transform: "translateY(0)" },
                        },

                        ...(isCardActive && {
                          "& .icon-box, & .title-text": {
                            opacity: 0,
                            transform: "translateY(-20px)",
                          },
                          "& .desc-overlay": {
                            opacity: 1,
                            transform: "translateY(0)",
                          }
                        })
                      }}
                    >
                      <CardContent
                        sx={{
                          position: "relative",
                          zIndex: 2,
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          p: { xs: 2, md: 3 },
                          transition: "all 0.4s ease",
                        }}
                      >
                        {/* Icon */}
                        <Box
                          className="icon-box"
                          sx={{
                            width: { xs: 52, md: 76 },
                            height: { xs: 52, md: 76 },
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${service.color}, ${service.color}90)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            mb: 2,
                            transition: "all 0.4s ease",
                          }}
                        >
                          <Icon sx={{ fontSize: { xs: 26, md: 36 } }} />
                        </Box>

                        {/* Title */}
                        <Typography
                          className="title-text"
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            transition: "all 0.4s ease",
                            fontSize: {
                              xs: "0.85rem",
                              md: "1.15rem",
                            },
                          }}
                        >
                          {t(service.titleKey)}
                        </Typography>

                        {/* Overlay description */}
                        <Box
                          className="desc-overlay"
                          sx={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: { xs: 2, md: 3 },
                            textAlign: "center",
                            zIndex: 3,
                            opacity: 0,
                            transform: "translateY(20px)",
                            transition: "all 0.4s ease",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: "inherit",
                              fontSize: { xs: "0.75rem", md: "1.05rem" },
                              lineHeight: 1.5,
                              fontWeight: 500,
                            }}
                          >
                            {t(service.descriptionKey)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                </Grid>
              );
            })}
          </Grid>
        </StaggerContainer>
      </Container>
    </Box>
  );
}
