"use client";

import Image from "next/image";
import { FileText, Mail } from "lucide-react";
import { useState, type SVGProps } from "react";
import { WormholeCanvas } from "@/components/three/WormholeCanvas";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .7a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6-.81c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 21 22" fill="currentColor" {...props}>
      <path d="M5.37 3.5A2.18 2.18 0 1 1 1 3.5a2.18 2.18 0 0 1 4.37 0ZM1.44 8.02h3.84V20.4H1.44V8.02Zm6.21 0h3.68v1.69h.05c.51-.97 1.77-1.99 3.64-1.99 3.89 0 4.61 2.56 4.61 5.89v6.79h-3.84v-6.02c0-1.44-.03-3.29-2-3.29-2 0-2.31 1.56-2.31 3.18v6.13H7.65V8.02Z" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.49 3.55 12 3.55 12 3.55s-7.49 0-9.37.51A3.02 3.02 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14c1.88.51 9.37.51 9.37.51s7.49 0 9.37-.51a3.02 3.02 0 0 0 2.13-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}

function HeroProfile() {
  return (
    <div className="flex items-center gap-4 sm:gap-5">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-full border border-white/20 bg-violet-950/30 shadow-[0_12px_40px_rgba(90,65,180,0.3)] sm:size-28 xl:size-32">
        <Image
          src="/photo.jpeg"
          alt="Musti Tanvir"
          fill
          sizes="(max-width: 640px) 96px, (max-width: 1280px) 112px, 128px"
          className="object-cover"
          priority
        />
      </div>
      <p className="max-w-52 font-mono text-[0.66rem] font-medium tracking-[0.19em] text-white/60 sm:text-xs">
        <span className="mb-2 block h-px w-8 bg-gradient-to-r from-violet-300 to-transparent shadow-[0_0_12px_rgba(167,139,250,0.75)]" />
        FORWARD-DEPLOYED AI ENGINEER
      </p>
    </div>
  );
}

function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href="mailto:YOUR_EMAIL_HERE"
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
    <div className="flex items-center gap-2.5" aria-label="Social links">
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

export function WormholeHero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="hero">
      <div className="hero-canvas" aria-hidden="true">
        <WormholeCanvas onReady={() => setLoaded(true)} />
        <div className="loading-veil" data-loaded={loaded}>
          <div className="loading-ring" />
        </div>
      </div>

      <section
        className="pointer-events-none relative z-[4] flex min-h-svh items-end justify-start px-5 pb-6 pt-20 sm:px-7 sm:pb-8 md:items-center md:justify-end md:px-[clamp(2rem,6vw,6rem)] md:py-10"
        aria-label="Introduction"
      >
        <div className="pointer-events-auto w-full max-w-[480px] text-[#f7f4fb] drop-shadow-[0_2px_16px_rgba(4,1,12,0.72)]">
          <HeroProfile />

          <div className="mt-5 sm:mt-6">
            <h1 className="text-5xl leading-[0.92] font-semibold tracking-[-0.055em] text-balance md:text-6xl xl:text-7xl">
              Hi, I’m Musti Tanvir.
            </h1>
            <p className="mt-3 text-lg font-medium tracking-[-0.025em] text-violet-200 sm:text-xl">
              From ambiguity to production.
            </p>
            <p className="mt-3 max-w-[46ch] text-sm leading-6 text-slate-300/80 sm:text-[0.95rem] sm:leading-6">
              I build production-ready AI systems, scalable backends, and full-stack products. I
              work across customers, product, and engineering to turn ambiguous problems into
              reliable deployments.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-6 sm:gap-5">
            <HeroActions />
            <SocialLinks />
          </div>

          <h2 className="mt-5 pl-10 font-mono text-xs tracking-[0.16em] text-white/55 uppercase sm:mt-6 sm:pl-0">
            Let’s build something useful.
          </h2>
        </div>
      </section>
    </main>
  );
}
