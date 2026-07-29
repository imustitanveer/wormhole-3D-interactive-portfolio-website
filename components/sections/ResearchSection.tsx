"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { CircleImage } from "@/components/ui/CircleImage";
import { researchPublications } from "./research";
import { tagToneClasses } from "./tagStyles";

const ease = [0.22, 1, 0.36, 1] as const;

function revealVariants(reducedMotion: boolean, y: number, duration: number): Variants {
  return {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease },
    },
  };
}

export function ResearchSection() {
  const reducedMotion = useReducedMotion() ?? false;
  const publication = researchPublications[0];

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="pointer-events-auto relative z-[4] bg-transparent px-5 py-8 text-white sm:px-7 md:px-[clamp(2rem,6vw,6rem)] md:py-9"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.h2
          id="research-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={revealVariants(reducedMotion, 20, 0.6)}
          className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl"
        >
          Research Publications
        </motion.h2>

        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={revealVariants(reducedMotion, 24, 0.65)}
          className="relative mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-black/35 p-6 backdrop-blur-xl md:mt-14 md:grid md:grid-cols-[9rem_minmax(0,1fr)] md:gap-9 md:p-9 lg:grid-cols-[10rem_minmax(0,1fr)] lg:p-11"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 100px rgba(0,0,0,0.28)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-purple-400/[0.11] via-violet-400/[0.025] to-transparent"
          />

          <div className="relative flex justify-center md:justify-start">
            <CircleImage src={publication.image} alt={publication.alt} size="xl" />
          </div>

          <div className="relative mt-7 min-w-0 md:mt-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] tracking-[0.14em] text-purple-200/70 uppercase">
              <span>{publication.publication}</span>
              <span aria-hidden="true" className="text-white/25">•</span>
              <time>{publication.date}</time>
            </div>
            <h3 className="mt-4 max-w-[28ch] text-2xl leading-[1.08] font-semibold tracking-[-0.035em] text-white sm:text-3xl lg:text-[2.35rem]">
              {publication.title}
            </h3>
            <p className="mt-3 text-sm text-white/50">{publication.authors}</p>

            <div className="mt-6 max-w-3xl space-y-3 text-sm leading-6 text-white/62 md:text-[0.95rem]">
              {publication.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {publication.links.map((link) => {
                const Icon = link.type === "pdf" ? FileText : ExternalLink;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                    {link.label}
                  </a>
                );
              })}
            </div>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Publication topics">
              {publication.tags.map((tag) => (
                <li
                  key={tag}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium ${tagToneClasses.purple}`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
