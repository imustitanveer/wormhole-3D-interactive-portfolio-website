"use client";

import { useState } from "react";
import { WormholeCanvas } from "./WormholeCanvas";

export function WormholeBackdrop() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="hero-canvas" aria-hidden="true">
      <WormholeCanvas onReady={() => setLoaded(true)} />
      <div className="loading-veil" data-loaded={loaded}>
        <div className="loading-ring" />
      </div>
    </div>
  );
}
