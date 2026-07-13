import type { ReactNode } from "react";

// Placeholder convention per CLAUDE.md: missing photography/embeds render as a
// dashed-border + icon module — never invented content, never stock imagery.
export function Placeholder({
  icon,
  title,
  body,
  tone = "dark",
  className = "",
}: {
  icon: ReactNode;
  title?: string;
  body: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const border =
    tone === "dark" ? "border-queso-cream/25" : "border-queso-black/25";
  const titleColor =
    tone === "dark" ? "text-queso-cream" : "text-queso-black";
  const bodyColor =
    tone === "dark" ? "text-queso-cream/60" : "text-queso-black/60";
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed ${border} px-6 py-10 text-center ${className}`}
    >
      <span className={bodyColor}>{icon}</span>
      {title ? (
        <span
          className={`font-body text-xs font-bold uppercase tracking-[0.12em] ${titleColor}`}
        >
          {title}
        </span>
      ) : null}
      <p className={`font-body text-sm leading-6 ${bodyColor}`}>{body}</p>
    </div>
  );
}
