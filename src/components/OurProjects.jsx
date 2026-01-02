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
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";
import { ScrollAnimation } from "./ScrollAnimation";
import { useLanguage } from "../context/LanguageContext";
import dashboard from "../assets/OurProjects/Alpha/dashboard.png";
import mindmart1img from "../assets/OurProjects/mindmart1.png";
import ledger from "../assets/OurProjects/Alpha/ledger.png";
import malicious2img from "../assets/OurProjects/MaliciousURL/2.png";
import malicious3img from "../assets/OurProjects/MaliciousURL/3.png";
import youtube1img from "../assets/OurProjects/YoutubeContent/1.png";
import alphaVideo from "../assets/OurProjects/Alpha/AlphaVideo.mp4";
import jpVideo from "../assets/OurProjects/JagritiPrakashan/JPVideo.mp4";

const circularDistance = (i, center, total) => {
  const d = Math.abs(i - center);
  return Math.min(d, total - d);
};

const PROJECTS = [
  {
    title: "Fintech Website",
    category: "Finance",
    tech: ["React", "Django", "AWS", "Figma"],
    impact: "Developed a full-stack fintech platform for a prominent fintech influencer, supporting high user traffic, secure data handling, and smooth digital experiences for their community.",
    img: dashboard,
    video: alphaVideo,
    liveUrl: "https://app.alphacapitalclub.in/",
  },
  {
    title: "E-Commerce Website",
    category: "E-Commerce",
    tech: ["React", "MUI", "Figma"],
    impact: "Designed and developed a custom order-based website for a bulk-supply business, where users can browse books, add items to cart, and submit orders without traditional payment gateways.Orders are automatically captured in Google Sheets for the admin, enabling simple and efficient order management aligned with their bulk-focused workflow. The solution was intentionally built to avoid per-transaction commissions, while still providing a smooth checkout experience — including auto-filled payment amounts via UPI QR scanning",
    video: jpVideo,
    liveUrl: "https://jagritiprakashan.com/",
  },
  {
    title: "E-commerce Platform",
    category: "Online Store · Retail",
    tech: ["MUI", "Firebase", "Redux"],
    impact: "Managed over 50,000+ monthly active product listings.",
    img: mindmart1img,
    liveUrl: "#",
  },
  {
    title: "Malicious URL Detector",
    category: "UI, AI, ML",
    tech: ["Python", "Flask", "TensorFlow"],
    impact: "Flagged over 10,000+ phishing attempts with 99% accuracy.",
    img: malicious2img,
    liveUrl: "#",
  },
  {
    title: "Chrome Extension",
    category: "AI, ML",
    tech: ["Javascript", "WASM", "Chrome API"],
    impact: "Improved browser security for over 5,000+ daily users.",
    img: malicious3img,
    liveUrl: "#",
  },
  {
    title: "Enterprise Portal",
    category: "Enterprise · Platform",
    tech: ["Angular", "Spring Boot", "AWS"],
    impact: "Streamlined internal workflows, saving 20+ hours weekly.",
    img: youtube1img,
    liveUrl: "#",
  },
];

