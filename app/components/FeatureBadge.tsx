import { Check, X, CircleHelp } from "lucide-react";

interface FeatureBadgeProps {
  value: boolean | null;
  size?: "sm" | "md";
}

export default function FeatureBadge({ value, size = "md" }: FeatureBadgeProps) {
  const iconSize = size === "sm" ? 14 : 16;

  if (value === true) {
    return (
      <span
        style={{ background: "var(--green-bg)", color: "var(--green-text)" }}
        className={`inline-flex items-center justify-center rounded-full ${size === "sm" ? "w-5 h-5" : "w-6 h-6"}`}
        title="Supported"
        aria-label="Supported"
      >
        <Check size={iconSize} strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span
        style={{ color: "var(--muted)" }}
        className="inline-flex items-center justify-center"
        title="Not supported"
        aria-label="Not supported"
      >
        <X size={iconSize} strokeWidth={2} />
      </span>
    );
  }
  return (
    <span
      style={{ background: "var(--amber-bg)", color: "var(--amber-text)" }}
      className={`inline-flex items-center justify-center rounded-full ${size === "sm" ? "w-5 h-5" : "w-6 h-6"}`}
      title="Unverified"
      aria-label="Unverified"
    >
      <CircleHelp size={iconSize} strokeWidth={2} />
    </span>
  );
}
