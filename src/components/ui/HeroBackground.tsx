"use client";

import { useEffect, useRef, useMemo } from "react";
import { useTheme, ThemeName } from "@/context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  char?: string;
  trail?: number[];
  angle?: number;
  vx?: number;
  vy?: number;
  life?: number;
  maxLife?: number;
  hue?: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, colors } = useTheme();
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Matrix characters for code rain effects
  const matrixChars = useMemo(() =>
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]();:=+-*/&|!?@#$%",
    []
  );

  // Code snippets for cyan theme
  const codeSnippets = useMemo(() => [
    "const", "let", "function", "return", "async", "await", "import", "export",
    "class", "interface", "type", "{}", "[]", "=>", "===", "!==", "&&", "||",
    "npm", "git", "push", "pull", "merge", "deploy", "<div>", "</div>", "API",
    "useState", "useEffect", "props", "state", "render", "component", "hook"
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles based on theme
    const initParticles = () => {
      particlesRef.current = [];
      const width = canvas.width;
      const height = canvas.height;

      switch (theme) {
        case "green": // Matrix rain
          const columns = Math.floor(width / 20);
          for (let i = 0; i < columns; i++) {
            particlesRef.current.push({
              x: i * 20,
              y: Math.random() * height - height,
              speed: 2 + Math.random() * 4,
              size: 14 + Math.random() * 4,
              opacity: 0.5 + Math.random() * 0.5,
              char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
              trail: Array(15).fill(0).map(() => Math.random() * height),
            });
          }
          break;

        case "cyan": // Digital data streams
          const streams = Math.floor(width / 30);
          for (let i = 0; i < streams; i++) {
            particlesRef.current.push({
              x: i * 30 + Math.random() * 15,
              y: Math.random() * height - height,
              speed: 1 + Math.random() * 3,
              size: 12,
              opacity: 0.3 + Math.random() * 0.5,
              char: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
              trail: [],
            });
          }
          // Add floating binary
          for (let i = 0; i < 50; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height,
              speed: 0.5 + Math.random() * 1,
              size: 10,
              opacity: 0.2 + Math.random() * 0.3,
              char: Math.random() > 0.5 ? "1" : "0",
              trail: [],
            });
          }
          break;

        case "purple": // Galaxy stars
          for (let i = 0; i < 200; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height,
              speed: 0.2 + Math.random() * 0.8,
              size: Math.random() * 3,
              opacity: Math.random(),
              angle: Math.random() * Math.PI * 2,
              vx: (Math.random() - 0.5) * 0.5,
              vy: (Math.random() - 0.5) * 0.5,
            });
          }
          // Add shooting stars
          for (let i = 0; i < 5; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height * 0.5,
              speed: 5 + Math.random() * 5,
              size: 2,
              opacity: 0,
              angle: Math.PI / 4 + (Math.random() - 0.5) * 0.5,
              life: 0,
              maxLife: 100 + Math.random() * 100,
            });
          }
          break;

        case "orange": // Sun rays / light beams
          for (let i = 0; i < 30; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: -100,
              speed: 2 + Math.random() * 3,
              size: 100 + Math.random() * 200,
              opacity: 0.03 + Math.random() * 0.05,
              angle: Math.PI / 6 + Math.random() * 0.2,
            });
          }
          // Floating embers
          for (let i = 0; i < 80; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: height + Math.random() * 100,
              speed: 0.5 + Math.random() * 1.5,
              size: 2 + Math.random() * 4,
              opacity: 0.3 + Math.random() * 0.5,
              vx: (Math.random() - 0.5) * 2,
              hue: Math.random() * 30, // orange to yellow variation
            });
          }
          break;

        case "pink": // Sparkles and bubbles
          for (let i = 0; i < 100; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: height + Math.random() * 100,
              speed: 0.5 + Math.random() * 1.5,
              size: 3 + Math.random() * 8,
              opacity: 0.2 + Math.random() * 0.5,
              vx: (Math.random() - 0.5) * 1,
              angle: 0,
              life: Math.random() * 360,
            });
          }
          // Sparkle particles
          for (let i = 0; i < 50; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height,
              speed: 0,
              size: 1 + Math.random() * 2,
              opacity: 0,
              life: Math.random() * 100,
              maxLife: 100,
            });
          }
          break;

        case "marvel": // Energy blast particles + flying sparks
          // Central energy orbs
          for (let i = 0; i < 8; i++) {
            particlesRef.current.push({
              x: width * 0.5 + (Math.random() - 0.5) * 200,
              y: height * 0.5 + (Math.random() - 0.5) * 200,
              speed: 1 + Math.random() * 2,
              size: 20 + Math.random() * 40,
              opacity: 0.4 + Math.random() * 0.4,
              angle: Math.random() * Math.PI * 2,
              vx: (Math.random() - 0.5) * 3,
              vy: (Math.random() - 0.5) * 3,
              life: Math.random() * 200,
              maxLife: 200,
            });
          }
          // Flying energy sparks
          for (let i = 0; i < 120; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height,
              speed: 2 + Math.random() * 4,
              size: 1 + Math.random() * 3,
              opacity: 0.5 + Math.random() * 0.5,
              angle: Math.random() * Math.PI * 2,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              hue: Math.random() > 0.5 ? 0 : 45, // red or gold
            });
          }
          break;

        case "spiderman": // Web lines + floating particles
          // Web anchor points
          for (let i = 0; i < 12; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height,
              speed: 0.3 + Math.random() * 0.5,
              size: 3,
              opacity: 0.7,
              angle: Math.random() * Math.PI * 2,
              vx: (Math.random() - 0.5) * 1,
              vy: (Math.random() - 0.5) * 1,
              life: 0,
              maxLife: 300 + Math.random() * 200,
            });
          }
          // Floating dust/debris
          for (let i = 0; i < 80; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height,
              speed: 0.3 + Math.random() * 0.8,
              size: 1 + Math.random() * 2,
              opacity: 0.2 + Math.random() * 0.4,
              vx: (Math.random() - 0.5) * 0.5,
              vy: Math.random() * 0.5,
              hue: Math.random() > 0.6 ? 0 : 220, // red or blue
            });
          }
          break;

        case "hanuman": // Divine flames + rising sacred particles
          // Sacred flames rising from bottom
          for (let i = 0; i < 60; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: height + Math.random() * 100,
              speed: 1.5 + Math.random() * 3,
              size: 4 + Math.random() * 10,
              opacity: 0.4 + Math.random() * 0.5,
              vx: (Math.random() - 0.5) * 2,
              hue: Math.random() * 40, // orange to deep orange
              life: Math.random() * 100,
              maxLife: 100 + Math.random() * 100,
            });
          }
          // Sacred golden orbs
          for (let i = 0; i < 30; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height,
              speed: 0.5 + Math.random() * 1,
              size: 2 + Math.random() * 5,
              opacity: 0.3 + Math.random() * 0.5,
              angle: Math.random() * Math.PI * 2,
              vx: (Math.random() - 0.5) * 0.8,
              vy: (Math.random() - 0.5) * 0.8,
            });
          }
          // Trident sparks (rare bright flashes)
          for (let i = 0; i < 5; i++) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * height * 0.5,
              speed: 0,
              size: 2,
              opacity: 0,
              life: Math.random() * 150,
              maxLife: 150,
              trail: [],
            });
          }
          break;
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      switch (theme) {
        case "green":
          animateMatrix(ctx, canvas.width, canvas.height, colors.primary);
          break;
        case "cyan":
          animateDataStream(ctx, canvas.width, canvas.height, colors.primary);
          break;
        case "purple":
          animateGalaxy(ctx, canvas.width, canvas.height, colors);
          break;
        case "orange":
          animateSunRays(ctx, canvas.width, canvas.height, colors);
          break;
        case "pink":
          animateBubbles(ctx, canvas.width, canvas.height, colors);
          break;
        case "marvel":
          animateMarvel(ctx, canvas.width, canvas.height, colors);
          break;
        case "spiderman":
          animateSpiderman(ctx, canvas.width, canvas.height, colors);
          break;
        case "hanuman":
          animateHanuman(ctx, canvas.width, canvas.height, colors);
          break;
      }

    };

    const animateMatrix = (ctx: CanvasRenderingContext2D, width: number, height: number, color: string) => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        // Draw trail
        if (particle.trail) {
          for (let i = 0; i < 15; i++) {
            const trailY = particle.y - i * particle.size;
            const alpha = (1 - i / 15) * particle.opacity * 0.5;
            ctx.fillStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
            ctx.font = `${particle.size}px monospace`;
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            ctx.fillText(char, particle.x, trailY);
          }
        }

        // Draw main character (brighter)
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.font = `bold ${particle.size}px monospace`;
        particle.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(particle.char, particle.x, particle.y);
        ctx.shadowBlur = 0;

        // Update position
        particle.y += particle.speed;
        if (particle.y > height + 100) {
          particle.y = -100;
          particle.speed = 2 + Math.random() * 4;
        }
      });
    };

    const animateDataStream = (ctx: CanvasRenderingContext2D, width: number, height: number, color: string) => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.08)";
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, "0")}`;
        ctx.font = `${particle.size}px "Courier New", monospace`;

        // Add glow for code snippets
        if (particle.char && particle.char.length > 1) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 8;
        }

        ctx.fillText(particle.char || "", particle.x, particle.y);
        ctx.shadowBlur = 0;

        // Update position
        particle.y += particle.speed;
        if (particle.y > height + 50) {
          particle.y = -50;
          particle.x = Math.random() * width;
          if (particle.char && particle.char.length > 1) {
            particle.char = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          }
        }
      });

      // Draw connection lines occasionally
      ctx.strokeStyle = `${color}15`;
      ctx.lineWidth = 1;
      for (let i = 0; i < particlesRef.current.length; i += 10) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[(i + 5) % particlesRef.current.length];
        if (Math.abs(p1.y - p2.y) < 100) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    };

    const animateGalaxy = (ctx: CanvasRenderingContext2D, width: number, height: number, colors: { primary: string; secondary: string }) => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.03)";
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((particle, index) => {
        if (particle.maxLife !== undefined) {
          // Shooting star
          particle.life = (particle.life || 0) + 1;
          if (particle.life > particle.maxLife) {
            particle.x = Math.random() * width;
            particle.y = Math.random() * height * 0.3;
            particle.life = 0;
            particle.opacity = 0;
          } else if (particle.life > 20) {
            particle.opacity = Math.min(1, particle.opacity + 0.05);
            particle.x += Math.cos(particle.angle || 0) * particle.speed;
            particle.y += Math.sin(particle.angle || 0) * particle.speed;

            // Draw shooting star trail
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              particle.x - Math.cos(particle.angle || 0) * 50,
              particle.y - Math.sin(particle.angle || 0) * 50
            );
            gradient.addColorStop(0, `${colors.primary}ff`);
            gradient.addColorStop(1, `${colors.primary}00`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = particle.size;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(
              particle.x - Math.cos(particle.angle || 0) * 50,
              particle.y - Math.sin(particle.angle || 0) * 50
            );
            ctx.stroke();
          }
        } else {
          // Regular star
          particle.angle = (particle.angle || 0) + 0.01;
          const twinkle = Math.sin(particle.angle * 3 + index) * 0.3 + 0.7;

          particle.x += particle.vx || 0;
          particle.y += particle.vy || 0;

          // Wrap around
          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;

          // Draw star with glow
          const starColor = index % 3 === 0 ? colors.primary : index % 3 === 1 ? colors.secondary : "#ffffff";
          ctx.fillStyle = starColor;
          ctx.globalAlpha = particle.opacity * twinkle;
          ctx.shadowColor = starColor;
          ctx.shadowBlur = particle.size * 2;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      });

      // Draw nebula clouds
      const time = Date.now() * 0.0005;
      for (let i = 0; i < 3; i++) {
        const x = width * 0.5 + Math.sin(time + i) * width * 0.3;
        const y = height * 0.4 + Math.cos(time + i * 2) * height * 0.2;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 200);
        gradient.addColorStop(0, `${colors.primary}08`);
        gradient.addColorStop(0.5, `${colors.secondary}04`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const animateSunRays = (ctx: CanvasRenderingContext2D, width: number, height: number, colors: { primary: string; secondary: string }) => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((particle, index) => {
        if (particle.size > 50) {
          // Light beam
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y,
            particle.x + Math.cos(particle.angle || 0) * particle.size,
            particle.y + particle.size * 2
          );
          gradient.addColorStop(0, `${colors.primary}00`);
          gradient.addColorStop(0.5, `${colors.primary}${Math.floor(particle.opacity * 255).toString(16).padStart(2, "0")}`);
          gradient.addColorStop(1, `${colors.secondary}00`);

          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.angle || 0);
          ctx.fillStyle = gradient;
          ctx.fillRect(-20, 0, 40, particle.size * 3);
          ctx.restore();

          particle.y += particle.speed;
          if (particle.y > height) {
            particle.y = -particle.size;
            particle.x = Math.random() * width;
          }
        } else {
          // Floating ember
          particle.x += particle.vx || 0;
          particle.y -= particle.speed;
          particle.vx = (particle.vx || 0) + (Math.random() - 0.5) * 0.1;
          particle.opacity *= 0.999;

          if (particle.y < -50 || particle.opacity < 0.1) {
            particle.y = height + 50;
            particle.x = Math.random() * width;
            particle.opacity = 0.3 + Math.random() * 0.5;
            particle.vx = (Math.random() - 0.5) * 2;
          }

          // Draw ember with glow
          const hueOffset = particle.hue || 0;
          const emberColor = `hsl(${25 + hueOffset}, 100%, 60%)`;
          ctx.fillStyle = emberColor;
          ctx.globalAlpha = particle.opacity;
          ctx.shadowColor = colors.primary;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      });
    };

    const animateBubbles = (ctx: CanvasRenderingContext2D, width: number, height: number, colors: { primary: string; secondary: string; accent: string }) => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.04)";
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((particle, index) => {
        if (particle.maxLife !== undefined) {
          // Sparkle
          particle.life = (particle.life || 0) + 1;
          if (particle.life > particle.maxLife) {
            particle.x = Math.random() * width;
            particle.y = Math.random() * height;
            particle.life = 0;
          }

          const sparklePhase = (particle.life / particle.maxLife) * Math.PI;
          const sparkleOpacity = Math.sin(sparklePhase);

          if (sparkleOpacity > 0.1) {
            const sparkleColor = index % 2 === 0 ? colors.primary : colors.accent;
            ctx.fillStyle = sparkleColor;
            ctx.globalAlpha = sparkleOpacity * 0.8;
            ctx.shadowColor = sparkleColor;
            ctx.shadowBlur = 10;

            // Draw 4-point star
            ctx.beginPath();
            const size = particle.size * sparkleOpacity;
            ctx.moveTo(particle.x, particle.y - size * 2);
            ctx.lineTo(particle.x + size * 0.5, particle.y);
            ctx.lineTo(particle.x, particle.y + size * 2);
            ctx.lineTo(particle.x - size * 0.5, particle.y);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(particle.x - size * 2, particle.y);
            ctx.lineTo(particle.x, particle.y + size * 0.5);
            ctx.lineTo(particle.x + size * 2, particle.y);
            ctx.lineTo(particle.x, particle.y - size * 0.5);
            ctx.closePath();
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        } else {
          // Bubble
          particle.life = (particle.life || 0) + 2;
          particle.x += particle.vx || 0;
          particle.y -= particle.speed;
          particle.vx = Math.sin(particle.life * 0.02) * 0.5;

          if (particle.y < -50) {
            particle.y = height + 50;
            particle.x = Math.random() * width;
          }

          // Draw bubble
          const bubbleColor = index % 3 === 0 ? colors.primary : index % 3 === 1 ? colors.secondary : colors.accent;
          ctx.strokeStyle = bubbleColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = particle.opacity * 0.6;
          ctx.shadowColor = bubbleColor;
          ctx.shadowBlur = 8;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.stroke();

          // Add highlight
          ctx.fillStyle = `${bubbleColor}40`;
          ctx.beginPath();
          ctx.arc(
            particle.x - particle.size * 0.3,
            particle.y - particle.size * 0.3,
            particle.size * 0.2,
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      });
    };

    const animateMarvel = (ctx: CanvasRenderingContext2D, width: number, height: number, colors: { primary: string; secondary: string; accent: string }) => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.08)";
      ctx.fillRect(0, 0, width, height);

      const time = Date.now() * 0.001;

      particlesRef.current.forEach((particle) => {
        if (particle.maxLife !== undefined) {
          // Energy orbs — large pulsing circles
          particle.life = (particle.life || 0) + 1;
          if (particle.life > particle.maxLife) {
            particle.life = 0;
            particle.x = width * 0.5 + (Math.random() - 0.5) * 400;
            particle.y = height * 0.5 + (Math.random() - 0.5) * 400;
          }
          particle.x += particle.vx || 0;
          particle.y += particle.vy || 0;
          // Bounce off edges
          if (particle.x < 0 || particle.x > width) particle.vx = -(particle.vx || 0);
          if (particle.y < 0 || particle.y > height) particle.vy = -(particle.vy || 0);

          const pulse = Math.sin(time * 2 + (particle.life || 0) * 0.05) * 0.3 + 0.7;
          const grad = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * pulse);
          grad.addColorStop(0, `${colors.primary}40`);
          grad.addColorStop(0.5, `${colors.secondary}20`);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Flying energy sparks
          particle.x += particle.vx || 0;
          particle.y += particle.vy || 0;
          particle.opacity *= 0.995;

          if (particle.x < 0 || particle.x > width || particle.y < 0 || particle.y > height || particle.opacity < 0.1) {
            particle.x = Math.random() * width;
            particle.y = Math.random() * height;
            particle.vx = (Math.random() - 0.5) * 4;
            particle.vy = (Math.random() - 0.5) * 4;
            particle.opacity = 0.5 + Math.random() * 0.5;
          }

          const sparkColor = (particle.hue || 0) > 20 ? colors.secondary : colors.primary;
          ctx.fillStyle = sparkColor;
          ctx.globalAlpha = particle.opacity;
          ctx.shadowColor = sparkColor;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      });

      // Pulsing energy ring in center
      const ringPulse = Math.sin(time * 1.5) * 0.3 + 0.7;
      ctx.strokeStyle = `${colors.primary}30`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.5, 150 * ringPulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `${colors.secondary}20`;
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.5, 250 * ringPulse, 0, Math.PI * 2);
      ctx.stroke();
    };

    const animateSpiderman = (ctx: CanvasRenderingContext2D, width: number, height: number, colors: { primary: string; secondary: string }) => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.06)";
      ctx.fillRect(0, 0, width, height);

      const time = Date.now() * 0.001;
      const anchors: { x: number; y: number }[] = [];

      particlesRef.current.forEach((particle) => {
        if (particle.maxLife !== undefined) {
          // Web anchor points — move slowly, track position
          particle.life = (particle.life || 0) + 1;
          particle.x += particle.vx || 0;
          particle.y += particle.vy || 0;

          if (particle.x < 0 || particle.x > width) particle.vx = -(particle.vx || 0);
          if (particle.y < 0 || particle.y > height) particle.vy = -(particle.vy || 0);

          if (particle.life > particle.maxLife) {
            particle.life = 0;
            particle.x = Math.random() * width;
            particle.y = Math.random() * height;
          }

          anchors.push({ x: particle.x, y: particle.y });

          // Draw anchor glow
          ctx.fillStyle = colors.primary;
          ctx.globalAlpha = 0.6;
          ctx.shadowColor = colors.primary;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        } else {
          // Floating debris
          particle.x += particle.vx || 0;
          particle.y += particle.vy || 0;
          if (particle.y > height) { particle.y = -10; particle.x = Math.random() * width; }
          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;

          const col = (particle.hue || 0) > 100 ? colors.secondary : colors.primary;
          ctx.fillStyle = col;
          ctx.globalAlpha = particle.opacity;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      // Draw web lines between nearby anchors
      ctx.strokeStyle = `${colors.primary}25`;
      ctx.lineWidth = 1;
      for (let i = 0; i < anchors.length; i++) {
        for (let j = i + 1; j < anchors.length; j++) {
          const dx = anchors[i].x - anchors[j].x;
          const dy = anchors[i].y - anchors[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 350) {
            const alpha = Math.floor((1 - dist / 350) * 60);
            ctx.strokeStyle = `${colors.primary}${alpha.toString(16).padStart(2, "0")}`;
            ctx.beginPath();
            ctx.moveTo(anchors[i].x, anchors[i].y);
            // Curved web line using quadratic bezier
            const midX = (anchors[i].x + anchors[j].x) / 2 + Math.sin(time + i) * 20;
            const midY = (anchors[i].y + anchors[j].y) / 2 + Math.cos(time + j) * 20;
            ctx.quadraticCurveTo(midX, midY, anchors[j].x, anchors[j].y);
            ctx.stroke();
          }
        }
      }

      // Radial web pattern from center (subtle)
      const cx = width * 0.5;
      const cy = height * 0.5;
      ctx.strokeStyle = `${colors.secondary}10`;
      ctx.lineWidth = 0.5;
      for (let ring = 1; ring <= 5; ring++) {
        ctx.beginPath();
        ctx.arc(cx, cy, ring * 80, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (let spoke = 0; spoke < 12; spoke++) {
        const angle = (spoke / 12) * Math.PI * 2 + time * 0.1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * 400, cy + Math.sin(angle) * 400);
        ctx.stroke();
      }
    };

    const animateHanuman = (ctx: CanvasRenderingContext2D, width: number, height: number, colors: { primary: string; secondary: string; accent: string }) => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.06)";
      ctx.fillRect(0, 0, width, height);

      const time = Date.now() * 0.001;

      particlesRef.current.forEach((particle, index) => {
        if (particle.trail !== undefined) {
          // Trident sparks — rare bright flashes
          particle.life = (particle.life || 0) + 1;
          if (particle.life > (particle.maxLife || 150)) {
            particle.life = 0;
            particle.x = Math.random() * width;
            particle.y = Math.random() * height * 0.6;
          }
          const phase = ((particle.life || 0) / (particle.maxLife || 150)) * Math.PI;
          const flashOpacity = Math.sin(phase);
          if (flashOpacity > 0.5) {
            // Draw cross/trident flash
            const s = 15 * flashOpacity;
            ctx.strokeStyle = colors.secondary;
            ctx.lineWidth = 2;
            ctx.globalAlpha = flashOpacity * 0.8;
            ctx.shadowColor = colors.secondary;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.moveTo(particle.x - s, particle.y);
            ctx.lineTo(particle.x + s, particle.y);
            ctx.moveTo(particle.x, particle.y - s * 1.5);
            ctx.lineTo(particle.x, particle.y + s);
            ctx.stroke();
            // Trident prongs
            ctx.beginPath();
            ctx.moveTo(particle.x - s * 0.5, particle.y - s * 1.2);
            ctx.lineTo(particle.x - s * 0.5, particle.y - s * 0.5);
            ctx.moveTo(particle.x + s * 0.5, particle.y - s * 1.2);
            ctx.lineTo(particle.x + s * 0.5, particle.y - s * 0.5);
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        } else if (particle.maxLife !== undefined) {
          // Sacred flames — rising from bottom
          particle.life = (particle.life || 0) + 1;
          particle.y -= particle.speed;
          particle.x += Math.sin(time * 2 + index) * 0.8 + (particle.vx || 0) * 0.3;
          particle.size *= 0.997;
          particle.opacity *= 0.998;

          if (particle.y < -50 || particle.opacity < 0.05 || particle.life > particle.maxLife) {
            particle.y = height + Math.random() * 50;
            particle.x = Math.random() * width;
            particle.size = 4 + Math.random() * 10;
            particle.opacity = 0.4 + Math.random() * 0.5;
            particle.life = 0;
          }

          const hueOff = particle.hue || 0;
          const flameColor = `hsl(${25 + hueOff}, 100%, ${50 + Math.sin(time * 3 + index) * 15}%)`;
          ctx.fillStyle = flameColor;
          ctx.globalAlpha = particle.opacity;
          ctx.shadowColor = colors.primary;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        } else {
          // Sacred golden orbs — floating serenely
          particle.angle = (particle.angle || 0) + 0.008;
          particle.x += Math.sin(particle.angle + index) * 0.5 + (particle.vx || 0);
          particle.y += Math.cos(particle.angle + index) * 0.5 + (particle.vy || 0);

          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;

          const glow = Math.sin(particle.angle * 2 + index) * 0.3 + 0.7;
          ctx.fillStyle = colors.secondary;
          ctx.globalAlpha = particle.opacity * glow;
          ctx.shadowColor = colors.secondary;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      });

      // Sacred aura ring at bottom center
      const auraY = height * 0.85;
      const auraX = width * 0.5;
      const auraPulse = Math.sin(time) * 0.2 + 0.8;
      const auraGrad = ctx.createRadialGradient(auraX, auraY, 0, auraX, auraY, 300 * auraPulse);
      auraGrad.addColorStop(0, `${colors.primary}15`);
      auraGrad.addColorStop(0.4, `${colors.secondary}08`);
      auraGrad.addColorStop(1, "transparent");
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, width, height);
    };

    // Skip animation if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      ctx.fillStyle = "rgba(10, 10, 15, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return () => window.removeEventListener("resize", resizeCanvas);
    }

    // FPS throttling - cap at 30fps
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const throttledAnimate = (timestamp: number) => {
      animationRef.current = requestAnimationFrame(throttledAnimate);
      const delta = timestamp - lastFrameTime;
      if (delta < frameInterval) return;
      lastFrameTime = timestamp - (delta % frameInterval);
      animate();
    };

    // Pause animation when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      } else {
        if (!animationRef.current) {
          lastFrameTime = 0;
          animationRef.current = requestAnimationFrame(throttledAnimate);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start animation
    animationRef.current = requestAnimationFrame(throttledAnimate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, colors, matrixChars, codeSnippets]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
