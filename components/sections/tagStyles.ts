export type TagTone = "emerald" | "sky" | "purple" | "amber" | "slate";

export const tagToneClasses: Record<TagTone, string> = {
  emerald: "border-emerald-400/15 bg-emerald-500/20 text-emerald-300",
  sky: "border-sky-400/15 bg-sky-500/20 text-sky-300",
  purple: "border-purple-400/15 bg-purple-500/20 text-purple-300",
  amber: "border-amber-400/15 bg-amber-500/20 text-amber-300",
  slate: "border-white/10 bg-white/[0.05] text-white/65",
};
