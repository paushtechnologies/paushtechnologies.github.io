import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { COMPANY_NAME } from "../data/constants";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleSubscribe = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail.test(email)) {
      setMessage("❌ Please enter a valid email address.");
      setSuccess(false);
      return;
    }
    setMessage("🎉 Subscribed successfully!");
    setSuccess(true);
    setEmail("");
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
        color: "white",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 20 },
      }}
    >
      <Container maxWidth="xl">
        {/* MAIN SPLIT: LEFT & RIGHT */}
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start" justifyContent="space-between">
          {/* ================= LEFT SECTION ================= */}
          <Grid item xs={12} md={5}>
            <Typography
              variant="h4"
              sx={{
                mb: { xs: 1.5, md: 2.5 },
                fontWeight: 700,
                display: "inline-block",
                position: "relative",
                background: "linear-gradient(45deg, #6366f1, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                overflow: "hidden",
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                  animation: "shine 4s ease-in-out infinite",
                },
                "@keyframes shine": {
                  "0%": { left: "-100%" },
                  "100%": { left: "100%" },
                },
              }}
            >
              {COMPANY_NAME}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: { xs: 1.5, md: 2 },
                opacity: 0.9,
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                lineHeight: 1.6,
              }}
            >
              {t('footer.tagline')}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: { xs: 2, md: 3 },
                opacity: 0.8,
                display: { xs: "none", md: "block" },
                fontSize: "0.90rem",
                lineHeight: 1.75,
                color: "rgba(255, 255, 255, 0.85)",
              }}
            >
              With a deep understanding of modern frameworks, cloud-based
              architectures, and user-centric design,<br></br> we transform
              complex ideas into seamless digital experiences. From concept to
              deployment, our solutions <br></br>are built with precision,
              security, and long-term scalability in mind.We transform
              businesses through <br></br> innovative digital ecosystems that
              drive unprecedented growth.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Box
                sx={{
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "#818cf8" }
                }}
                onClick={() => {
                  navigator.clipboard.writeText("+919456644264");
                  setMessage("Phone number copied");
                  setSuccess(true);
                  setTimeout(() => setMessage(""), 3000);
                }}
              >
                📞 +91 9456644264
              </Box>

              <Box
                sx={{
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "#818cf8" }
                }}
                onClick={() => {
                  navigator.clipboard.writeText("paushtechnologies@gmail.com");
                  setMessage("Email copied");
                  setSuccess(true);
                  setTimeout(() => setMessage(""), 3000);
                }}
              >
                ✉️ paushtechnologies@gmail.com
              </Box>
            </Box>
          </Grid>

          {/* ================= RIGHT SECTION ================= */}
          <Grid item xs={12} md={7}>
            <Grid container direction="column" spacing={4}>
              {/* ---------- UP SECTION (Links) ---------- */}
              <Grid item>
                <Grid container spacing={{ xs: 3, md: 4 }}>
                  {/* Innovation Hub */}
                  <Grid item xs={6} md={3}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        fontSize: { xs: "1rem", md: "1.15rem" },
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t('footer.innovationHub')}
                    </Typography>

                    <List sx={{ p: 0 }}>
                      {[
                        { label: t('nav.home'), id: "#home" },
                        { label: t('nav.services'), id: "#services" },
                        { label: t('nav.pricing'), id: "#pricing" },
                        { label: t('nav.contact'), id: "#contact" },
                      ].map((link, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            p: 0,
                            mb: 1,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              color: "#818cf8",
                              transform: "translateX(5px)"
                            }
                          }}
                          onClick={() => scrollToSection(link.id)}
                        >
                          {link.label}
                        </ListItem>
                      ))}
                    </List>
                  </Grid>

                  {/* Resources */}
                  <Grid item xs={6} md={3}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        fontSize: { xs: "1rem", md: "1.15rem" },
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t('footer.resources')}
                    </Typography>

                    <List sx={{ p: 0 }}>
                      {[
                        t('footer.privacyPolicy'),
                        t('footer.termsOfService'),
                        t('footer.innovationBlog'),
                        t('footer.caseStudies'),
                      ].map((item, i) => (
                        <ListItem
                          key={i}
                          sx={{
                            p: 0,
                            mb: 1,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              color: "#818cf8",
                              transform: "translateX(5px)"
                            }
                          }}
                        >
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Grid>

              {/* ---------- DOWN SECTION (Subscribe) ---------- */}
              <Grid item>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {t('footer.stayUpdated')}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, maxWidth: 420 }}>
                  <TextField
                    placeholder={t('footer.enterEmail')}
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        backgroundColor: "rgba(255,255,255,0.05)",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSubscribe}
                    sx={{
                      background: "linear-gradient(45deg, #6366f1, #ec4899)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                      }
                    }}
                  >
                    🚀
                  </Button>
                </Box>

                {message && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: success ? "#22c55e" : "#f87171" }}
                  >
                    {message}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* FOOTER BOTTOM */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            mt: 5,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {t('footer.copyright')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
