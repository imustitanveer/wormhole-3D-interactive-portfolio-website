<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio Engineering Guide

## Product standard

This repository is Musti Tanvir's production portfolio. It should feel cinematic at the entrance, calm and editorial through the content, fast on real devices, and precise enough to represent a senior AI/product engineer.

Every change should improve at least one of these outcomes without weakening the others:

- Clear communication of Musti's capabilities and work.
- A distinctive but readable visual identity.
- Smooth, restrained interaction.
- Excellent mobile and desktop usability.
- Accessibility, performance, and maintainability.

Avoid generic portfolio patterns, decorative clutter, and visual experiments that compete with the content.

## Established architecture

- The App Router entry is `app/page.tsx`; the page composition lives in `components/PortfolioExperience.tsx`.
- The Three.js wormhole is one persistent fixed background. Portfolio sections are normal DOM content rendered above it.
- Keep the page order coherent: Hero, Skills, Experience, Research, Awards, Education, Projects, Footer.
- Reuse `components/layout/navigation.ts` for primary and footer navigation. Section IDs must remain synchronized with it.
- Reuse shared primitives such as `CircleImage` and the social icons in `components/ui` instead of making one-off variants.
- Keep structured content in section data modules and presentation in components.
- Do not add a second WebGL scene, 3D skill gimmicks, logo clouds, progress ratings, or decorative technology orbits.

## Three.js and animation invariants

The GLB is the source of truth for Blender animation and coordinate conversion.

- Do not manually animate imported camera or mesh transforms that are controlled by baked GLB clips.
- Do not change `public/models/wormhole.glb` unless the task explicitly requests an asset update.
- Preserve the `AnimationMixer`, baked clip playback, imported camera transform, scene hierarchy, and frame update order.
- Preserve the distinct visual roles of the world stars, `Torus.001`, and `Wormhole_web`.
- `Wormhole_web` must remain physically transmissive/refractive. Never replace it with an opaque `ShaderMaterial`.
- Shader color customization must retain physical transmission, typically through `onBeforeCompile` when appropriate.
- Do not reproduce Blender axes manually.
- All frame-loop motion must use supplied delta time; do not create a separate `THREE.Clock`.
- Respect reduced motion. Do not use per-frame React state for visual animation.
- Treat scene, camera, lighting, bloom, material, and scroll-timeline changes as high-risk. Inspect the complete data flow before editing them.

## Visual system

- Use the existing Elms Sans typography and current mono treatment for technical labels.
- Preserve the dark violet, pink, and blue space palette.
- Content sections stay transparent so the persistent scene remains visible.
- Use liquid-glass surfaces sparingly: subtle white borders, translucent dark fills, controlled blur, and soft shadows.
- Cards must maintain readable contrast without becoming large opaque slabs.
- Company and institution marks use `CircleImage`; project artwork uses rectangular white media wells inside dark cards.
- Use explicit Tailwind classes in JSX. Avoid large new semantic blocks in `globals.css`.
- Do not dynamically construct Tailwind class names; use explicit mappings.
- Avoid aggressive glow, tilt, parallax, bounce, cursor-following effects, and excessive purple saturation.

## Layout and responsive behavior

- Use the established maximum content width of approximately `1280px` and existing responsive horizontal gutters.
- Keep the Hero-to-Skills transition cinematic at approximately `160px`.
- After Skills, adjacent sections should read continuously: approximately `64px` separation on mobile and `72px` on desktop.
- Content sections size naturally. Do not use `min-h-screen` outside the hero unless explicitly justified.
- Preserve internal card breathing room while avoiding large empty section wrappers.
- Mobile layouts must not overflow the viewport or force desktop interaction patterns.
- Horizontal rails must remain touch-scrollable, keyboard accessible where interactive, and must never hijack vertical page scrolling.
- The Projects ticker must remain seamless, measured from the moving copy rather than its padded viewport, and manually controllable.

## Motion language

- Use Framer Motion, which is already installed, for DOM reveals and layout transitions.
- Default reveals are restrained: opacity, roughly `18–24px` translation, optional `4px` blur, and `0.55–0.7s` duration.
- Use linear movement for continuous tickers and ease-out curves for interface transitions.
- No spring overshoot or bounce unless explicitly requested.
- Trigger section reveals once where appropriate.
- Every animation must have a useful reduced-motion state, usually opacity-only or fully static.
- Auto-moving content must pause offscreen, when the page is hidden, during user interaction, and for reduced-motion users.

## Navigation and interaction

- Primary navigation is a centered floating capsule and remains horizontally scrollable on mobile; do not replace it with a hamburger menu.
- Preserve active-section semantics and `aria-current` behavior.
- Auto-hide behavior must tolerate small scroll jitter and return promptly on upward scrolling.
- Interactive elements must use native links or buttons, visible focus states, and appropriate ARIA attributes.
- Noninteractive cards must not pretend to be buttons.
- External links use `target="_blank"` and `rel="noreferrer"`.
- Do not invent email addresses, social profiles, project URLs, employment facts, dates, awards, or education details. Preserve explicit placeholders until the user supplies real values.

## Accessibility and semantics

- Maintain a logical heading hierarchy and semantic `section`, `nav`, `main`, and `footer` landmarks.
- Images need useful alt text; duplicated or decorative carousel content should be hidden from assistive technology and removed from keyboard order.
- Expand/collapse controls require native buttons, `aria-expanded`, and `aria-controls`.
- Do not rely on color alone to communicate state.
- Maintain sufficient contrast over the animated background.
- Test keyboard navigation and reduced-motion behavior whenever related UI changes.

## Performance

- Prefer CSS and transform/opacity animation over layout-heavy effects.
- Avoid unnecessary client components, event listeners, React rerenders, and per-frame allocations.
- Use `next/image` with correct `sizes`, stable dimensions, and suitable object fitting.
- Clean up observers, animation frames, mixer actions, timers, and listeners.
- Keep passive scroll listeners lightweight and throttle visual work with `requestAnimationFrame` when needed.
- Do not install a dependency for functionality already provided by React, Next.js, Framer Motion, Tailwind, Drei, or Three.js.

## Change discipline

- Treat user requests as scoped changes. Do not redesign adjacent sections without authorization.
- Read the current implementation before editing; recent working behavior is more authoritative than assumptions.
- Preserve user-owned assets and unrelated working-tree changes.
- Prefer small shared abstractions when they remove real duplication, not speculative frameworks.
- When changing a repeated system, update its shared source rather than patching each consumer independently.
- Do not claim visual parity without inspecting the relevant implementation or available reference.

## Required validation

Before handing off a code change:

1. Run `npm run lint`.
2. Run `npm run build` so TypeScript and production compilation are checked.
3. Run `git diff --check`.
4. Review the changed-file list and confirm protected Three.js files were untouched when outside the task scope.
5. Verify referenced local assets exist.
6. For visual or interaction changes, test the affected desktop and mobile behavior when browser tooling is available.

The build may need network access for the existing Google-hosted Elms Sans font. A fallback-metrics warning is non-blocking if compilation succeeds.

## Definition of done

A change is complete only when it:

- Matches the requested visual and behavioral scope.
- Works at mobile and desktop breakpoints.
- Preserves scene and content integrity.
- Respects keyboard and reduced-motion users.
- Introduces no missing assets, broken links, console errors, clipping, or horizontal page overflow.
- Passes lint and the production build.
- Is summarized with the exact files and important values changed.
