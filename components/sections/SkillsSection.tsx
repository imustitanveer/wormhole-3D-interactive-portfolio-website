"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { capabilities, type Capability } from "./skills";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingReveal: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const accentStyles: Record<Capability["accent"], { label: string; glow: string; dot: string }> = {
  pink: {
    label: "text-pink-200/75",
    glow: "from-pink-400/15 via-fuchsia-400/[0.04]",
    dot: "bg-pink-300 shadow-[0_0_14px_rgba(249,168,212,0.75)]",
  },
  violet: {
    label: "text-violet-200/75",
    glow: "from-violet-400/15 via-purple-400/[0.04]",
    dot: "bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.75)]",
  },
  blue: {
    label: "text-blue-200/75",
    glow: "from-blue-400/15 via-indigo-400/[0.04]",
    dot: "bg-blue-300 shadow-[0_0_14px_rgba(147,197,253,0.75)]",
  },
};

const pillToneClasses: Record<Capability["tone"], string> = {
  green: "border-emerald-400/15 bg-emerald-500/20 text-emerald-300",
  blue: "border-sky-400/15 bg-sky-500/20 text-sky-300",
  purple: "border-purple-400/15 bg-purple-500/20 text-purple-300",
  amber: "border-amber-400/15 bg-amber-500/20 text-amber-300",
};

function SkillCard({
  capability,
  reducedMotion,
  cardRef,
}: {
  capability: Capability;
  reducedMotion: boolean;
  cardRef: (node: HTMLElement | null) => void;
}) {
  const accent = accentStyles[capability.accent];
  const pillTone = pillToneClasses[capability.tone];

  return (
    <motion.article
      ref={cardRef}
      variants={reveal}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${capability.layout} group relative flex min-h-[320px] w-[88vw] max-w-[420px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 md:w-auto md:max-w-none md:shrink md:p-8`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 80px rgba(0,0,0,0.24)",
      }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${accent.glow} to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[27px] ring-1 ring-inset ring-white/[0.025]"
      />

      <div className="relative flex items-center justify-between gap-4 font-mono text-[0.68rem] tracking-[0.2em] uppercase">
        <span className={accent.label}>Capability</span>
        <span className="flex items-center gap-2 text-white/35">
          <span className={`size-1.5 rounded-full ${accent.dot}`} />
          {capability.number}
        </span>
      </div>

      <div className="relative mt-10">
        <h3 className="max-w-[16ch] text-3xl leading-[1.02] font-semibold tracking-[-0.04em] text-white md:text-[2.15rem]">
          {capability.title}
        </h3>
        <p className="mt-4 max-w-[55ch] text-sm leading-6 text-white/58 md:text-[0.95rem]">
          {capability.description}
        </p>
      </div>

      <ul className="relative mt-auto flex flex-wrap gap-2 pt-8" aria-label={`${capability.title} skills`}>
        {capability.skills.map((skill) => (
          <li
            key={skill}
            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs leading-4 font-medium ${pillTone}`}
          >
            {skill}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [activeCard, setActiveCard] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const intersectionRatios = useRef(capabilities.map(() => 0));

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLElement);
          if (index >= 0) intersectionRatios.current[index] = entry.intersectionRatio;
        });

        const nextActive = intersectionRatios.current.reduce(
          (bestIndex, ratio, index, ratios) =>
            ratio > ratios[bestIndex] ? index : bestIndex,
          0,
        );
        setActiveCard((current) => (current === nextActive ? current : nextActive));
      },
      { root: carousel, threshold: [0.35, 0.5, 0.65, 0.8] },
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="pointer-events-auto relative z-[4] bg-transparent px-5 pt-40 pb-8 text-white sm:px-7 md:px-[clamp(2rem,6vw,6rem)] md:pb-9"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,rgba(133,75,225,0.12),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(52,113,255,0.09),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <motion.h2
          id="skills-heading"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingReveal}
          className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl"
        >
          Skills
        </motion.h2>

        <motion.div
          ref={carouselRef}
          variants={stagger}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          aria-label="Skills carousel"
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-12 md:grid md:grid-cols-12 md:gap-5 md:overflow-visible md:pb-0"
        >
          {capabilities.map((capability, index) => (
            <SkillCard
              key={capability.title}
              capability={capability}
              reducedMotion={shouldReduceMotion}
              cardRef={(node) => {
                cardRefs.current[index] = node;
              }}
            />
          ))}
        </motion.div>

        <div className="mt-2 flex items-center justify-between md:hidden" aria-label={`Skill ${activeCard + 1} of ${capabilities.length}`}>
          <p className="font-mono text-[0.62rem] tracking-[0.18em] text-white/45 tabular-nums">
            {String(activeCard + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {capabilities.map((capability, index) => (
              <span
                key={capability.title}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${index === activeCard ? "w-5 bg-violet-300" : "w-1.5 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
