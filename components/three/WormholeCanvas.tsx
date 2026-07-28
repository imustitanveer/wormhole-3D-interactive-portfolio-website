"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Component, Suspense, useEffect, useState, type ErrorInfo, type ReactNode } from "react";
import * as THREE from "three";
import { WormholeModel } from "./WormholeModel";

type WormholeCanvasProps = { onReady: () => void };

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Wormhole scene failed to render", error, info);
  }

  render() {
    return this.state.failed ? <div className="webgl-fallback" /> : this.props.children;
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function WormholeCanvas({ onReady }: WormholeCanvasProps) {
  const reducedMotion = useReducedMotion();

  return (
    <SceneErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 49.426, near: 0.1, far: 1000 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onCreated={({ gl }) => gl.setClearColor("#000000")}
      >
        <Suspense fallback={null}>
          <hemisphereLight args={["#8f78c2", "#050208", 0.025]} />
          <WormholeModel reducedMotion={reducedMotion} onReady={onReady} />
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={1.4} luminanceSmoothing={0.18} intensity={0.12} mipmapBlur />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
  );
}
