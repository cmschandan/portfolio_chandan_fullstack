"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themes, themeInfo, ThemeName } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme, colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themeNames = Object.keys(themes) as ThemeName[];

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[var(--primary)] transition-all cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ borderColor: isOpen ? colors.primary : undefined }}
      >
        {/* Color Preview Dots */}
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
          <span
            className="w-2 h-2 rounded-full opacity-70"
            style={{ backgroundColor: colors.secondary }}
          />
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 py-2 bg-[#0f0f1a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-white/10">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Choose Theme</p>
            </div>

            {themeNames.map((themeName) => {
              const themeColors = themes[themeName];
              const info = themeInfo[themeName];
              const isActive = theme === themeName;

              return (
                <motion.button
                  key={themeName}
                  onClick={() => {
                    setTheme(themeName);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-3 flex items-center gap-3 transition-all cursor-pointer ${
                    isActive
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  {/* Theme Color Preview */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                    style={{
                      background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
                    }}
                  >
                    {info.icon}
                  </div>

                  {/* Theme Info */}
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-white">{info.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: themeColors.primary }}
                        />
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: themeColors.secondary }}
                        />
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: themeColors.accent }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{info.effect}</span>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}

            {/* Footer */}
            <div className="px-3 py-2 border-t border-white/10 mt-1">
              <p className="text-xs text-gray-500 text-center">Theme saved automatically</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
