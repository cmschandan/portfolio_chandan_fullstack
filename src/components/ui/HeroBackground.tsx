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
  const animationRef = useRef<number>();
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
      }

      animationRef.current = requestAnimationFrame(animate);
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

    // Start animation
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
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
