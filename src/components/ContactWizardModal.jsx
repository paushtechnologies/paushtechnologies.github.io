import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
    Dialog,
    Box,
    Typography,
    IconButton,
    Grid,
    Paper,
    Button,
    useTheme,
    useMediaQuery,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    LinearProgress,
    MenuItem,
    Select,
    InputLabel,
    ToggleButtonGroup,
    ToggleButton,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import PublicIcon from "@mui/icons-material/Public";
import StayPrimaryPortraitIcon from "@mui/icons-material/StayPrimaryPortrait";
import DvrIcon from "@mui/icons-material/Dvr";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { GOOGLE_SCRIPT_URL } from "../data/constants";

const ContactWizardModal = ({ open, onClose, phoneNumber }) => {
    const { t, language } = useLanguage();
    const [step, setStep] = useState(1);
    const totalSteps = 6;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [formData, setFormData] = useState({
        service: "",
        name: "",
        email: "",
        phone: "",
        brandName: "",
        domainPurchased: "no",
        domainName: "",
        currency: "INR",
        budget: "₹50,000 - ₹75,000",
        features: "",
        timeline: "flexible",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

    const updateForm = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors((prev) => {
                const newErrs = { ...prev };
                delete newErrs[key];
                return newErrs;
            });
        }
    };

    const validateStep = () => {
        const newErrors = {};
        if (step === 2) {
            if (!formData.name.trim()) newErrors.name = t('wizard.errors.name');
            if (!formData.phone.trim()) {
                newErrors.phone = t('wizard.errors.phone');
            } else if (!/^\+?[\d\s-]{10,15}$/.test(formData.phone)) {
                newErrors.phone = t('wizard.errors.validPhone');
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep((s) => Math.min(s + 1, totalSteps));
        }
    };

    const handleSkip = () => {
        setStep((s) => Math.min(s + 1, totalSteps));
    };

    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    const resetAndClose = () => {
        onClose();
        setTimeout(() => {
            setStep(1);
            setFormData({
                service: "",
                name: "",
                email: "",
                phone: "",
                brandName: "",
                domainPurchased: "no",
                domainName: "",
                currency: "INR",
                budget: "₹50,000 - ₹75,000",
                features: "",
                timeline: "flexible",
            });
            setErrors({});
            setSubmitted(false);
            setLoading(false);
        }, 300);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const summary = `
[PROJECT QUOTE REQUEST]
Service: ${getServiceLabel(formData.service)}
Brand: ${formData.brandName || "N/A"}
Domain: ${formData.domainName || "N/A"} (${formData.domainPurchased === 'yes' ? 'Already Purchased' : 'Not Purchased'})
Budget: ${formData.budget} (${formData.currency})
Timeline: ${formData.timeline}
Features: ${formData.features || "N/A"}

User Summary: I am looking to build a ${getServiceLabel(formData.service)} for ${formData.brandName || "my brand"}. I have a budget of ${formData.budget} (${formData.currency}) and my timeline is ${formData.timeline}.${formData.domainPurchased === 'yes' ? ` My domain is already secured at ${formData.domainName}.` : ''}
            `.trim();

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: summary
                }),
            });

            setSubmitted(true);
            setAlert({ open: true, message: t('wizard.submitted'), severity: "success" });
        } catch (error) {
            setAlert({ open: true, message: t('contact.errorMessage'), severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    const getServiceLabel = (id) => {
        if (id === "Website") return "Modern Website";
        if (id === "Mobile App") return "Custom Mobile App";
        if (id === "Both") return "Combined Website & Mobile App Ecosystem";
        return id;
    };

    const budgetOptions = {
        INR: [
            "Under ₹50,000",
            "₹50,000 - ₹75,000",
            "₹75,000 - ₹100,000",
            "₹1,00,000 - ₹2,00,000",
            "₹2,00,000+",
            "Not Decided",
        ],
        USD: [
            "Under $500",
            "$500 - $1,500",
            "$1,500 - $3,000",
            "$3,000 - $5,000",
            "$5,000+",
            "Not Decided",
        ],
    };

    const progress = (step / totalSteps) * 100;

    return (
        <Dialog
            open={open}
            onClose={resetAndClose}
            maxWidth="sm"
            fullWidth
            fullScreen={isMobile}
            PaperProps={{
                sx: {
                    borderRadius: isMobile ? 0 : 4,
                    background: "#FFFFFF",
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                    overflow: "hidden",
                },
            }}
        >
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 5,
                    backgroundColor: "#f1f5f9",
                    "& .MuiLinearProgress-bar": {
                        background: "linear-gradient(90deg, #6366f1, #e066ff)",
                    }
                }}
            />

            <Box sx={{ p: { xs: 3, md: 5 }, position: "relative" }}>
                <IconButton
                    onClick={resetAndClose}
                    sx={{ position: "absolute", right: 16, top: 16, color: "#94a3b8" }}
                >
                    <CloseIcon />
                </IconButton>

                {step > 1 && !submitted && (
                    <IconButton onClick={handleBack} sx={{ position: "absolute", left: 16, top: 16, color: "#6366f1" }}>
                        <ArrowBackIcon />
                    </IconButton>
                )}

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ textAlign: "center", padding: "40px 0" }}
                        >
                            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "#22c55e", mb: 2 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#0f172a" }}>
                                {t('wizard.submitted')}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#64748b", mb: 4 }}>
                                {t('wizard.submittedDesc')}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={resetAndClose}
                                sx={{ borderRadius: "50px", px: 4, py: 1.5, fontWeight: 700, background: "linear-gradient(45deg, #6366f1, #4f46e5)" }}
                            >
                                {t('wizard.close')}
                            </Button>
                        </motion.div>
                    ) : (
                        <>
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 4, mt: 2, color: "#0f172a" }}>
                                        {t('wizard.title')}
                                    </Typography>
                                    <Grid container spacing={2.5}>
                                        {[
                                            { id: "Website", label: t('wizard.website'), icon: <PublicIcon sx={{ fontSize: 32 }} />, desc: t('wizard.websiteDesc') },
                                            { id: "Mobile App", label: t('wizard.mobileApp'), icon: <StayPrimaryPortraitIcon sx={{ fontSize: 32 }} />, desc: t('wizard.mobileAppDesc') },
                                            { id: "Both", label: t('wizard.both'), icon: <DvrIcon sx={{ fontSize: 32 }} />, desc: t('wizard.bothDesc') },
                                        ].map((opt) => (
                                            <Grid item xs={12} key={opt.id}>
                                                <Paper
                                                    elevation={0}
                                                    onClick={() => { updateForm("service", opt.id); setStep(2); }}
                                                    sx={{
                                                        p: 3,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        cursor: "pointer",
                                                        borderRadius: 3,
                                                        border: "2px solid",
                                                        borderColor: formData.service === opt.id ? "#6366f1" : "#f1f5f9",
                                                        background: formData.service === opt.id ? "#f5f3ff" : "white",
                                                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                                        "&:hover": { borderColor: "#6366f1", transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(99, 102, 241, 0.05)" },
                                                    }}
                                                >
                                                    <Box sx={{ color: formData.service === opt.id ? "#6366f1" : "#cbd5e1", mr: 3 }}>{opt.icon}</Box>
                                                    <Box>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e293b" }}>{opt.label}</Typography>
                                                        <Typography variant="caption" sx={{ color: "#64748b" }}>{opt.desc}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 4, mt: 2 }}>{t('wizard.contactDetails')}</Typography>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                        <TextField
                                            fullWidth
                                            label={t('wizard.fullName')}
                                            error={!!errors.name}
                                            helperText={errors.name && t('wizard.nameRequired')}
                                            value={formData.name}
                                            onChange={(e) => updateForm("name", e.target.value)}
                                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                                        />
                                        <TextField
                                            fullWidth
                                            label={t('wizard.whatsappPhone')}
                                            error={!!errors.phone}
                                            helperText={errors.phone && t('wizard.phoneRequired')}
                                            value={formData.phone}
                                            onChange={(e) => updateForm("phone", e.target.value)}
                                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                                        />
                                        <TextField
                                            fullWidth
                                            label={t('wizard.emailOptional')}
                                            value={formData.email}
                                            onChange={(e) => updateForm("email", e.target.value)}
                                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                                        />
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Button fullWidth onClick={handleSkip} sx={{ borderRadius: 3, fontWeight: 600, color: "#64748b", textTransform: "none" }}>{t('wizard.skip')}</Button>
                                            <Button fullWidth variant="contained" onClick={handleNext} sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, background: "linear-gradient(45deg, #6366f1, #4f46e5)", textTransform: "none" }}>{t('wizard.next')}</Button>
                                        </Box>
                                    </Box>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 4, mt: 2 }}>{t('wizard.domainDetails')}</Typography>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                        <TextField
                                            fullWidth
                                            label={t('wizard.brandName')}
                                            value={formData.brandName}
                                            onChange={(e) => updateForm("brandName", e.target.value)}
                                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                                        />

                                        <FormControl component="fieldset">
                                            <FormLabel sx={{ fontWeight: 700, mb: 1, color: "#1e293b", fontSize: "0.9rem" }}>{t('wizard.haveDomainQuestion')}</FormLabel>
                                            <RadioGroup row value={formData.domainPurchased} onChange={(e) => updateForm("domainPurchased", e.target.value)}>
                                                <FormControlLabel value="yes" control={<Radio />} label={t('wizard.yes')} />
                                                <FormControlLabel value="no" control={<Radio />} label={t('wizard.no')} />
                                            </RadioGroup>
                                        </FormControl>

                                        {formData.domainPurchased === 'yes' && (
                                            <TextField
                                                fullWidth
                                                label={t('wizard.enterDomainName')}
                                                value={formData.domainName}
                                                onChange={(e) => updateForm("domainName", e.target.value)}
                                                placeholder={t('wizard.domainPlaceholder')}
                                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                                            />
                                        )}

                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Button fullWidth onClick={handleSkip} sx={{ borderRadius: 3, fontWeight: 600, color: "#64748b", textTransform: "none" }}>{t('wizard.skip')}</Button>
                                            <Button fullWidth variant="contained" onClick={handleNext} sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, background: "linear-gradient(45deg, #6366f1, #4f46e5)", textTransform: "none" }}>{t('wizard.next')}</Button>
                                        </Box>
                                    </Box>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 3, mt: 2 }}>{t('wizard.budgetRange')}</Typography>

                                    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                                        <ToggleButtonGroup
                                            value={formData.currency}
                                            exclusive
                                            onChange={(e, val) => val && updateForm("currency", val)}
                                            size="small"
                                            sx={{ "& .MuiToggleButton-root": { borderRadius: 2, px: 3, fontWeight: 700 } }}
                                        >
                                            <ToggleButton value="INR">₹ INR</ToggleButton>
                                            <ToggleButton value="USD">$ USD</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>

                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                        <FormControl fullWidth>
                                            <InputLabel>{t('wizard.budgetRange')} ({formData.currency})</InputLabel>
                                            <Select
                                                value={formData.budget}
                                                label={`${t('wizard.budgetRange')} (${formData.currency})`}
                                                onChange={(e) => updateForm("budget", e.target.value)}
                                                sx={{ borderRadius: 3 }}
                                            >
                                                {budgetOptions[formData.currency].map(opt => (
                                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Button fullWidth onClick={handleSkip} sx={{ borderRadius: 3, fontWeight: 600, color: "#64748b", textTransform: "none" }}>{t('wizard.skip')}</Button>
                                            <Button fullWidth variant="contained" onClick={handleNext} sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, background: "linear-gradient(45deg, #6366f1, #4f46e5)", textTransform: "none" }}>{t('wizard.next')}</Button>
                                        </Box>
                                    </Box>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 4, mt: 2 }}>{t('wizard.featuresTimeline')}</Typography>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={2}
                                            label={t('wizard.coreFeatures')}
                                            value={formData.features}
                                            onChange={(e) => updateForm("features", e.target.value)}
                                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                                        />
                                        <FormControl component="fieldset">
                                            <FormLabel sx={{ fontWeight: 700, mb: 1.5, color: "#1e293b" }}>{t('wizard.timelinePreference')}</FormLabel>
                                            <RadioGroup row value={formData.timeline} onChange={(e) => updateForm("timeline", e.target.value)}>
                                                <FormControlLabel value="urgent" control={<Radio />} label={t('wizard.urgent')} />
                                                <FormControlLabel value="flexible" control={<Radio />} label={t('wizard.flexible')} />
                                            </RadioGroup>
                                        </FormControl>
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Button fullWidth onClick={handleSkip} sx={{ borderRadius: 3, fontWeight: 600, color: "#64748b", textTransform: "none" }}>{t('wizard.skip')}</Button>
                                            <Button fullWidth variant="contained" onClick={handleNext} sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, background: "linear-gradient(45deg, #6366f1, #4f46e5)", textTransform: "none" }}>{t('wizard.finish')}</Button>
                                        </Box>
                                    </Box>
                                </motion.div>
                            )}

                            {step === 6 && (
                                <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 4, mt: 2 }}>{t('wizard.projectSummary')}</Typography>

                                    <Box sx={{ p: 2.5, bgcolor: "#f8fafc", borderRadius: 4, border: "1px solid #e2e8f0", mb: 4 }}>
                                        <Typography variant="body2" sx={{ color: "#334155", fontWeight: 600, lineHeight: 1.7 }}>
                                            {t('wizard.summaryText')
                                                .replace('{service}', getServiceLabel(formData.service))
                                                .replace('{brand}', formData.brandName || (language === 'hi' ? "मेरे ब्रांड" : "my brand"))
                                                .replace('{budget}', formData.budget)
                                                .replace('{currency}', formData.currency)
                                                .replace('{timeline}', t(`wizard.${formData.timeline}`).toLowerCase())}
                                            {formData.domainPurchased === 'yes' && ` ${language === 'hi' ? ` मेरा डोमेन पहले से ही ${formData.domainName} पर सुरक्षित है।` : ` My domain is already secured at ${formData.domainName}.`}`}
                                        </Typography>
                                    </Box>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        disabled={loading}
                                        onClick={handleSubmit}
                                        sx={{
                                            py: 2,
                                            borderRadius: "50px",
                                            fontWeight: 400,
                                            letterSpacing: 1,
                                            background: "linear-gradient(45deg, #6366f1, #4f46e5)",
                                            boxShadow: "0 10px 20px rgba(99, 102, 241, 0.2)",
                                            textTransform: "none",
                                            "&:hover": { background: "linear-gradient(45deg, #4f46e5, #4338ca)" }
                                        }}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : t('wizard.submitRequest')}
                                    </Button>
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </Box>

            <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
                <Alert severity={alert.severity} variant="filled" sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ContactWizardModal;
