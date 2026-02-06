"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { aboutData, personalInfo } from "@/constants";
import dynamic from "next/dynamic";

const JourneyMap = dynamic(() => import("@/components/ui/JourneyMap"), {
  ssr: false,
  loading: () => (
    <div className="glass-card p-6 mb-8">
      <div className="w-full h-48 rounded-lg bg-[#0d1117] animate-pulse mb-4" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  ),
});

function AnimatedCounter({ value, isInView }: { value: string; isInView: boolean }) {
  const match = value.match(/^(\d+)(.*)$/);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const animate = useCallback(() => {
    if (!match || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
  }, [match, target]);

  useEffect(() => {
    if (isInView) animate();
  }, [isInView, animate]);

  if (!match) return <>{value}</>;
  return <>{count}{suffix}</>;
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d9ff]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-[#00d9ff] font-mono mb-2"
            >
              &lt;about&gt;
            </motion.p>
            <h2 className="section-title gradient-text">About Me</h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              Get to know more about my journey, experience, and what drives me as a developer.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="glass-card p-8 relative overflow-hidden">

                {/* Profile Image with Rotating Hover Effect */}
                <div
                  className="relative w-48 h-48 mx-auto mb-6 cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setIsHovered((prev) => !prev)}
                >
                  {/* Rotating Border */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] p-1"
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <div className="w-full h-full rounded-full bg-[#0a0a0f] overflow-hidden">
                      {/* CK Initials - shown when not hovered */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]"
                        initial={{ opacity: 1 }}
                        animate={{
                          opacity: isHovered ? 0 : 1,
                          scale: isHovered ? 0.8 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <span className="text-6xl font-bold gradient-text">
                          {personalInfo.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </motion.div>

                      {/* Profile Image - shown on hover */}
                      <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          scale: isHovered ? 1 : 1.2,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src="/images/ck-professional-hd.JPG"
                          alt="Chandan Kumar"
                          fill
                          className="object-cover rounded-full"
                          sizes="192px"
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Glow Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ boxShadow: "0 0 0 rgba(0, 217, 255, 0)" }}
                    animate={{
                      boxShadow: isHovered
                        ? "0 0 30px var(--primary), 0 0 60px var(--secondary)"
                        : "0 0 0 rgba(0, 217, 255, 0)"
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Status indicator */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0a0a0f] pulse-glow z-10" />

                  {/* Hover hint */}
                  <motion.p
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Tap or hover to reveal
                  </motion.p>
                </div>

                <h3 className="text-2xl font-bold text-center text-white mb-2">
                  {personalInfo.name}
                </h3>
                <p className="text-[#00d9ff] text-center mb-4">{personalInfo.title}</p>
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{personalInfo.location}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {aboutData.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-center p-4 rounded-lg bg-[#00d9ff]/5 border border-[#00d9ff]/10"
                    >
                      <div className="text-2xl font-bold text-[#00d9ff]">
                        <AnimatedCounter value={stat.value} isInView={isInView} />
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - About Text & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Summary */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-[#00d9ff]" />
                  Who I Am
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {aboutData.summary}
                </p>
              </div>

              {/* Journey Map & Locations */}
              <JourneyMap />

              {/* Contact CTA */}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
                className="glow-btn inline-flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Let&apos;s Connect
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Closing tag */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-[#00d9ff] font-mono text-center mt-16"
          >
            &lt;/about&gt;
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
