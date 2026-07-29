@AGENTS.md

# Claude Code Workflow

Follow `AGENTS.md` as the canonical product and engineering specification for this repository.

Before editing:

- Inspect the target component, its data module, and every shared primitive it consumes.
- Read the relevant local Next.js 16 documentation under `node_modules/next/dist/docs/`.
- Check `git status` and preserve unrelated user changes.
- Trace high-risk Three.js changes through scene loading, mixer updates, scroll modifiers, materials, and rendering order before touching code.

While editing:

- Keep changes narrow and use existing patterns before creating new ones.
- Prefer shared configuration for navigation, icons, tag tones, and repeated content.
- Use Tailwind utilities directly and keep class mappings explicit.
- Never replace working physical transmission or baked animation with an approximation unless explicitly requested.

Before responding:

- Run the validation checklist from `AGENTS.md`.
- State any warning or unverified visual behavior plainly.
- Report the exact files changed and confirm whether Three.js code was touched.
