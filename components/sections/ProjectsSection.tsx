"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ProjectCard } from "./ProjectCard";
import { projects, type ProjectCategory } from "./projects";

export const PROJECT_TICKER_SECONDS = 52;

type ProjectFilter = "all" | ProjectCategory;

const filters: Array<{ value: ProjectFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "personal", label: "Personal" },
  { value: "forclients", label: "For Clients" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectsSection() {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [copyWidth, setCopyWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible",
  );
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, scrollLeft: 0 });
  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionInView = useInView(sectionRef, { amount: 0.15 });

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const headingReveal: Variants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };
  const railReveal: Variants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.08 } },
  };

  useEffect(() => {
    const firstCopy = firstCopyRef.current;
    if (!firstCopy) return;

    const measure = () => setCopyWidth(firstCopy.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(firstCopy);
    return () => observer.disconnect();
  }, [activeFilter]);

  useEffect(() => {
    if (viewportRef.current) viewportRef.current.scrollLeft = 0;
  }, [activeFilter]);

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(
    () => () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    },
    [],
  );

  const autoplay =
    sectionInView && documentVisible && !reducedMotion && !hovered && !focused && !interacting;

  useEffect(() => {
    let animationFrame = 0;
    let previousTime = performance.now();

    const tick = (time: number) => {
      const viewport = viewportRef.current;
      const deltaSeconds = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      if (autoplay && viewport && copyWidth > 0) {
        viewport.scrollLeft += (copyWidth / PROJECT_TICKER_SECONDS) * deltaSeconds;
        if (viewport.scrollLeft >= copyWidth) viewport.scrollLeft -= copyWidth;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [autoplay, copyWidth]);

  const pauseAfterInteraction = () => {
    setInteracting(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setInteracting(false), 900);
  };

  const normalizeScroll = (value: number) => {
    if (copyWidth <= 0) return value;
    return ((value % copyWidth) + copyWidth) % copyWidth;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    draggingRef.current = true;
    didDragRef.current = false;
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: viewport.scrollLeft,
    };
    viewport.setPointerCapture(event.pointerId);
    setInteracting(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !draggingRef.current) return;
    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;
    if (Math.abs(deltaX) < 4 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    didDragRef.current = true;
    event.preventDefault();
    viewport.scrollLeft = normalizeScroll(dragStartRef.current.scrollLeft - deltaX);
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !draggingRef.current) return;
    draggingRef.current = false;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    pauseAfterInteraction();
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="pointer-events-auto relative z-[4] bg-transparent px-5 py-8 text-white sm:px-7 md:px-[clamp(2rem,6vw,6rem)] md:py-9"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.h2
            id="projects-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={headingReveal}
            className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl"
          >
            Projects
          </motion.h2>

          <div className="flex w-fit rounded-full border border-white/10 bg-black/30 p-1 backdrop-blur-xl" aria-label="Filter projects">
            {filters.map((filter) => {
              const active = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter.value)}
                  className="relative rounded-full px-4 py-2 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet-300"
                >
                  {active && (
                    <motion.span
                      layoutId="active-project-filter"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      transition={reducedMotion ? { duration: 0 } : { duration: 0.28, ease }}
                    />
                  )}
                  <span className={`relative ${active ? "text-white" : ""}`}>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={railReveal}
          className="relative mt-10 md:mt-14"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#030207]/80 to-transparent md:w-14"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#030207]/80 to-transparent md:w-14"
          />

          <div
            ref={viewportRef}
            className="cursor-grab touch-pan-y overflow-x-auto overscroll-x-contain pt-3 pb-12 select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onWheel={(event) => {
              if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) pauseAfterInteraction();
            }}
            onClickCapture={(event) => {
              if (didDragRef.current) {
                event.preventDefault();
                event.stopPropagation();
                didDragRef.current = false;
              }
            }}
            aria-label={`${filters.find((filter) => filter.value === activeFilter)?.label} projects carousel`}
          >
            <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-max">
              {[0, 1].map((copyIndex) => (
                <div
                  key={copyIndex}
                  ref={copyIndex === 0 ? firstCopyRef : undefined}
                  aria-hidden={copyIndex === 1 ? "true" : undefined}
                  className="flex shrink-0 gap-5 pr-5"
                >
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={`${project.id}-${copyIndex}`}
                      project={project}
                      duplicate={copyIndex === 1}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
