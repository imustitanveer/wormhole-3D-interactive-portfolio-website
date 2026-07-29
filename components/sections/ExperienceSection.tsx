"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ExperienceTimelineRow } from "./ExperienceTimelineRow";
import { experienceEntries } from "./experience";

const headingReveal: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const panelReveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.07,
    },
  },
};

export function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="pointer-events-auto relative z-[4] min-h-screen bg-transparent px-5 py-24 text-white sm:px-7 md:px-[clamp(2rem,6vw,6rem)] md:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(105,72,210,0.1),transparent_30%),radial-gradient(circle_at_12%_76%,rgba(39,104,190,0.08),transparent_32%)]"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <motion.h2
          id="experience-heading"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={headingReveal}
          className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl"
        >
          Experience
        </motion.h2>

        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
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
            className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-violet-400/[0.09] via-blue-400/[0.025] to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-[2.55rem] top-10 w-px bg-gradient-to-b from-violet-300/35 via-white/10 to-transparent md:left-16"
          />

          <div className="relative">
            {experienceEntries.map((entry, index) => (
              <ExperienceTimelineRow
                key={entry.id}
                entry={entry}
                reducedMotion={shouldReduceMotion}
                isLast={index === experienceEntries.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
