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
  Snackbar,
  Alert,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { COMPANY_NAME } from "../data/constants";
import logo from "../assets/logo.png";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText("+91 8076864264");
    setCopyAlert(true);
  };

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
    <>
      {/* Floating transparent wrapper */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "transparent",
          boxShadow: "none",
          top: 16,
        }}
      >
        {/* Centered floating pill */}
        <Box
          sx={{
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
            width: "fit-content",
            px: { xs: 1, md: 2 },
            borderRadius: "999px",
            transition: "all 0.5s ease",
            background: scrolled
              ? "rgba(255,255,255,0.5)"
              : "rgba(255,255,255,0.7)",
            backdropFilter: "blur(4px)",
            boxShadow: scrolled
              ? "0 4px 20px rgba(0,0,0,0.08)"
              : "0 1px 10px rgba(0,0,0,0.02)",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              px: { xs: 0, md: 2 },
              transition: "all 0.4s ease",
            }}
          >
            <Toolbar
              sx={{
                justifyContent: "space-between",

                // ✅ RESPONSIVE HEIGHT
                minHeight: {
                  xs: 40, // mobile
                  sm: 48, // tablet
                  md: 56, // desktop
                },

                // optional horizontal padding
                // px: { xs: 1, sm: 2, md: 3 },

                transition: "min-height 0.3s ease",
              }}
            >
              {/* Logo Section */}
              <Box
                onClick={() => handleScroll("home")}
                sx={{
                  mt: scrolled ? 0 : 0.35,
                  mr: { xs: scrolled ? 12 : 16, md: scrolled ? 24 : 32 },
                  ml: { xs: 0, md: 2 },
                  p: 0,
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
                    sx={{
                      height: {
                        xs: 26, // mobile
                        sm: 30, // tablet
                        md: 30, // desktop
                      },
                      width: "30px",
                      transition: "all 0.3s ease",
                    }}
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
                        fontSize: {
                          xs: "1rem",
                          sm: "1.1rem",
                          md: "1.25rem",
                        },
                        letterSpacing: {
                          xs: 0.5,
                          md: 0.2,
                        },
                        opacity: scrolled ? 0 : 1,
                        transform: scrolled
                          ? "translateY(-8px)"
                          : "translateY(0)",
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
                        fontSize: {
                          xs: "0.65rem",
                          sm: "0.70rem",
                          md: "0.75rem",
                        },
                        lineHeight: 1,
                        letterSpacing: {xs: 0.05, md: 0.1},
                        opacity: scrolled ? 0 : 1,
                        transform: scrolled
                          ? "translateY(-8px)"
                          : "translateY(0)",
                        transition: "all 0.4s ease",
                      }}
                    >
                      TECHNOLOGIES
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Desktop Navigation */}
              <Box
                mr={scrolled ? 0 : 0}
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
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                <Button
                  variant="contained"
                  onClick={copyPhoneNumber}
                  sx={{
                    background: "linear-gradient(45deg, #6366f1, #ec4899)",
                    borderRadius: "25px",
                    px: 2,
                    py: 0,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Call: +91 8076864264
                </Button>
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                sx={{ display: { xs: "block", md: "none" } }}
                onClick={(e) => setMenuAnchorEl(e.currentTarget)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </Box>

        {/* Mobile Drawer */}
        <Menu
          anchorEl={menuAnchorEl}
          open={isMenuOpen}
          onClose={() => setMenuAnchorEl(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            "& .MuiPaper-root": {
              mt: 1,
              minWidth: 160,
              borderRadius: "16px",
              background: "rgba(255,255,255,0.6)",
              // background: "linear-gradient(90deg,  #FDB4BF 0%,  #F5C9D8 25%,  #E8D3EB 50%,  #D6D9EB 75%,  #B2DCDD 100%)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
            },
          }}
        >
          {[
            { label: "Home", id: "home" },
            { label: "Services", id: "services" },
            { label: "Pricing", id: "pricing" },
            { label: "About", id: "about" },
            { label: "Contact Us", id: "contact" },
          ].map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => {
                handleScroll(item.id);
                setMenuAnchorEl(null);
              }}
              sx={{
                fontWeight: 500,
                borderRadius: "10px",
                mx: 1,
                my: 0.5,
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </AppBar>

      {/* Copy Alert */}
      <Snackbar
        open={copyAlert}
        autoHideDuration={2000}
        onClose={() => setCopyAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            backgroundColor: "#d1fae5",
            color: "#065f46",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          Phone number copied!
        </Alert>
      </Snackbar>
    </>
  );
}