export default function ProjectsCarousel() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoRef = useRef(null);
  const videoRefs = useRef([]);
  const [videoProgress, setVideoProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showMobileControls, setShowMobileControls] = useState(false);
  const controlsTimeoutRef = useRef(null);

  const toggleMobileControls = () => {
    if (showMobileControls && isPlaying) {
      setShowMobileControls(false);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    } else {
      setShowMobileControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => setShowMobileControls(false), 3500);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

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

  const getCards = () => {
    const cont = containerRef.current;
    if (!cont) return null;
    const inner = cont.firstElementChild;
    if (!inner) return null;
    const cards = Array.from(inner.children);
    return { cont, inner, cards };
  };

  const centerItem = (targetIndex, behavior = "smooth") => {
    const info = getCards();
    if (!info) return;
    const { cont, cards } = info;
    const n = PROJECTS.length;
    const safeIndex = ((targetIndex % n) + n) % n;
    const item = cards[safeIndex];
    if (!item) return;

    const containerWidth = cont.clientWidth;
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const scrollLeft = Math.max(0, itemCenter - containerWidth / 2);

    cont.scrollTo({ left: scrollLeft, behavior: behavior || "smooth" });
    setIndex(safeIndex);
  };

  const handleScroll = () => {
    const info = getCards();
    if (!info) return;
    const { cont, cards } = info;
    const containerCenter = cont.scrollLeft + cont.clientWidth / 2;

    let closestIndex = index;
    let minDistance = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    if (closestIndex !== index) {
      setIndex(closestIndex);
    }
  };

  useEffect(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (PROJECTS[index].video) return; // Pause auto-scroll if current project has a video
    autoRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % PROJECTS.length;
        centerItem(next);
        return next;
      });
    }, 4000);
    return () => clearInterval(autoRef.current);
  }, [perView, index]);

  const pauseAuto = () => { if (autoRef.current) clearInterval(autoRef.current); };
  const resumeAuto = () => {
    pauseAuto();
    if (PROJECTS[index].video) return; // Don't resume auto-scroll if on a video
    autoRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % PROJECTS.length;
        centerItem(next);
        return next;
      });
    }, 4000);
  };

  useEffect(() => {
    const t = setTimeout(() => centerItem(index, "auto"), 150);
    return () => clearTimeout(t);
  }, [perView]);

  useEffect(() => {
    const video = videoRefs.current[index];
    setShowMobileControls(false); // Reset controls on index change
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);

    if (video) {
      video.currentTime = 0;
      setIsPlaying(true);
      video.play().catch(() => { });
      const handleProgress = () => {
        const progress = (video.currentTime / video.duration) * 100;
        setVideoProgress(progress || 0);
      };
      video.addEventListener("timeupdate", handleProgress);
      return () => {
        video.removeEventListener("timeupdate", handleProgress);
        video.pause();
        setVideoProgress(0);
        setIsPlaying(false);
      };
    } else {
      setIsPlaying(false);
      setVideoProgress(0);
    }
  }, [index]);

  const handlePrev = () => {
    const next = (index - 1 + PROJECTS.length) % PROJECTS.length;
    if (autoRef.current) clearInterval(autoRef.current);
    centerItem(next);
  };

  const handleNext = () => {
    const next = (index + 1) % PROJECTS.length;
    if (autoRef.current) clearInterval(autoRef.current);
    centerItem(next);
  };


  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#f8fafc",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "140%",
          height: "140%",
          background: "radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.05) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.05) 0%, transparent 40%)",
          filter: "blur(60px)",
          zIndex: 0,
          animation: "meshFade 15s ease-in-out infinite alternate",
        },
        "@keyframes meshFade": {
          "0%": { opacity: 0.3, transform: "scale(1)" },
          "100%": { opacity: 0.8, transform: "scale(1.1)" }
        }
      }}
      aria-label="Our Completed Projects"
    >
      <Box sx={{
        position: "absolute",
        top: "10%",
        right: "5%",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%)",
        filter: "blur(80px)",
        animation: "floatBlob 20s infinite alternate",
        zIndex: 0,
        "@keyframes floatBlob": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-50px, 100px)" }
        }
      }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, px: { xs: 0, sm: 3 }, overflow: "hidden" }}>
        <ScrollAnimation>
          <Box sx={{ textAlign: "center", mb: { xs: 2.5, md: 6 }, px: { xs: 2, sm: 0 } }}>
            <Typography variant="h3" sx={{ mb: 1, fontSize: { xs: "1.6rem", md: "3rem" } }}>
              {t('projects.title')}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary", maxWidth: 800, mx: "auto", fontSize: { xs: "0.85rem", md: "1rem" } }}>
              {t('projects.subtitle')}
            </Typography>
          </Box>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handlePrev}
              aria-label="previous project"
              sx={{
                position: "absolute",
                left: { xs: -5, md: -12 },
                zIndex: 10,
                bgcolor: "white",
                boxShadow: 2,
                display: { xs: "none", sm: "flex" },
                "&:hover": { bgcolor: "white" },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <Box
              ref={containerRef}
              sx={{
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                width: "100%",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
              }}
              onScroll={handleScroll}
              onMouseEnter={pauseAuto}
              onMouseLeave={resumeAuto}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") handlePrev();
                if (e.key === "ArrowRight") handleNext();
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 0, md: 4 },
                  py: { xs: 4, md: 6 },
                  px: {
                    xs: 0,
                    md: perView === 3 ? "37.5%" : perView === 2 ? "27.5%" : "7.5%"
                  },
                }}
              >
                {PROJECTS.map((p, i) => {
                  const dist = circularDistance(i, index, PROJECTS.length);
                  const opacity = dist === 0 ? 1 : dist === 1 ? 0.6 : 0.3;
                  const transform = dist === 0
                    ? (perView === 1 ? "scale(1)" : "scale(1.15)")
                    : (perView === 1 ? "scale(1)" : "scale(0.95)");
                  const zIndex = dist === 0 ? 5 : 1;

                  return (
                    <Box
                      key={i}
                      sx={{
                        width: { xs: "100%", sm: "auto" },
                        minWidth: {
                          xs: "100%",
                          sm: perView === 1 ? "85%" : perView === 2 ? "45%" : "30%",
                          md: perView === 3 ? "25%" : perView === 2 ? "45%" : "85%",
                        },
                        height: { xs: "auto", sm: "350px", md: 400 },
                        minHeight: { xs: "500px", sm: "350px", md: 400 },
                        boxSizing: "border-box",
                        scrollSnapAlign: "center",
                        borderRadius: 4,
                        overflow: "hidden",
                        position: "relative",
                        flex: "0 0 auto",
                        boxShadow: dist === 0 ? "0 20px 40px rgba(15,23,42,0.25)" : "0 8px 20px rgba(15,23,42,0.1)",
                        border: dist === 0 ? "2px solid rgba(99, 102, 241, 0.5)" : "2px solid transparent",
                        transition: "transform 450ms ease, box-shadow 450ms ease, opacity 450ms ease",
                        transform,
                        opacity,
                        zIndex,
                        cursor: "pointer",
                        backgroundColor: "#fff",
                        "&:hover": {
                          opacity: 1,
                          "& .tech-stack-badges": { opacity: { xs: 0, md: 1 }, transform: "translateX(0)" }
                        },
                      }}
                      onClick={(e) => {
                        if (i !== index) {
                          e.preventDefault();
                          if (autoRef.current) clearInterval(autoRef.current);
                          centerItem(i);
                        }
                      }}
                    >
                      {p.video ? (
                        <Box sx={{ position: "relative", width: "100%", height: { xs: "220px", sm: "100%", md: "100%" }, overflow: "hidden" }}>
                          <Box
                            component="video"
                            ref={el => videoRefs.current[i] = el}
                            src={p.video}
                            muted={isMuted}
                            playsInline
                            onEnded={handleNext}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const v = videoRefs.current[i];
                              if (v && i === index) {
                                if (window.innerWidth < 900) {
                                  toggleMobileControls();
                                } else {
                                  if (isPlaying) { v.pause(); setIsPlaying(false); }
                                  else { v.play(); setIsPlaying(true); }
                                }
                              }
                            }}
                            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />

                          {/* Mobile YouTube-style Controls */}
                          <Box
                            sx={{
                              position: "absolute",
                              inset: 0,
                              display: { xs: "flex", md: "none" },
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: "rgba(0,0,0,0.4)",
                              opacity: (showMobileControls || !isPlaying) ? 1 : 0,
                              visibility: (showMobileControls || !isPlaying) ? "visible" : "hidden",
                              transition: "all 0.3s ease",
                              zIndex: 16,
                              gap: 3
                            }}
                            onClick={toggleMobileControls}
                          >
                            <IconButton
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); const v = videoRefs.current[i]; if (v && i === index) { v.currentTime -= 10; toggleMobileControls(); } }}
                              aria-label="replay 10 seconds"
                              sx={{ color: "white", bgcolor: "rgba(255,255,255,0.2)", p: 1.5 }}
                            >
                              <Replay10Icon sx={{ fontSize: "1.8rem" }} />
                            </IconButton>
                            <IconButton
                              onClick={(e) => {
                                e.preventDefault(); e.stopPropagation();
                                const v = videoRefs.current[i];
                                if (v && i === index) {
                                  if (isPlaying) { v.pause(); setIsPlaying(false); }
                                  else { v.play(); setIsPlaying(true); }
                                  toggleMobileControls();
                                }
                              }}
                              aria-label={isPlaying ? "pause video" : "play video"}
                              sx={{ color: "white", bgcolor: "rgba(255,255,255,0.3)", p: 2.5 }}
                            >
                              {isPlaying ? <PauseIcon sx={{ fontSize: "2.5rem" }} /> : <PlayArrowIcon sx={{ fontSize: "2.5rem" }} />}
                            </IconButton>
                            <IconButton
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); const v = videoRefs.current[i]; if (v && i === index) { v.currentTime += 10; toggleMobileControls(); } }}
                              aria-label="forward 10 seconds"
                              sx={{ color: "white", bgcolor: "rgba(255,255,255,0.2)", p: 1.5 }}
                            >
                              <Forward10Icon sx={{ fontSize: "1.8rem" }} />
                            </IconButton>
                          </Box>

                          <Box
                            className="video-controls-overlay"
                            sx={{
                              position: "absolute",
                              inset: 0,
                              display: { xs: "none", md: "flex" },
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "space-between",
                              bgcolor: "rgba(15, 23, 42, 0.85)",
                              backdropFilter: "blur(8px)",
                              opacity: 0,
                              p: { xs: 2, md: 3 },
                              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                              zIndex: 15,
                              "&:hover": { opacity: 1 },
                            }}
                          >
                            <Box
                              component="a"
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`visit live site for ${p.title}`}
                              onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
                                const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
                                setMousePos({ x, y });
                              }}
                              onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
                              onClick={(e) => e.stopPropagation()}
                              sx={{
                                color: "white",
                                border: "2px solid white",
                                px: { xs: 3, md: 4 },
                                py: { xs: 1, md: 1.5 },
                                borderRadius: "30px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                fontSize: { xs: "0.6rem", md: "0.9rem" },
                                mb: { xs: 0.8, md: 2 },
                                textDecoration: "none",
                                transition: "all 0.1s ease-out",
                                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                                "&:hover": { bgcolor: "white", color: "black" }
                              }}
                            >
                              Visit Live Site
                            </Box>

                            <Box sx={{
                              width: "100%",
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                              my: 2
                            }}>
                              <Box sx={{
                                width: "100%",
                                maxHeight: "100%",
                                overflowY: "auto",
                                px: 1,
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": { display: "none" },
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                              }}>
                                <Typography sx={{
                                  color: "rgba(255,255,255,0.95)",
                                  fontSize: { xs: "0.75rem", md: "0.95rem" },
                                  textAlign: "center",
                                  maxWidth: "95%",
                                  lineHeight: 1.6,
                                  fontWeight: 500,
                                  fontStyle: "italic",
                                  textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                                }}>
                                  "{p.impact}"
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ display: "flex", gap: { xs: 1, md: 3 }, mt: "auto" }}>
                              <IconButton
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); const v = videoRefs.current[i]; if (v && i === index) v.currentTime -= 10; }}
                                aria-label="replay 10 seconds"
                                sx={{
                                  color: "white",
                                  bgcolor: "rgba(255,255,255,0.1)",
                                  p: { xs: 0.5, md: 1.5 },
                                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" }
                                }}
                              >
                                <Replay10Icon sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }} />
                              </IconButton>
                              <IconButton
                                onClick={(e) => {
                                  e.preventDefault(); e.stopPropagation();
                                  const v = videoRefs.current[i];
                                  if (v && i === index) {
                                    if (isPlaying) { v.pause(); setIsPlaying(false); }
                                    else { v.play(); setIsPlaying(true); }
                                  }
                                }}
                                aria-label={isPlaying ? "pause video" : "play video"}
                                sx={{
                                  color: "white",
                                  bgcolor: "rgba(255,255,255,0.2)",
                                  p: { xs: 1, md: 2 },
                                  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" }
                                }}
                              >
                                {isPlaying ? <PauseIcon sx={{ fontSize: { xs: "1.2rem", md: "2rem" } }} /> : <PlayArrowIcon sx={{ fontSize: { xs: "1.2rem", md: "2rem" } }} />}
                              </IconButton>
                              <IconButton
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); const v = videoRefs.current[i]; if (v && i === index) v.currentTime += 10; }}
                                aria-label="forward 10 seconds"
                                sx={{
                                  color: "white",
                                  bgcolor: "rgba(255,255,255,0.1)",
                                  p: { xs: 0.5, md: 1.5 },
                                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" }
                                }}
                              >
                                <Forward10Icon sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }} />
                              </IconButton>
                            </Box>
                          </Box>
                          <Box sx={{ position: "absolute", bottom: 0, left: 0, width: `${videoProgress}%`, height: "4px", bgcolor: "primary.main", zIndex: 25 }} />
                          <IconButton
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMuted(!isMuted); }}
                            aria-label={isMuted ? "unmute video" : "mute video"}
                            sx={{ position: "absolute", bottom: 10, right: 10, bgcolor: "rgba(0,0,0,0.5)", color: "white", zIndex: 20, "&:hover": { bgcolor: "rgba(0,0,0,0.7)", transform: "scale(1.1)" }, transition: "all 0.2s ease" }}
                          >
                            {isMuted ? <VolumeOffIcon size="small" /> : <VolumeUpIcon size="small" />}
                          </IconButton>
                        </Box>
                      ) : (
                        <Box sx={{ position: "relative", width: "100%", height: { xs: "220px", sm: "100%", md: "100%" }, overflow: "hidden" }}>
                          <Box
                            component="img"
                            src={p.img || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"}
                            alt={p.title}
                            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                          />
                          <Box
                            sx={{
                              position: "absolute", inset: 0,
                              bgcolor: "rgba(15, 23, 42, 0.85)",
                              backdropFilter: "blur(10px)",
                              display: { xs: "none", md: "flex" },
                              flexDirection: "column",
                              alignItems: "center", justifyContent: "space-between",
                              p: { xs: 2, md: 3 },
                              opacity: 0, transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                              zIndex: 10, "&:hover": { opacity: 1 }
                            }}
                          >
                            <Box
                              component="a"
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`visit live site for ${p.title}`}
                              onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
                                const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
                                setMousePos({ x, y });
                              }}
                              onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
                              onClick={(e) => e.stopPropagation()}
                              sx={{
                                color: "white",
                                border: "2px solid white",
                                px: { xs: 3, md: 4 },
                                py: { xs: 1, md: 1.5 },
                                borderRadius: "30px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                fontSize: { xs: "0.6rem", md: "0.9rem" },
                                mb: { xs: 0.8, md: 2 },
                                textDecoration: "none",
                                transition: "all 0.1s ease-out",
                                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                                "&:hover": { bgcolor: "white", color: "black" }
                              }}
                            >
                              Visit Live Site
                            </Box>
                            <Box sx={{
                              width: "100%",
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                              my: 2
                            }}>
                              <Box sx={{
                                width: "100%",
                                maxHeight: "100%",
                                overflowY: "auto",
                                px: 1,
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": { display: "none" },
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                              }}>
                                <Typography sx={{
                                  color: "rgba(255,255,255,0.95)",
                                  fontSize: { xs: "0.75rem", md: "0.95rem" },
                                  textAlign: "center",
                                  maxWidth: "95%",
                                  lineHeight: 1.6,
                                  fontWeight: 500,
                                  fontStyle: "italic",
                                  textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                                }}>
                                  "{p.impact}"
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}

                      {/* Content Below Video/Image (Mobile Only) */}
                      <Box sx={{
                        display: { xs: "flex", md: "none" },
                        flexDirection: "column",
                        p: 2,
                        backgroundColor: "#fff",
                        flex: 1
                      }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                          <Box sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            px: 1.5,
                            py: "4px",
                            borderRadius: "12px",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                          }}>
                            {p.category}
                          </Box>
                          <Box
                            component="a"
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`visit live site for ${p.title}`}
                            sx={{
                              color: "primary.main",
                              border: "1px solid",
                              borderColor: "primary.main",
                              px: 2,
                              py: 0.5,
                              borderRadius: "20px",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              textDecoration: "none",
                              "&:hover": { bgcolor: "primary.main", color: "white" }
                            }}
                          >
                            Live Site
                          </Box>
                        </Box>

                        <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", mb: 0.5, color: "#1e293b" }}>
                          {p.title}
                        </Typography>

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
                          {p.tech?.map((t, idx) => (
                            <Box key={idx} sx={{
                              bgcolor: "rgba(100, 116, 139, 0.1)",
                              color: "slategray",
                              px: 1,
                              py: "2px",
                              borderRadius: "4px",
                              fontSize: "0.6rem",
                              fontWeight: 700,
                            }}>
                              {t}
                            </Box>
                          ))}
                        </Box>

                        <Typography sx={{
                          color: "text.secondary",
                          fontSize: "0.85rem",
                          lineHeight: 1.5,
                          fontStyle: "italic"
                        }}>
                          "{p.impact}"
                        </Typography>
                      </Box>

                      {/* Tech Stack Badges (Reveal on Hover) */}
                      <Box
                        className="tech-stack-badges"
                        sx={{
                          position: "absolute",
                          bottom: { xs: 45, md: "auto" },
                          top: { xs: "auto", md: 50 },
                          right: { xs: 10, md: 15 },
                          display: { xs: "none", md: "flex" },
                          flexDirection: { xs: "row", md: "column" },
                          gap: 0.8,
                          zIndex: 20,
                          opacity: 0,
                          transform: "translateX(10px)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        {p.tech?.map((t, idx) => (
                          <Box key={idx} sx={{
                            bgcolor: "rgba(15, 23, 42, 0.9)",
                            backdropFilter: "blur(8px)",
                            color: "white",
                            px: 1,
                            py: "2px",
                            borderRadius: "4px",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            border: "1px solid rgba(255,255,255,0.2)",
                            textAlign: "center",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                          }}>
                            {t}
                          </Box>
                        ))}
                      </Box>

                      {/* Category Chip */}
                      <Box sx={{
                        position: "absolute",
                        top: 10,
                        left: { xs: 10, md: 15 },
                        bgcolor: "rgba(255,255,255,0.7)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        px: 1.5,
                        py: "6px",
                        borderRadius: "20px",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        zIndex: 5,
                        display: { xs: "none", md: "block" }
                      }}>
                        {p.category}
                      </Box>

                      {/* Title Overlay */}
                      <Box sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        p: 2,
                        background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)",
                        color: "white",
                        zIndex: 5,
                        display: { xs: "none", md: "block" }
                      }}>
                        <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>{p.title}</Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            <IconButton
              onClick={handleNext}
              aria-label="next project"
              sx={{
                position: "absolute",
                right: { xs: -5, md: -12 },
                zIndex: 10,
                bgcolor: "white",
                boxShadow: 2,
                display: { xs: "none", sm: "flex" },
                "&:hover": { bgcolor: "white" },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </ScrollAnimation>

        <Box sx={{ display: "flex", justifyCenter: "center", gap: 1.5, mt: 4, justifyContent: "center" }}>
          {PROJECTS.map((_, i) => (
            <Box
              key={i}
              onClick={() => centerItem(i)}
              sx={{
                width: i === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === index ? "primary.main" : "grey.400",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: "primary.light" },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box >
  );
}
