"use client";

import { WormholeCanvas } from "./WormholeCanvas";

type WormholeBackdropProps = {
  revealed: boolean;
  onReady: () => void;
};

export function WormholeBackdrop({ revealed, onReady }: WormholeBackdropProps) {
  return (
    <div className="hero-canvas" data-revealed={revealed} aria-hidden="true">
      <WormholeCanvas onReady={onReady} />
    </div>
  );
}
