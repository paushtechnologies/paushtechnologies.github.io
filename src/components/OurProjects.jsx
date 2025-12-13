// ProjectsCarousel.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ScrollAnimation } from "./ScrollAnimation";
import dashboard from "../assets/OurProjects/Alpha/dashboard.png";
import mindmart1 from "../assets/OurProjects/mindmart1.png";
import ledger from "../assets/OurProjects/Alpha/ledger.png";
import malicious2 from "../assets/OurProjects/MaliciousURL/2.png";
import malicious3 from "../assets/OurProjects/MaliciousURL/3.png";
import youtube1 from "../assets/OurProjects/YoutubeContent/1.png";


const PROJECTS = [
  {
    title: "Fintech Website",
    category: "Finance · Dashboard",
    img: dashboard,
    liveUrl: "https://app.alphacapitalclub.in/",
  },
  {
    title: "E-commerce Platform",
    category: "Online Store · Retail",
    img: mindmart1,
    liveUrl: "#",
  },
  {
    title: "Portfolio Tracker",
    category: "Ledger · Finance",
    img: ledger,
    liveUrl: "https://app.alphacapitalclub.in/",
  },
  {
    title: "Malicious URL Detector",
    category: "UI, AI, ML",
    img: malicious2,
    liveUrl: "#",
  },
  {
    title: "Chrome Extension",
    category: "AI, ML",
    img: malicious3,
    liveUrl: "#",
  },
  {
    title: "Enterprise Portal",
    category: "Enterprise · Platform",
    img: youtube1,
    liveUrl: "#",
  },
];

export default function ProjectsCarousel() {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const autoRef = useRef(null);

  // Responsive visible cards
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 720) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Helper: get inner flex container and its card elements
  const getCards = () => {
    const cont = containerRef.current;
    if (!cont) return null;
    // the structure we render: <div ref=containerRef> <div style="display:flex"> ...cards...</div> </div>
    const inner = cont.firstElementChild; // the flex wrapper
    if (!inner) return null;
    const cards = Array.from(inner.children);
    return { cont, inner, cards };
  };

  // Scroll to center selected card
  const centerItem = (targetIndex) => {
    const info = getCards();
    if (!info) return;
    const { cont, inner, cards } = info;
    const n = PROJECTS.length;
    const safeIndex = ((targetIndex % n) + n) % n;
    const item = cards[safeIndex];
    if (!item) return;

    // Compute scrollLeft such that item's center aligns with container center.
    const containerWidth = cont.clientWidth;
    // item.offsetLeft is relative to inner; inner is left-aligned within cont (padding accounted in inner)
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const scrollLeft = Math.max(0, itemCenter - containerWidth / 2);

    cont.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setIndex(safeIndex);
  };

  // autoplay
  useEffect(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % PROJECTS.length;
        centerItem(next);
        return next;
      });
    }, 3000);
    return () => clearInterval(autoRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perView]);

  // Center first item on mount / when perView changes
  useEffect(() => {
    // give DOM a beat to render
    const t = setTimeout(() => centerItem(index), 80);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perView]);

  const handlePrev = () => {
    const next = (index - 1 + PROJECTS.length) % PROJECTS.length;
    // stop autoplay so user sees manual result
    if (autoRef.current) clearInterval(autoRef.current);
    centerItem(next);
  };
  const handleNext = () => {
    const next = (index + 1) % PROJECTS.length;
    if (autoRef.current) clearInterval(autoRef.current);
    centerItem(next);
  };

  const circularDistance = (i, center) => {
    const n = PROJECTS.length;
    const d = Math.abs(i - center);
    return Math.min(d, n - d);
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: "#f8fafc",
      }}
      aria-label="Our Completed Projects"
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <ScrollAnimation>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h3"
              sx={{ mb: 1, fontSize: { xs: "1.6rem", md: "3rem" } }}
            >
              Our Completed Projects
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", maxWidth: 800, mx: "auto" }}
            >
              Exclusive, conversion-focused website designs — handcrafted for
              brands, SaaS, e-commerce and enterprise.
            </Typography>
          </Box>
        </ScrollAnimation>

        {/* Carousel */}
        <ScrollAnimation delay={0.2}>
          <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
          {/* Prev */}
          <IconButton
            onClick={handlePrev}
            aria-label="previous project"
            sx={{
              position: "absolute",
              left: -12,
              zIndex: 10,
              bgcolor: "white",
              boxShadow: 2,
              "&:hover": { bgcolor: "white" },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* Scrollable area */}
          <Box
            ref={containerRef}
            sx={{
              overflowX: "auto",
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              width: "100%",
            }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") handlePrev();
              if (e.key === "ArrowRight") handleNext();
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                py: 1,
                px: { xs: 2, md: `calc(50% - (100% / ${perView}) / 2)` },
              }}
            >
              {PROJECTS.map((p, i) => {
                const dist = circularDistance(i, index);
                const opacity = dist === 0 ? 1 : dist === 1 ? 0.85 : 0.6;
                const transform = dist === 0 ? "scale(1.04)" : "scale(0.95)";
                const zIndex = dist === 0 ? 5 : 1;

                return (
                  <Box
                    key={i}
                    component="a"
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: "none",
                      minWidth: {
                        xs: "80%",
                        sm: perView === 1 ? "80%" : perView === 2 ? "45%" : "30%",
                        md: perView === 3 ? "28%" : perView === 2 ? "45%" : "80%",
                      },
                      height: 220,
                      borderRadius: 3,
                      overflow: "hidden",
                      position: "relative",
                      flex: "0 0 auto",
                      boxShadow: dist === 0 ? "0 14px 34px rgba(15,23,42,0.18)" : "0 6px 18px rgba(15,23,42,0.08)",
                      transition: "transform 450ms ease, box-shadow 450ms ease, opacity 450ms ease",
                      transform,
                      opacity,
                      zIndex,
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      "&:hover img": { transform: "scale(1.05)" },
                    }}
                    onClick={(e) => {
                      // when clicking a side card, prevent immediate navigation so it centers first
                      // If it's not center, center it and prevent navigation; if center, allow link navigation normally.
                      if (i !== index) {
                        e.preventDefault();
                        if (autoRef.current) clearInterval(autoRef.current);
                        centerItem(i);
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={p.img}
                      alt={p.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.6s ease",
                      }}
                    />

                    {/* Category chip */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: { xs: 10, md: 10 },
                        left: { xs: 45, md: 15 },
                        bgcolor: "rgba(255,255,255,0.9)",
                        px: 1.2,
                        py: "4px",
                        borderRadius: "18px",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      }}
                    >
                      {p.category}
                    </Box>

                    {/* Overlay title */}
                    <Box
                      sx={{
                        position: "absolute",
                        left: { xs: 25, md: 0 },
                        right: { xs: 0, md: 0 },
                        bottom: 0,
                        p: { xs: 3.5, md: 2 },
                        background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)",
                        color: "white",
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>
                        {p.title}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Next */}
          <IconButton
            onClick={handleNext}
            aria-label="next project"
            sx={{
              position: "absolute",
              right: -12,
              zIndex: 10,
              bgcolor: "white",
              boxShadow: 2,
              "&:hover": { bgcolor: "white" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          </Box>
        </ScrollAnimation>
      </Container>
    </Box>
  );
}
