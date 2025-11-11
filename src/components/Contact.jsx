import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { GOOGLE_SCRIPT_URL } from "../data/constants";
import customercare from "../assets/customer-care.jpg";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setSnack({
        open: true,
        severity: "error",
        message: "Please verify reCAPTCHA.",
      });
      return;
    }

    try {
      // Send data to your Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // required for Apps Script CORS behavior
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // no-cors response is opaque, so assume success
      setSnack({
        open: true,
        severity: "success",
        message: "Submitted successfully!",
      });

      setForm({ name: "", email: "", phone: "", message: "" });
      setRecaptchaToken(null);
    } catch (err) {
      console.error("Submission error:", err);
      setSnack({
        open: true,
        severity: "error",
        message: "Submission failed. Please try again.",
      });
    }
  };

  return (
    <Box sx={{ 
      py: { xs: 4, md: 8 }, 
      background: "linear-gradient(135deg,#f9fafb,#eef2ff)" 
      }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{ 
          textAlign: "center", 
          fontWeight: 700, 
          mb: { xs: 0.5, md: 1 },
          fontSize: { xs: "2rem", md: "3rem" } }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="h6"
          sx={{ 
          textAlign: "center", 
          mb: { xs: 1, md: 2 }, 
          color: "text.secondary",
          fontSize: { xs: "1rem", md: "1.25rem" } }}
        >
          Have an idea or project in mind? Fill the form below and we’ll get
          back to you.
        </Typography>

        <Grid
          container
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
          }}
        >
          {/* Left: Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: { xs: 2, md: 2 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: "100%", maxWidth: 520 }}
            >
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Phone No."
                name="phone"
                value={form.phone}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={3}
                value={form.message}
                onChange={handleChange}
                margin="normal"
                required
              />

              {/* reCAPTCHA */}
              <Box sx={{ mt: 2, display: "flex", justifyContent: "left" }}>
                <ReCAPTCHA
                  sitekey="6LfF8_krAAAAAH4la8Gxl_HwY-mkJjhNa5UlkvWB"
                  onChange={(token) => setRecaptchaToken(token)}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 700,
                  borderRadius: "30px",
                  background: "linear-gradient(45deg, #2563eb, #10b981)",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 10px 25px rgba(37,99,235,0.3)",
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>

          {/* Right: Image (separate grid item for better stacking on mobile) */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "center",
              p: { xs: 1, md: 2 },
              // background: { xs: "transparent", md: "linear-gradient(135deg,#fff,#eef2ff)" },
            }}
          >
            <Box
              component="img"
              src={customercare}
              alt="Contact Us"
              sx={{
                width: { xs: "100%", md: "100%" },
                maxWidth: 520,
                height: { xs: "auto", md: "100%" },
                objectFit: "cover",
                borderRadius: { xs: "20px", md: "30px" },
                display: "block",
              }}
            />
          </Grid>
        </Grid>

        {/* Snackbar for success/error */}
        <Snackbar
          open={snack.open}
          autoHideDuration={5000}
          onClose={() => setSnack({ ...snack, open: false })}
        >
          <Alert severity={snack.severity}>{snack.message}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
