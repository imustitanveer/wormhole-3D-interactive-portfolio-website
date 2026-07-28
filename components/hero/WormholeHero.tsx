"use client";

import { useState } from "react";
import { WormholeCanvas } from "@/components/three/WormholeCanvas";

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
      <section className="hero-content" aria-label="Introduction">
        <div className="hero-copy">
          <p className="eyebrow">FORWARD-DEPLOYED AI ENGINEER</p>
          <h1>Mustassum Tanvir</h1>
          <p className="supporting">
            I build intelligent systems that move from prototype to production.
          </p>
          <div className="hero-actions">
            <a
              className="primary-action"
              href="https://github.com/mustitanveer?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              Explore My Work
            </a>
            <a
              className="secondary-action"
              href="https://github.com/mustitanveer"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
