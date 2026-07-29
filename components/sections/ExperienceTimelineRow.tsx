"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";
import { CircleImage } from "@/components/ui/CircleImage";
import type { ExperienceEntry, ExperienceRole } from "./experience";

type TagTone = "emerald" | "sky" | "purple" | "amber" | "slate";

const tagToneClasses: Record<TagTone, string> = {
  emerald: "border-emerald-400/15 bg-emerald-500/15 text-emerald-300",
  sky: "border-sky-400/15 bg-sky-500/15 text-sky-300",
  purple: "border-purple-400/15 bg-purple-500/15 text-purple-300",
  amber: "border-amber-400/15 bg-amber-500/15 text-amber-300",
  slate: "border-slate-300/10 bg-slate-300/[0.07] text-slate-300",
};

const tagTones: Record<string, TagTone> = {
  Python: "emerald",
  TensorFlow: "emerald",
  PyTorch: "emerald",
  MLX: "emerald",
  Unsloth: "emerald",
  RAG: "emerald",
  LangChain: "emerald",
  Bark: "emerald",
  "Deep Neural Networks": "emerald",
  "Edge AI": "emerald",
  ONNX: "emerald",
  "Scikit-learn": "emerald",
  Pandas: "emerald",
  FastAPI: "sky",
  "Node.js": "sky",
  MongoDB: "sky",
  ChromaDB: "sky",
  AWS: "sky",
  Docker: "sky",
  cPanel: "sky",
  SQL: "sky",
  "Raspberry Pi": "sky",
  "Embedded Systems": "sky",
  React: "purple",
  "Next.js": "purple",
  JavaScript: "purple",
  TypeScript: "purple",
  "Tailwind CSS": "purple",
  "Technical Discovery": "amber",
  "Solution Architecture": "amber",
  "Stakeholder Management": "amber",
  "Rapid Prototyping": "amber",
  "Startup Incubation": "amber",
  "Pitching & Fundraising": "amber",
  "Market Research": "amber",
  "Business Development": "amber",
  "Lean Startup": "amber",
  "Client Communication": "amber",
  Negotiation: "amber",
  "Risk Management": "amber",
  Documentation: "slate",
};

export const timelineRowReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function CompanyLogo({ entry }: { entry: ExperienceEntry }) {
  return (
    <CircleImage
      src={entry.logo}
      alt={`${entry.company} logo`}
      size="sm"
      className="z-10 shadow-[0_0_0_5px_rgba(3,2,7,0.72),0_8px_30px_rgba(0,0,0,0.22)]"
    />
  );
}

function ExperienceTags({ tags, limit }: { tags: string[]; limit?: number }) {
  const visibleTags = typeof limit === "number" ? tags.slice(0, limit) : tags;

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies and capabilities">
      {visibleTags.map((tag) => (
        <li
          key={tag}
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.68rem] leading-4 font-medium ${tagToneClasses[tagTones[tag] ?? "slate"]}`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function RoleDetails({ role, showHeading = true }: { role: ExperienceRole; showHeading?: boolean }) {
  return (
    <div>
      {showHeading && (
        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-xl leading-tight font-semibold tracking-[-0.025em] text-white md:text-2xl">
              {role.title}
            </h3>
            {role.current && (
              <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-1 font-mono text-[0.54rem] tracking-[0.14em] text-emerald-200 uppercase">
                Current
              </span>
            )}
          </div>
          <p className="font-mono text-[0.6rem] tracking-[0.1em] text-white/42 uppercase md:pt-1">
            {role.date}
          </p>
        </div>
      )}

      <ul className="mt-4 space-y-2 text-sm leading-6 text-white/60">
        {role.bullets.slice(0, 3).map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.65rem] size-1 shrink-0 rounded-full bg-violet-300/65" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <ExperienceTags tags={role.tags} />
      </div>
    </div>
  );
}

type ExperienceTimelineRowProps = {
  entry: ExperienceEntry;
  reducedMotion: boolean;
  isLast: boolean;
};

export function ExperienceTimelineRow({
  entry,
  reducedMotion,
  isLast,
}: ExperienceTimelineRowProps) {
  const [expanded, setExpanded] = useState(entry.featured ?? false);
  const primaryRole = entry.roles[0];
  const detailsId = `${entry.id}-timeline-details`;

  return (
    <motion.article
      layout={!reducedMotion}
      variants={timelineRowReveal}
      className={`relative grid grid-cols-[44px_minmax(0,1fr)] gap-4 py-7 md:grid-cols-[56px_minmax(0,1fr)] md:gap-6 md:py-9 ${isLast ? "" : "border-b border-white/[0.08]"}`}
    >
      <CompanyLogo entry={entry} />

      <div className="min-w-0">
        <header>
          <div>
            <p className="text-sm font-semibold tracking-[-0.01em] text-white/85 md:text-base">
              {entry.company}
            </p>
            <p className="mt-1 font-mono text-[0.58rem] tracking-[0.1em] text-white/38 uppercase">
              {entry.location}
            </p>
          </div>

          <div className="mt-3 md:hidden">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg leading-tight font-semibold tracking-[-0.02em] text-white">
                {primaryRole.title}
              </h3>
              {primaryRole.current && (
                <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-1 font-mono text-[0.52rem] tracking-[0.12em] text-emerald-200 uppercase">
                  Current
                </span>
              )}
            </div>
            <p className="mt-2 font-mono text-[0.58rem] tracking-[0.09em] text-white/42 uppercase">
              {primaryRole.date}
            </p>
          </div>
        </header>

        <div className="mt-6 hidden md:block">
          {entry.roles.map((role, index) => (
            <div
              key={`${entry.id}-${role.title}`}
              className={index > 0 ? "mt-7 border-t border-white/[0.07] pt-7" : ""}
            >
              <RoleDetails role={role} />
            </div>
          ))}
        </div>

        <motion.div layout={!reducedMotion} id={detailsId} className="mt-4 md:hidden">
          {!expanded && (
            <div>
              <p className="line-clamp-1 text-sm leading-6 text-white/58">
                {primaryRole.bullets[0]}
              </p>
              <div className="mt-3">
                <ExperienceTags tags={primaryRole.tags} limit={3} />
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.3, ease: "easeOut" }}
              >
                {entry.roles.map((role, index) => (
                  <div
                    key={`${entry.id}-${role.title}`}
                    className={index > 0 ? "mt-7 border-t border-white/[0.07] pt-7" : ""}
                  >
                    <RoleDetails role={role} showHeading={index > 0} />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 inline-flex min-h-11 items-center rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white/70 transition hover:border-white/25 hover:bg-white/[0.09] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet-300 md:hidden"
        >
          {expanded ? "Hide details" : "View details"}
        </button>
      </div>
    </motion.article>
  );
}
