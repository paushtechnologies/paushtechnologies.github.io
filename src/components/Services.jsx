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
    title: "Digital Transformation",
    description:
      "Revolutionize your business with next-gen digital solutions transforming traditional workflows into modern, scalable systems.",
    icon: WebIcon,
    color: "#6366f1",
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture",
    description:
      "Design and deploy secure, scalable, and high-performance cloud solutions on AWS, Azure, and GCP.",
    icon: CloudIcon,
    color: "#ec4899",
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    description:
      "Automate, optimize, and innovate with AI-driven systems that work intelligently around the clock.",
    icon: AutoAwesomeIcon,
    color: "#10b981",
  },
  {
    id: "blockchain-tech",
    title: "Blockchain Technology",
    description:
      "Empower your ecosystem with decentralized apps, smart contracts, and blockchain integrations.",
    icon: CurrencyBitcoinIcon,
    color: "#8b5cf6",
  },
  {
    id: "mobile-innovation",
    title: "Mobile Innovation",
    description:
      "Create stunning mobile experiences that delight users and boost engagement on every platform.",
    icon: SmartphoneIcon,
    color: "#f59e0b",
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    description:
      "Protect your data and infrastructure with enterprise-grade cyber defense and monitoring solutions.",
    icon: SecurityIcon,
    color: "#ef4444",
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence",
    description:
      "Transform raw data into actionable insights using analytics, AI, and data visualization tools.",
    icon: BusinessIcon,
    color: "#06b6d4",
  },
  {
    id: "tech-consulting",
    title: "Tech Consulting",
    description:
      "Strategic technology advice to help your business scale smarter, faster, and more efficiently.",
    icon: SupportAgentIcon,
    color: "#f97316",
  },
];

export default function ServicesSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: "#f8fafc" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 2, md: 4 } }}>
          <Typography
            variant="h3"
            sx={{
              // fontWeight: 700,
              mb: { xs: 0.5, md: 1 },
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Our Services
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
            We build world-class web, mobile, and cloud solutions that empower
            brands to achieve more — smartly, beautifully, and efficiently.
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          alignItems="stretch"
          justifyContent="center"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Grid item xs={4} sm={6} md={4} lg={3} key={service.id}>
                <Card
                  sx={{
                    width: { xs: "130px", sm: "180px", md: "100%" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    height: { xs: 200, md: 300 },
                    borderRadius: 4,
                    overflow: "hidden",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    background: `${service.color}10`,
                    color: "#111",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.6s ease",
                    // marginBottom: 1,

                    // ✅ Prevent text selection on mobile
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    MsUserSelect: "none",

                    "&:hover": {
                      background: `linear-gradient(135deg, ${service.color}40, ${service.color})`,
                      color: "#fff",
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    },

                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: -40,
                      left: -40,
                      width: 200,
                      height: 200,
                      background: `radial-gradient(circle at center, ${service.color}22, transparent 70%)`,
                      zIndex: 0,
                      pointerEvents: "none", // ✅ prevents affecting layout
                      transition: "all 0.6s ease",
                    },

                    "&:hover .icon-box, &:hover .title-text": {
                      opacity: 0,
                      transform: "translateY(-20px)",
                    },
                    "&:hover .desc-overlay": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      p: { xs: 1, sm: 3, md: 4 },
                      transition: "all 0.6s ease",
                      // overflowY: "auto",
                    }}
                  >
                    {/* Icon */}
                    <Box
                      className="icon-box"
                      sx={{
                        width: 76,
                        height: 76,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${service.color}, ${service.color}90)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        mb: 2,
                        fontSize: 36,
                        transition: "all 0.6s ease",
                      }}
                    >
                      <Icon sx={{ fontSize: 36 }} />
                    </Box>

                    {/* Title */}
                    <Typography
                      className="title-text"
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        transition: "all 0.6s ease",
                        fontSize: {
                          xs: "1.00rem", // small on phones
                          sm: "1.05rem", // slightly bigger on small tablets
                          md: "1.15rem", // normal desktop size
                          lg: "1.25rem", // larger on large monitors
                        },
                      }}
                    >
                      {service.title}
                    </Typography>

                    {/* Invisible overlay description centered on hover */}
                    <Box
                      className="desc-overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: { xs: 2, md: 4 },
                        textAlign: "center",
                        zIndex: 3,
                        opacity: 0,
                        transform: "translateY(20px)",
                        transition: "all 0.6s ease",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "inherit",
                          maxWidth: 360,
                          fontSize: { xs: "0.75rem", md: "1.05rem" }, // slightly larger on desktop
                          lineHeight: 1.6,
                          fontWeight: 500,
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
