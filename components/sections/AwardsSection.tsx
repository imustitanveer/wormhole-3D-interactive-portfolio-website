"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CircleImage } from "@/components/ui/CircleImage";
import { awards } from "./awards";
import { tagToneClasses } from "./tagStyles";

const ease = [0.22, 1, 0.36, 1] as const;

export function AwardsSection() {
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
      id="awards"
      aria-labelledby="awards-heading"
      className="pointer-events-auto relative z-[4] bg-transparent px-5 py-8 text-white sm:px-7 md:px-[clamp(2rem,6vw,6rem)] md:py-9"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.h2
          id="awards-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={headingReveal}
          className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl"
        >
          Awards
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
            className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-sky-400/[0.07] via-violet-400/[0.025] to-transparent"
          />

          <div className="relative">
            {awards.map((award, index) => (
              <motion.article
                key={award.title}
                variants={rowReveal}
                className={`grid gap-4 py-7 sm:grid-cols-[4rem_minmax(0,1fr)] md:grid-cols-[4rem_minmax(0,1fr)_auto] md:gap-6 md:py-9 ${index < awards.length - 1 ? "border-b border-white/10" : ""}`}
              >
                <CircleImage src={award.image} alt={award.alt} size="sm" />

                <div className="min-w-0">
                  <h3 className="text-xl leading-tight font-semibold tracking-[-0.025em] text-white md:text-2xl">
                    {award.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/62">{award.subtitle}</p>
                  <p className="mt-3 text-sm text-white/45">
                    {award.organization} <span aria-hidden="true">·</span> {award.location}
                  </p>
                  <time className="mt-2 block font-mono text-[0.66rem] tracking-[0.13em] text-white/45 md:hidden">
                    {award.date}
                  </time>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${award.title} skills`}>
                    {award.tags.map((tag) => (
                      <li
                        key={tag}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium ${tagToneClasses[award.tone]}`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <time className="hidden pt-1 text-right font-mono text-[0.68rem] tracking-[0.13em] whitespace-nowrap text-white/50 md:block">
                  {award.date}
                </time>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
