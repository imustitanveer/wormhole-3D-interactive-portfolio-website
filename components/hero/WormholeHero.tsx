"use client";

import { FileText, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CircleImage } from "@/components/ui/CircleImage";
import { GithubIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

type WormholeHeroProps = {
  visible: boolean;
};

function revealAnimation(index: number, visible: boolean, reducedMotion: boolean) {
  return {
    initial: false,
    animate: visible
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : {
          opacity: 0,
          y: reducedMotion ? 0 : 20,
          filter: reducedMotion ? "blur(0px)" : "blur(6px)",
        },
    transition: {
      duration: reducedMotion ? 0.2 : 0.62,
      delay: visible && !reducedMotion ? index * 0.08 : 0,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  };
}

function HeroProfile() {
  return (
    <CircleImage
      src="/photo.jpeg"
      alt="Musti Tanvir"
      size="xl"
      inset="none"
      imageClassName="object-cover"
      priority
    />
  );
}

function HeroActions() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href="mailto:mustassum.tanveer@gmail.com"
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(124,58,237,0.28)] transition hover:-translate-y-0.5 hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
      >
        <Mail aria-hidden="true" className="size-4" />
        Get in Touch
      </a>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
      >
        <FileText aria-hidden="true" className="size-4" />
        Resume
      </a>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-2.5" aria-label="Social links">
      <a
        href="https://github.com/mustitanveer"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub profile"
        className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet-300"
      >
        <GithubIcon aria-hidden="true" className="size-[1.1rem]" />
      </a>
      <a
        href="https://www.linkedin.com/in/mustassum-tanvir/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn profile"
        className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet-300"
      >
        <LinkedinIcon aria-hidden="true" className="size-[1.1rem]" />
      </a>
      {/* TODO: Replace with Musti's YouTube channel URL. */}
      <a
        href="https://www.youtube.com/@100percentdank"
        target="_blank"
        rel="noreferrer"
        aria-label="YouTube channel"
        className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet-300"
      >
        <YoutubeIcon aria-hidden="true" className="size-5" />
      </a>
    </div>
  );
}

export function WormholeHero({ visible }: WormholeHeroProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div id="home" className="hero pointer-events-none">
      <section
        className="pointer-events-none relative z-[4] flex min-h-svh items-center justify-center px-5 py-16 text-center sm:px-7 md:px-[clamp(2rem,6vw,6rem)]"
        aria-label="Introduction"
      >
        <div
          aria-hidden={!visible}
          inert={!visible}
          className={`pointer-events-auto relative w-full max-w-[880px] text-[#f7f4fb] drop-shadow-[0_2px_18px_rgba(4,1,12,0.78)] ${visible ? "" : "pointer-events-none"}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[115%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(5,2,14,0.34),transparent_68%)] blur-2xl"
          />

          <motion.div {...revealAnimation(0, visible, shouldReduceMotion)} className="flex justify-center">
            <HeroProfile />
          </motion.div>

          <motion.p
            {...revealAnimation(1, visible, shouldReduceMotion)}
            className="mt-5 font-mono text-[0.66rem] font-medium tracking-[0.22em] text-white/65 uppercase sm:text-xs"
          >
            Forward-deployed AI engineer
          </motion.p>

          <motion.h1
            {...revealAnimation(2, visible, shouldReduceMotion)}
            className="mt-5 text-[3.4rem] leading-[0.88] font-semibold tracking-[-0.055em] text-balance sm:text-6xl md:text-8xl xl:text-[7rem]"
          >
            <span className="block">Hi, I’m</span>
            <span className="block">Musti Tanvir.</span>
          </motion.h1>

          <motion.p
            {...revealAnimation(3, visible, shouldReduceMotion)}
            className="mt-5 text-xl font-medium tracking-[-0.025em] text-white/90 md:text-2xl"
          >
            From ambiguity to production.
          </motion.p>

          <motion.p
            {...revealAnimation(4, visible, shouldReduceMotion)}
            className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-base sm:leading-7"
          >
            I build production-ready AI systems, scalable backends, and full-stack products—turning
            ambiguous problems into reliable deployments.
          </motion.p>

          <motion.div {...revealAnimation(5, visible, shouldReduceMotion)} className="mt-6">
            <HeroActions />
          </motion.div>

          <motion.div {...revealAnimation(6, visible, shouldReduceMotion)} className="mt-4">
            <SocialLinks />
          </motion.div>

          <motion.p
            {...revealAnimation(7, visible, shouldReduceMotion)}
            className="mt-5 font-mono text-[0.65rem] tracking-[0.18em] text-white/50 uppercase"
          >
            Let’s build something useful.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
