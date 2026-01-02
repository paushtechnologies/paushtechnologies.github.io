import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, useMediaQuery, useTheme, Typography, Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContactWizardModal from "./ContactWizardModal";
import { useLanguage } from "../context/LanguageContext";

const FloatingContact = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [wizardOpen, setWizardOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const longPressTimer = useRef(null);

    // Show button after scrolling down 100px, or always on mobile if preferred.
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else if (!isMobile) {
                // On desktop, hide when at the top
                setIsVisible(false);
                setIsOpen(false); // Close menu if scrolling back to top
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check initial position
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobile]);

    const phoneNumber = "+919456644264";
    const quickWhatsappMessage = encodeURIComponent(t('floating.whatsappMsg'));
    const quickWhatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${quickWhatsappMessage}`;
    const callUrl = `tel:${phoneNumber}`;

    const toggleOpen = () => setIsOpen(!isOpen);

    // Long press handling
    const handlePointerDown = () => {
        longPressTimer.current = setTimeout(() => {
            setIsOpen(true);
        }, 500);
    };

    const handlePointerUp = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }
    };

    // Enhanced Shake & Glow animation
    const shakeAnimation = {
        rotate: [0, -8, 8, -8, 8, 0],
        scale: [1, 1.1, 1, 1.1, 1],
        boxShadow: [
            `0 0 0px ${theme.palette.secondary.main}66`,
            `0 0 20px ${theme.palette.secondary.main}AA`,
            `0 0 0px ${theme.palette.secondary.main}66`,
            `0 0 20px ${theme.palette.secondary.main}AA`,
            `0 0 0px ${theme.palette.secondary.main}66`,
        ],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
        },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 50 }}
                    onMouseEnter={() => !isMobile && setIsOpen(true)}
                    onMouseLeave={() => !isMobile && setIsOpen(false)}
                    sx={{
                        position: "fixed",
                        bottom: { xs: 24, md: 32 },
                        right: { xs: 24, md: 80 },
                        zIndex: 2000,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 2,
                    }}
                >
                    <AnimatePresence>
                        {isOpen && (
                            <Box
                                component={motion.div}
                                initial={{ opacity: 0, y: 40, scale: 0.6 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 40, scale: 0.6 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                    mass: 0.8
                                }}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    mb: 1,
                                }}
                            >
                                <Box
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                                >
                                    {/* WhatsApp Quick Connect */}
                                    <Paper
                                        elevation={8}
                                        sx={{
                                            borderRadius: 50,
                                            display: "flex",
                                            alignItems: "center",
                                            pr: 3,
                                            overflow: "hidden",
                                            background: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(12px)",
                                            cursor: "pointer",
                                            border: "1px solid rgba(255, 255, 255, 0.3)",
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                                        }}
                                        component={motion.div}
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.open(quickWhatsappUrl, "_blank")}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: "#25D366",
                                                color: "white",
                                                width: 48,
                                                height: 48,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "50%",
                                                m: 0.5,
                                            }}
                                        >
                                            <WhatsAppIcon />
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ml: 1.5,
                                                fontWeight: 700,
                                                color: "#1f2937",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            {t('floating.whatsapp')}
                                        </Typography>
                                    </Paper>

                                    {/* Get Quote (Wizard) */}
                                    <Paper
                                        elevation={8}
                                        sx={{
                                            borderRadius: 50,
                                            display: "flex",
                                            alignItems: "center",
                                            pr: 3,
                                            overflow: "hidden",
                                            background: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(12px)",
                                            cursor: "pointer",
                                            border: "1px solid rgba(255, 255, 255, 0.3)",
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                                        }}
                                        component={motion.div}
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setWizardOpen(true)}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: "#FFB347", // Pastel Orange
                                                color: "white",
                                                width: 48,
                                                height: 48,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "50%",
                                                m: 0.5,
                                            }}
                                        >
                                            <AssignmentIcon />
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ml: 1.5,
                                                fontWeight: 700,
                                                color: "#1f2937",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            {t('floating.getQuote')}
                                        </Typography>
                                    </Paper>
                                </Box>

                                {/* Call Now Link */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        borderRadius: 50,
                                        display: "flex",
                                        alignItems: "center",
                                        pr: 0,
                                        overflow: "hidden",
                                        background: "rgba(255, 255, 255, 0.8)",
                                        backdropFilter: "blur(12px)",
                                        cursor: "pointer",
                                        border: "1px solid rgba(255, 255, 255, 0.3)",
                                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                                    }}
                                    component={motion.div}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.location.href = callUrl}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            color: "white",
                                            width: 48,
                                            height: 48,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "50%",
                                            m: 0.5,
                                        }}
                                    >
                                        <PhoneIcon />
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ml: 1.5,
                                            fontWeight: 700,
                                            color: "#1f2937",
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        {t('floating.callNow')}
                                    </Typography>
                                </Paper>
                            </Box>
                        )}
                    </AnimatePresence>

                    {/* Main Toggle Button */}
                    <IconButton
                        component={motion.button}
                        animate={isOpen ? { rotate: 0 } : shakeAnimation}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleOpen}
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlePointerUp}
                        onPointerLeave={handlePointerUp}
                        sx={{
                            width: 64,
                            height: 64,
                            backgroundColor: theme.palette.secondary.main,
                            color: "white",
                            boxShadow: `0 8px 32px ${theme.palette.secondary.main}66`,
                            "&:hover": {
                                backgroundColor: theme.palette.secondary.dark,
                            },
                            position: "relative",
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                top: -4,
                                left: -4,
                                right: -4,
                                bottom: -4,
                                borderRadius: "50%",
                                background: `radial-gradient(circle, ${theme.palette.secondary.main}44 0%, transparent 70%)`,
                                zIndex: -1,
                                opacity: isOpen ? 0 : 1,
                                transition: "opacity 0.3s ease",
                            },
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <CloseIcon sx={{ fontSize: 32 }} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="call"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <CallIcon sx={{ fontSize: 32 }} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </IconButton>
                </Box>
            )}
            <ContactWizardModal
                open={wizardOpen}
                onClose={() => setWizardOpen(false)}
                phoneNumber={phoneNumber}
            />
        </AnimatePresence>
    );
};

export default FloatingContact;
