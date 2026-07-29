"use client";

import { useCallback, useState } from "react";
import { WormholeHero } from "@/components/hero/WormholeHero";
import { SpaceLoader } from "@/components/loader/SpaceLoader";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WormholeBackdrop } from "@/components/three/WormholeBackdrop";

export function PortfolioExperience() {
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneRevealed, setSceneRevealed] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);

  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const handleSceneReveal = useCallback(() => setSceneRevealed(true), []);
  const handleLoaderComplete = useCallback(() => setLoaderComplete(true), []);

  return (
    <>
      <WormholeBackdrop revealed={sceneRevealed} onReady={handleSceneReady} />
      {!loaderComplete && (
        <SpaceLoader
          sceneReady={sceneReady}
          onSceneReveal={handleSceneReveal}
          onComplete={handleLoaderComplete}
        />
      )}
      <main className="pointer-events-none relative z-10">
        <WormholeHero visible={loaderComplete} />
        <SkillsSection />
        <ExperienceSection />
      </main>
    </>
  );
}
