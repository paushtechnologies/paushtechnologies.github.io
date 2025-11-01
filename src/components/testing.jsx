import React, { useState } from "react";
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
  Box, // ✅ Added missing import
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "../data/constants";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "px solid rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box display="flex" alignItems="center">
              <Box
                component="img"
                src="src/assets/logo.png"
                alt="PAUSH Technologies"
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
                    color: "#1A1A1A", // deep black
                    lineHeight: 1,
                    fontSize: "1.5rem",
                  }}
                >
                  PAUSH
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 550,
                    color: "#1A1A1A",
                    lineHeight: 1,
                    fontSize: "0.8rem",
                  }}
                >
                  TECHNOLOGIES
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              component={Link}
              to="/"
              sx={{ color: "text.primary", fontWeight: 500 }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/services"
              sx={{ color: "text.primary", fontWeight: 500 }}
            >
              Services
            </Button>
            <Button
              component={Link}
              to="/pricing"
              sx={{ color: "text.primary", fontWeight: 500 }}
            >
              Pricing
            </Button>
            <Button
              component={Link}
              to="/about"
              sx={{ color: "text.primary", fontWeight: 500 }}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/contact"
              sx={{ color: "text.primary", fontWeight: 500 }}
            >
              Contact
            </Button>
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

          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

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
            <ListItem
              component={Link}
              to="/"
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              component={Link}
              to="/services"
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary="Services" />
            </ListItem>
            <ListItem
              component={Link}
              to="/pricing"
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary="Pricing" />
            </ListItem>
            <ListItem
              component={Link}
              to="/about"
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary="About" />
            </ListItem>
            <ListItem
              component={Link}
              to="/contact"
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}