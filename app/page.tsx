import { WormholeHero } from "@/components/hero/WormholeHero";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WormholeBackdrop } from "@/components/three/WormholeBackdrop";

export default function Home() {
  return (
    <>
      <WormholeBackdrop />
      <main className="pointer-events-none relative z-10">
        <WormholeHero />
        <SkillsSection />
      </main>
    </>
  );
}
