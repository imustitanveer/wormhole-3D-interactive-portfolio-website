"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { CircleImage } from "@/components/ui/CircleImage";
import type { EducationEntry } from "./education";
import { tagToneClasses } from "./tagStyles";

const ease = [0.22, 1, 0.36, 1] as const;

export function EducationRow({
  entry,
  reducedMotion,
  isLast,
  variants,
}: {
  entry: EducationEntry;
  reducedMotion: boolean;
  isLast: boolean;
  variants: Variants;
}) {
  const [expanded, setExpanded] = useState(false);
  const contentId = `${entry.id}-coursework`;

  return (
    <motion.article
      layout={reducedMotion ? false : "position"}
      variants={variants}
      className={`relative py-7 md:py-9 ${isLast ? "" : "border-b border-white/10"}`}
    >
      <div className="grid gap-4 sm:grid-cols-[4rem_minmax(0,1fr)] md:grid-cols-[4rem_minmax(0,1fr)_auto] md:gap-6">
        <CircleImage src={entry.image} alt={`${entry.institute} logo`} size="sm" />

        <div className="min-w-0">
          <h3 className="text-xl leading-tight font-semibold tracking-[-0.025em] text-white md:text-2xl">
            {entry.degree}
          </h3>
          <p className="mt-2 text-sm text-white/62">{entry.institute}</p>
          <p className="mt-1 text-sm text-white/42">{entry.location}</p>
          <time className="mt-3 block font-mono text-[0.66rem] tracking-[0.12em] text-white/45 md:hidden">
            {entry.duration}
          </time>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded((current) => !current)}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 md:hidden"
          >
            {expanded ? "Hide coursework" : "View coursework"}
            <motion.span
              aria-hidden="true"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease }}
            >
              <ChevronDown className="size-4" />
            </motion.span>
          </button>
        </div>

        <div className="hidden min-w-[10rem] flex-col items-end gap-5 text-right md:flex">
          <time className="font-mono text-[0.68rem] tracking-[0.12em] whitespace-nowrap text-white/50">
            {entry.duration}
          </time>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          >
            {expanded ? "Hide coursework" : "View coursework"}
            <motion.span
              aria-hidden="true"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease }}
            >
              <ChevronDown className="size-4" />
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={contentId}
            key="coursework"
            initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.38, ease }}
            className="overflow-hidden"
          >
            <ul
              className="grid gap-2 pt-6 sm:ml-[5.5rem] md:grid-cols-2 md:gap-x-3 lg:grid-cols-3"
              aria-label={`${entry.degree} coursework`}
            >
              {entry.units.map((unit) => (
                <li
                  key={unit}
                  className={`rounded-xl border px-3 py-2 text-xs leading-5 ${tagToneClasses.slate}`}
                >
                  {unit}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
