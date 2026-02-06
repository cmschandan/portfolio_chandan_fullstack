"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const isTouchDevice = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    // Skip on touch devices
    isTouchDevice.current = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice.current) return;

    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && isTouchDevice.current) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9998]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Outer soft glow */}
      <div
        className="w-[300px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 217, 255, 0.06) 0%, rgba(124, 58, 237, 0.03) 40%, transparent 70%)",
        }}
      />
      {/* Inner bright dot */}
      <div
        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "rgba(0, 217, 255, 0.4)",
          boxShadow: "0 0 8px rgba(0, 217, 255, 0.3), 0 0 20px rgba(0, 217, 255, 0.1)",
        }}
      />
    </motion.div>
  );
}
