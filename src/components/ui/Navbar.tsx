"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, personalInfo } from "@/constants";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.id);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (isOpen) {
      setIsOpen(false);
      // Wait for mobile menu close animation to finish before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 350);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-[#00d9ff]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="text-2xl font-bold gradient-text cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {personalInfo.name.split(" ")[0]}
            <span className="text-[#00d9ff]">.</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`nav-glass-hover px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeSection === link.id
                    ? "text-[#00d9ff] bg-[#00d9ff]/10 border border-[#00d9ff]/30"
                    : "text-gray-300 hover:text-[#00d9ff] border border-transparent hover:border-[#00d9ff]/30 hover:bg-[#00d9ff]/5"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.title}
              </motion.button>
            ))}
            {/* Theme Switcher */}
            <ThemeSwitcher />

            <motion.button
              onClick={() => window.dispatchEvent(new Event("open-resume-viewer"))}
              className="ml-2 glow-btn text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-[#00d9ff]/10 cursor-pointer border border-transparent hover:border-[#00d9ff]/30 hover:bg-[#00d9ff]/15 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className={`block w-5 h-0.5 bg-[#00d9ff] transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-1" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#00d9ff] my-1 transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#00d9ff] transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-[#00d9ff]/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.id)}
                  className={`nav-glass-hover block w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 cursor-pointer ${
                    activeSection === link.id
                      ? "text-[#00d9ff] bg-[#00d9ff]/10 border border-[#00d9ff]/30"
                      : "text-gray-300 hover:text-[#00d9ff] border border-transparent hover:border-[#00d9ff]/30 hover:bg-[#00d9ff]/5"
                  }`}
                >
                  {link.title}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => window.dispatchEvent(new Event("open-resume-viewer")), 350);
                }}
                className="block w-full text-center glow-btn mt-4"
              >
                View Resume
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
