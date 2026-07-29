"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EducationRow } from "./EducationRow";
import { educationEntries } from "./education";

const ease = [0.22, 1, 0.36, 1] as const;

export function EducationSection() {
  const reducedMotion = useReducedMotion() ?? false;

  const headingReveal: Variants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease },
    },
  };
  const panelReveal: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.65, ease, staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };
  const rowReveal: Variants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease } },
  };

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="pointer-events-auto relative z-[4] bg-transparent px-5 py-8 text-white sm:px-7 md:px-[clamp(2rem,6vw,6rem)] md:py-9"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.h2
          id="education-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={headingReveal}
          className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl"
        >
          Education
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={panelReveal}
          className="relative mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-black/35 px-5 backdrop-blur-xl md:mt-14 md:px-9"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 100px rgba(0,0,0,0.28)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-violet-400/[0.08] via-blue-400/[0.02] to-transparent"
          />
          <div className="relative">
            {educationEntries.map((entry, index) => (
              <EducationRow
                key={entry.id}
                entry={entry}
                reducedMotion={reducedMotion}
                isLast={index === educationEntries.length - 1}
                variants={rowReveal}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
