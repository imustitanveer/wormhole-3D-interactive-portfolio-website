"use client";

import { useProgress } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type SpaceLoaderProps = {
  sceneReady: boolean;
  onSceneReveal: () => void;
  onComplete: () => void;
};

const MINIMUM_DISPLAY_MS = 800;
const SUCCESS_HOLD_MS = 250;
const EXIT_DURATION_MS = 700;

const loaderStars = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 61 + 7) % 100}%`,
  size: index % 9 === 0 ? 2 : 1,
  delay: `${-((index * 0.37) % 3)}s`,
  duration: `${2.2 + (index % 7) * 0.34}s`,
}));

function getStatus(progress: number, hasErrors: boolean) {
  if (hasErrors) return "CONNECTION DEGRADED";
  if (progress >= 100) return "CONNECTION ESTABLISHED";
  if (progress >= 80) return "SYNCHRONIZING SCENE";
  if (progress >= 60) return "CALIBRATING LIGHT";
  if (progress >= 40) return "COMPILING SHADERS";
  if (progress >= 20) return "LOADING GEOMETRY";
  return "INITIALIZING SYSTEMS";
}

export function SpaceLoader({ sceneReady, onSceneReveal, onComplete }: SpaceLoaderProps) {
  const { progress, active, loaded, total, errors } = useProgress();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const actualProgress = useRef(0);
  const displayedProgressRef = useRef(0);
  const finishStarted = useRef(false);


  useEffect(() => {
    actualProgress.current = Math.min(Math.max(progress, 0), 100);
  }, [progress]);

  useEffect(() => {
    const timer = window.setTimeout(() => setMinimumTimeElapsed(true), MINIMUM_DISPLAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const updateDisplayedProgress = () => {
      const target = actualProgress.current;
      const current = displayedProgressRef.current;
      let next = current + (target - current) * 0.12;

      if (target === 100 && target - next < 0.12) next = 100;
      next = Math.min(next, target);
      displayedProgressRef.current = next;
      setDisplayedProgress(next);
      animationFrame = window.requestAnimationFrame(updateDisplayedProgress);
    };

    animationFrame = window.requestAnimationFrame(updateDisplayedProgress);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, []);

  const canFinishLoading =
    progress >= 100 &&
    displayedProgress >= 100 &&
    sceneReady &&
    minimumTimeElapsed;

  useEffect(() => {
    if (!canFinishLoading || finishStarted.current) return;

    finishStarted.current = true;
    onSceneReveal();

    const exitTimer = window.setTimeout(() => setExiting(true), SUCCESS_HOLD_MS);
    const completeTimer = window.setTimeout(
      onComplete,
      SUCCESS_HOLD_MS + (shouldReduceMotion ? 180 : EXIT_DURATION_MS),
    );

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [canFinishLoading, onComplete, onSceneReveal, shouldReduceMotion]);

  const roundedProgress = Math.round(displayedProgress);
  const status = getStatus(roundedProgress, errors.length > 0);
  const assetCount = useMemo(
    () => (total > 0 ? `${loaded}/${total} ASSETS` : active ? "SCANNING ASSETS" : "SCENE READY"),
    [active, loaded, total],
  );

  return (
    <motion.div
      initial={false}
      animate={
        exiting
          ? {
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 1.02,
              filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
            }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: shouldReduceMotion ? 0.18 : EXIT_DURATION_MS / 1000, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#020106] px-6 text-white"
      role="status"
      aria-label="Loading portfolio scene"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(89,63,190,0.2),transparent_34%),radial-gradient(circle_at_22%_78%,rgba(35,93,180,0.1),transparent_28%)]"
      />
      <div aria-hidden="true" className="absolute inset-0">
        {loaderStars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white/60 motion-safe:animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[min(74vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/[0.08] motion-safe:animate-[spin_18s_linear_infinite]">
        <span className="absolute left-[18%] top-[3%] size-1.5 rounded-full bg-violet-200/70 shadow-[0_0_14px_rgba(196,181,253,0.7)]" />
      </div>
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[min(55vw,25rem)] -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-full border border-blue-200/[0.07] motion-safe:animate-[spin_13s_linear_infinite_reverse]">
        <span className="absolute bottom-[11%] right-[10%] size-1 rounded-full bg-blue-200/70 shadow-[0_0_12px_rgba(147,197,253,0.7)]" />
      </div>

      <div className="relative w-full max-w-md text-center">
        <p className="font-mono text-[0.65rem] tracking-[0.3em] text-white/45 uppercase">
          Establishing connection
        </p>
        <p
          className="mt-7 text-7xl leading-none font-semibold tracking-[-0.065em] text-white tabular-nums sm:text-8xl"
          aria-live="polite"
          aria-atomic="true"
        >
          {roundedProgress}%
        </p>

        <div className="mt-8 h-px overflow-hidden bg-white/10">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-blue-400 via-violet-300 to-fuchsia-300 shadow-[0_0_16px_rgba(167,139,250,0.7)]"
            animate={{ scaleX: displayedProgress / 100 }}
            transition={{ duration: 0.12, ease: "linear" }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 font-mono text-[0.6rem] tracking-[0.18em] text-white/40 uppercase">
          <span aria-live="polite">{status}</span>
          <span>{assetCount}</span>
        </div>
      </div>
    </motion.div>
  );
}
