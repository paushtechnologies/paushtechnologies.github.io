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
  Select,
  FormControl,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import { COMPANY_NAME } from "../data/constants";
import logo from "../assets/logo.png";
import ContactWizardModal from "./ContactWizardModal";
import { useLanguage } from "../context/LanguageContext";

export default function NavBar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const isLangMenuOpen = Boolean(langAnchorEl);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी' },
    { code: 'lus', name: 'Mizo', nativeName: 'Mizo ṭawng' },
  ];

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText("+91 9456644264");
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
    }
  };

  const handleMenuItemClick = (id) => {
    setMenuAnchorEl(null); // close menu
    handleScroll(id); // then scroll
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
            mx: "auto",
            width: "fit-content",
            px: { xs: 0, md: 0 },
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
              px: { xs: 1, md: 0 },
              transition: "all 0.4s ease",
            }}
          >
            <Toolbar
              sx={{
                justifyContent: "space-between",
                alignItems: "center",

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
                  mr: { xs: scrolled ? 12 : 16, md: scrolled ? 16 : 32 },
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
                      width: { xs: "25px", md: "30px" },
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
                          xs: 0.2,
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
                          xs: "0.6rem",
                          sm: "0.70rem",
                          md: "0.75rem",
                        },
                        lineHeight: { xs: 0.85, md: 1 },
                        letterSpacing: { xs: 0.05, md: 0.1 },
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
                  { label: t('nav.home'), id: "home" },
                  { label: t('nav.services'), id: "services" },
                  { label: t('nav.pricing'), id: "pricing" },
                  { label: t('nav.about'), id: "about" },
                  { label: t('nav.contact'), id: "contact" },
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
                  variant="outlined"
                  onClick={() => setWizardOpen(true)}
                  sx={{
                    borderColor: "#6366f1",
                    color: "#6366f1",
                    borderRadius: "25px",
                    px: 2,
                    py: 0,
                    fontWeight: 700,
                    textTransform: "capitalize",
                    "&:hover": {
                      borderColor: "#4f46e5",
                      background: "rgba(99, 102, 241, 0.05)",
                    }
                  }}
                >
                  {t('nav.getQuote')}
                </Button>

                {/* Language Selector */}
                <IconButton
                  onClick={(e) => setLangAnchorEl(e.currentTarget)}
                  sx={{
                    color: "#6366f1",
                    "&:hover": {
                      background: "rgba(99, 102, 241, 0.05)",
                    }
                  }}
                >
                  <LanguageIcon />
                </IconButton>

                <Button
                  variant="contained"
                  onClick={copyPhoneNumber}
                  sx={{
                    background: "linear-gradient(45deg, #6366f1, #ec4899)",
                    borderRadius: "25px",
                    px: 2,
                    py: 0,
                    color: "#fff",
                    fontWeight: 600,
                    letterSpacing: 0.7,
                    whiteSpace: "nowrap",
                    textTransform: "capitalize"
                  }}
                >
                  {t('nav.call')}
                </Button>
              </Box>

              {/* Mobile Icons */}
              <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 0.5 }}>
                <IconButton
                  onClick={(e) => setLangAnchorEl(e.currentTarget)}
                  sx={{
                    color: "#6366f1",
                    height: 32,
                    width: 32,
                    p: 0.5,
                  }}
                >
                  <LanguageIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    p: 0.5,
                    height: 32,
                    width: 32,
                  }}
                  onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
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
            { label: t('nav.home'), id: "home" },
            { label: t('nav.services'), id: "services" },
            { label: t('nav.pricing'), id: "pricing" },
            { label: t('nav.about'), id: "about" },
            { label: t('nav.contact'), id: "contact" },
          ].map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
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

        {/* Language Selector Menu */}
        <Menu
          anchorEl={langAnchorEl}
          open={isLangMenuOpen}
          onClose={() => setLangAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            "& .MuiPaper-root": {
              mt: 1,
              minWidth: 180,
              maxHeight: 400,
              borderRadius: "16px",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
            },
          }}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setLangAnchorEl(null);
              }}
              selected={language === lang.code}
              sx={{
                fontWeight: language === lang.code ? 700 : 500,
                borderRadius: "10px",
                mx: 1,
                my: 0.5,
                backgroundColor: language === lang.code ? "rgba(99, 102, 241, 0.1)" : "transparent",
                "&:hover": {
                  backgroundColor: language === lang.code ? "rgba(99, 102, 241, 0.15)" : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              {lang.nativeName}
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
          {t('nav.phoneCopied')}
        </Alert>
      </Snackbar>

      <ContactWizardModal
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        phoneNumber="+919456644264"
      />
    </>
  );
}
