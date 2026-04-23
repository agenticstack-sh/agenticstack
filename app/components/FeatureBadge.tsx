interface FeatureBadgeProps {
  value: boolean | null;
  size?: "sm" | "md";
}

export default function FeatureBadge({ value, size = "md" }: FeatureBadgeProps) {
  const base = size === "sm" ? "text-xs px-1.5 py-0.5 rounded-full font-medium" : "text-sm px-2 py-0.5 rounded-full font-medium";

  if (value === true) {
    return (
      <span
        style={{ background: "var(--green-bg)", color: "var(--green-text)" }}
        className={base}
        title="Supported"
        aria-label="Supported"
      >
        ✓
      </span>
    );
  }
  if (value === false) {
    return (
      <span
        style={{ color: "var(--muted)" }}
        className={size === "sm" ? "text-sm" : "text-base"}
        title="Not supported"
        aria-label="Not supported"
      >
        ✗
      </span>
    );
  }
  return (
    <span
      style={{ background: "var(--amber-bg)", color: "var(--amber-text)" }}
      className={base}
      title="Unverified"
      aria-label="Unverified"
    >
      ?
    </span>
  );
}
