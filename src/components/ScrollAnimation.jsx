// ScrollAnimation.jsx - Reusable scroll animation wrapper
import { motion } from "framer-motion";
import { Box } from "@mui/material";

// Animation variants with smooth easing
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Reusable wrapper component
export const ScrollAnimation = ({ 
  children, 
  variant = fadeInUp, 
  delay = 0,
  className = "",
  sx = {},
  amount = 0.2
}) => {
  return (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        ...variant,
        visible: {
          ...variant.visible,
          transition: {
            ...variant.visible.transition,
            delay
          }
        }
      }}
      className={className}
      sx={sx}
    >
      {children}
    </Box>
  );
};

// Container with stagger effect
export const StaggerContainer = ({ children, sx = {} }) => {
  return (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      sx={sx}
    >
      {children}
    </Box>
  );
};

// Individual item for stagger
export const StaggerItem = ({ children, sx = {} }) => {
  return (
    <Box
      component={motion.div}
      variants={fadeInUp}
      sx={sx}
    >
      {children}
    </Box>
  );
};

