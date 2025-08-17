import { Variants } from 'framer-motion';

// Common animation variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: 'easeOut',
  },
};

export const tapScale = {
  scale: 0.95,
  transition: {
    duration: 0.1,
    ease: 'easeOut',
  },
};

// Page transition variants
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// Card flip animation for auth
export const cardFlip: Variants = {
  front: {
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
  back: {
    rotateY: 180,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

// Flowing line animation
export const flowingLine = {
  initial: {
    x: '-100%',
    skewX: -15,
  },
  animate: {
    x: '100%',
    skewX: -15,
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};
