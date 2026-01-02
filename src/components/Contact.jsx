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
import { useLanguage } from "../context/LanguageContext";
import customercare from "../assets/customer-care.jpg";
import { ScrollAnimation, fadeInLeft, fadeInRight } from "./ScrollAnimation";

export default function ContactSection() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Website", // default
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
        message: t('contact.captchaError'),
      });
      return;
    }

    try {
      // Send data to your Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          message: `[Project Type: ${form.projectType}] ${form.message}`
        }),
      });

      // no-cors response is opaque, so assume success
      setSnack({
        open: true,
        severity: "success",
        message: t('contact.successMessage'),
      });

      setForm({ name: "", email: "", phone: "", message: "" });
      setRecaptchaToken(null);
    } catch (err) {
      console.error("Submission error:", err);
      setSnack({
        open: true,
        severity: "error",
        message: t('contact.errorMessage'),
      });
    }
  };

  return (
    <Box sx={{
      py: { xs: 4, md: 8 },
      background: "linear-gradient(135deg,#f9fafb,#eef2ff)"
    }}>
      <Container maxWidth="lg">
        <ScrollAnimation>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              mb: { xs: 0.5, md: 1 },
              fontSize: { xs: "2rem", md: "3rem" }
            }}
          >
            {t('contact.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: { xs: 1, md: 2 },
              color: "text.secondary",
              fontSize: { xs: "0.9rem", md: "1.25rem" }
            }}
          >
            {t('contact.subtitle')}
          </Typography>
        </ScrollAnimation>

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
            <ScrollAnimation variant={fadeInLeft} delay={0.2}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%", maxWidth: 520 }}
              >
                {/* <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 700, color: "text.secondary" }}>
                  {t('contact.interestedIn')}
                </Typography>
                <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
                  {[
                    { id: "Website", label: t('contact.website') },
                    { id: "App", label: t('contact.app') },
                    { id: "Both", label: t('contact.both') },
                  ].map((opt) => (
                    <Box
                      key={opt.id}
                      onClick={() => setForm({ ...form, projectType: opt.id })}
                      sx={{
                        flex: 1,
                        py: 1.2,
                        textAlign: "center",
                        cursor: "pointer",
                        borderRadius: "12px",
                        border: "2px solid",
                        borderColor: form.projectType === opt.id ? "primary.main" : "rgba(0,0,0,0.08)",
                        background: form.projectType === opt.id ? "rgba(99, 102, 241, 0.08)" : "white",
                        transition: "all 0.2s ease",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: form.projectType === opt.id ? "primary.main" : "text.secondary",
                        "&:hover": {
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      {opt.label}
                    </Box>
                  ))}
                </Box> */}
                <TextField
                  fullWidth
                  label={t('contact.fullName')}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label={t('contact.email')}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label={t('contact.phoneNo')}
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label={t('contact.message')}
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
                  {t('contact.sendMessage')}
                </Button>
              </Box>
            </ScrollAnimation>
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
            <ScrollAnimation variant={fadeInRight} delay={0.3}>
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
            </ScrollAnimation>
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
