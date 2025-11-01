// NavBar.jsx
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { COMPANY_NAME } from "../data/constants";
import logo from "../assets/logo.png";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        transition: "all 0.5s ease",
        background: scrolled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,1)",
        backdropFilter: "blur(4px)",
        boxShadow: scrolled
          ? "0 4px 20px rgba(0,0,0,0.08)"
          : "0 1px 10px rgba(0,0,0,0.02)",
        height: scrolled ? 55 : 60,
      }}
    >
      <Container maxWidth="xl" sx={{ transition: "all 0.4s ease" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo Section */}
          <Box
            onClick={() => handleScroll("home")}
            mt={scrolled ? 0 : 0.35}
            ml={scrolled ? 8 : 16}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              transition: "all 0.5s ease",
              cursor: "pointer",
            }}
          >
            <Box display="flex" alignItems="center">
              <Box
                component="img"
                src={logo}
                alt="PT"
                sx={{ height: 30, width: 35 }}
              />
              <Box
                ml={0}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height={35}
                textAlign="center"
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1,
                    fontSize: "1.25rem",
                    opacity: scrolled ? 0 : 1,
                    transform: scrolled ? "translateY(-10px)" : "translateY(0)",
                    letterSpacing: 0.2,
                    transition: "all 0.4s ease",
                  }}
                >
                  PAUSH
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: "rgba(15,23,42,0.8)",
                    fontSize: "0.75rem",
                    transition: "all 0.4s ease",
                    opacity: scrolled ? 0 : 1,
                    transform: scrolled ? "translateY(-10px)" : "translateY(0)",
                    lineHeight: 1,
                    letterSpacing: 0.075,
                  }}
                >
                  TECHNOLOGIES
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          <Box
            mr={scrolled ? 0 : 5}
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              transition: "all 0.5s ease",
            }}
          >
            {[
              { label: "Home", id: "home" },
              { label: "Services", id: "services" },
              { label: "Pricing", id: "pricing" },
              { label: "About", id: "about" },
              { label: "Contact Us", id: "contact" },
            ].map((item, i) => (
              <Button
                key={i}
                onClick={() => handleScroll(item.id)}
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                  transition: "color 0.3s",
                  "&:hover": { color: "#2563eb" },
                }}
              >
                {item.label}
              </Button>
            ))}

            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #6366f1, #ec4899)",
                borderRadius: "25px",
                px: 3,
                fontWeight: 600,
              }}
            >
              Call: +91 8076864264
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Dialog
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        fullScreen
        sx={{ "& .MuiDialog-paper": { background: "white" } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            {COMPANY_NAME}
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <List>
            {["Home", "Services", "Pricing", "About", "Contact"].map(
              (item, i) => (
                <ListItem
                  key={i}
                  button
                  onClick={() => handleScroll(item.toLowerCase())}
                >
                  <ListItemText primary={item} />
                </ListItem>
              )
            )}
          </List>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
