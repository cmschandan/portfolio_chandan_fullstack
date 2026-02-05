"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "@/constants";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00d9ff]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl" />

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
              &lt;experience&gt;
            </motion.p>
            <h2 className="section-title gradient-text">Work Experience</h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              A journey through my professional career, building scalable solutions and leading teams.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center Line - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#00d9ff] via-[#7c3aed] to-[#00d9ff]" />

            {/* Mobile Line */}
            <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00d9ff] via-[#7c3aed] to-[#00d9ff]" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#00d9ff] rounded-full border-4 border-[#0a0a0f] z-10 pulse-glow" />

                  {/* Content Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="glass-card p-6 hover:border-[#00d9ff]/50 transition-all duration-300 group">
                      {/* Duration Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-[#00d9ff]/10 text-[#00d9ff] text-sm font-mono rounded-full">
                          {exp.duration}
                        </span>
                        {index === 0 && (
                          <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Company Info */}
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00d9ff] transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-[#7c3aed] font-medium mt-1">{exp.company}</p>
                      <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {exp.location}
                      </p>

                      {/* Description */}
                      <ul className="mt-4 space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-[#00d9ff] mt-1">▹</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-md border border-white/10 hover:border-[#00d9ff]/50 hover:text-[#00d9ff] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="mt-20"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2 justify-center">
              <svg className="w-5 h-5 text-[#00d9ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              Education
            </h3>
            <div className="glass-card p-6 max-w-md mx-auto text-center">
              <h4 className="text-lg font-semibold text-white">B.A</h4>
              <p className="text-[#7c3aed]">Visthapit College, Bokaro</p>
              <p className="text-gray-400 text-sm">Jharkhand | Jul 2017 – Jun 2021</p>
            </div>
          </motion.div>

          {/* Closing tag */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="text-[#00d9ff] font-mono text-center mt-16"
          >
            &lt;/experience&gt;
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
