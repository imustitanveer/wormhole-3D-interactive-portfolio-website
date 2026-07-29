"use client";

import { useCallback, useState } from "react";
import { WormholeHero } from "@/components/hero/WormholeHero";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { SpaceLoader } from "@/components/loader/SpaceLoader";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
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
      {loaderComplete && <FloatingNavbar />}
      <main className="pointer-events-none relative z-10">
        <WormholeHero visible={loaderComplete} />
        <SkillsSection />
        <ExperienceSection />
        <ResearchSection />
        <AwardsSection />
        <EducationSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
