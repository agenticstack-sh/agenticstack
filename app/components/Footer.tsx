export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        color: "var(--muted)",
        background: "var(--background)",
      }}
      className="text-sm"
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p>AgenticStack</p>
      </div>
    </footer>
  );
}
