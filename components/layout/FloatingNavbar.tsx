"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { navigationItems, type NavigationId } from "./navigation";

const DOWNWARD_HIDE_DISTANCE = 80;
const DIRECTION_CHANGE_THRESHOLD = 6;

export function FloatingNavbar() {
  const reducedMotion = useReducedMotion() ?? false;
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<NavigationId>("home");
  const directionRef = useRef<"up" | "down" | null>(null);
  const directionDistanceRef = useRef(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let animationFrame = 0;

    const updateNavigation = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (currentScrollY <= 12) {
        directionRef.current = null;
        directionDistanceRef.current = 0;
        setVisible(true);
        return;
      }

      if (Math.abs(delta) < 2) return;
      const nextDirection = delta > 0 ? "down" : "up";

      if (directionRef.current !== nextDirection) {
        directionRef.current = nextDirection;
        directionDistanceRef.current = 0;
      }
      directionDistanceRef.current += Math.abs(delta);

      if (nextDirection === "up" && directionDistanceRef.current >= DIRECTION_CHANGE_THRESHOLD) {
        setVisible(true);
      }
      if (nextDirection === "down" && directionDistanceRef.current >= DOWNWARD_HIDE_DISTANCE) {
        setVisible(false);
      }
    };

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(() => {
        animationFrame = 0;
        updateNavigation();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top - window.innerHeight * 0.22) -
              Math.abs(second.boundingClientRect.top - window.innerHeight * 0.22),
          );

        const nextSection = entering[0]?.target.id as NavigationId | undefined;
        if (nextSection) setActiveSection(nextSection);
      },
      {
        rootMargin: "-18% 0px -72% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed top-5 left-1/2 z-[100] max-w-[calc(100vw-2rem)] -translate-x-1/2">
      <motion.nav
        aria-label="Primary navigation"
        initial={false}
        animate={
          visible
            ? { y: "0%", opacity: 1 }
            : { y: reducedMotion ? "0%" : "-120%", opacity: 0 }
        }
        transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
        className={`rounded-full border border-white/10 bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-max items-center gap-0.5 p-1.5">
            {navigationItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex min-h-9 items-center rounded-full px-3.5 text-sm whitespace-nowrap transition-[color,opacity] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 ${active ? "font-semibold text-white opacity-100" : "font-medium text-white/60 hover:text-white hover:opacity-100"}`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="active-navigation-underline"
                        aria-hidden="true"
                        className="absolute inset-x-3.5 bottom-1 h-px bg-violet-300 shadow-[0_0_8px_rgba(196,181,253,0.75)]"
                        transition={reducedMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    </div>
  );
}
