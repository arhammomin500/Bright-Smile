import { motion, type Variants, type MotionProps } from 'framer-motion';
import { Box, type BoxProps } from '@mui/material';
import type { ReactNode } from 'react';

// DOM event handlers whose names collide with framer-motion's own props.
type ConflictingHandlers = 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd';
type MotionBoxProps = Omit<BoxProps, ConflictingHandlers> & MotionProps;

// A motion-wrapped Box that accepts both MUI `sx` and framer-motion props.
const MotionBox = motion.create(Box) as React.FC<MotionBoxProps>;

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface RevealProps extends Omit<BoxProps, ConflictingHandlers> {
  children: ReactNode;
  delayIndex?: number;
  once?: boolean;
}

// Fade + rise element as it scrolls into view.
export function Reveal({ children, delayIndex = 0, once = true, ...boxProps }: RevealProps) {
  return (
    <MotionBox
      variants={variants}
      custom={delayIndex}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      {...boxProps}
    >
      {children}
    </MotionBox>
  );
}
