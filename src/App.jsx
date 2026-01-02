// App.jsx
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import ServicesSection from "./components/Services";
import PricingSection from "./components/Pricing";
import ContactSection from "./components/Contact";
import Footer from "./components/Footer";
import AboutSection from "./components/About";
import TestimonialsSection from "./components/Testimonials";
import OurProjects from "./components/OurProjects";
import FloatingContact from "./components/FloatingContact";

const theme = createTheme({
  palette: {
    primary: { main: "#6366f1" },
    secondary: { main: "#ec4899" },
    background: { default: "#fafafa" },
  },
  typography: {
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div style={{ scrollBehavior: "smooth", overflowX: "hidden" }}>
        <section id="home">
          <Hero />
        </section>

        <section id="services">
          <ServicesSection />
        </section>

        <section id="pricing">
          <PricingSection />
        </section>

        <section id="ourprojects">
          <OurProjects />
        </section>

        <section id="testimonials">
          <TestimonialsSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>

        <Footer />
      </div>
      <FloatingContact />
    </ThemeProvider>
  );
}
